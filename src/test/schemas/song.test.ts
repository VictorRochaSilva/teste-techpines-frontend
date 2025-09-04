import { describe, it, expect } from 'vitest'
import { suggestSongSchema } from '../../schemas/song'

describe('Song Schemas', () => {
  describe('suggestSongSchema', () => {
    it('validates correct YouTube URL', () => {
      const validData = {
        youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      }

      const result = suggestSongSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('validates short YouTube URL', () => {
      const validData = {
        youtube_url: 'https://youtu.be/dQw4w9WgXcQ'
      }

      const result = suggestSongSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('rejects invalid URL', () => {
      const invalidData = {
        youtube_url: 'https://vimeo.com/123456'
      }

      const result = suggestSongSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('rejects empty URL', () => {
      const invalidData = {
        youtube_url: ''
      }

      const result = suggestSongSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })
})
