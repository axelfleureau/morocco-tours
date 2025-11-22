import { z } from 'zod'

export const ContentTypeSchema = z.enum(['experience', 'travel', 'service', 'blog'])

export type ContentType = z.infer<typeof ContentTypeSchema>

export const VALID_CONTENT_TYPES = ['experience', 'travel', 'service', 'blog'] as const

export function isValidContentType(type: string): type is ContentType {
  return VALID_CONTENT_TYPES.includes(type as ContentType)
}
