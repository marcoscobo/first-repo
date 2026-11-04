FROM node:26.13.0-trixie AS base
WORKDIR /app

# Dev server with hot reload. Source is bind-mounted by docker compose.
FROM base AS dev
# Pre-create node_modules owned by "node" so the named volume inherits it.
RUN mkdir -p /app/node_modules && chown -R node:node /app
USER node
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]

FROM base AS build
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.30.6-alpine AS prod
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
