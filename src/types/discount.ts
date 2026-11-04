import type { Phone } from '@/types/phone'

export interface Discount {
  phoneId: string
  /** Whole-number percentage, e.g. 20 for 20% off. */
  percentOff: number
  campaign: string
  /** ISO 8601 with offset; inclusive. */
  startsAt: string
  /** ISO 8601 with offset; exclusive (first moment the discount no longer applies). */
  endsAt: string
}

export interface Deal {
  phone: Phone
  percentOff: number
  /** Price in EUR after discount, rounded to cents. */
  salePrice: number
  campaign: string
}
