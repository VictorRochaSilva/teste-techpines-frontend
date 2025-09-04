import { z } from 'zod'

export const suggestSongSchema = z.object({
  youtube_url: z.string().url('URL inválida').refine(
    (url) => {
      const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)[\w-]+/
      return youtubeRegex.test(url)
    },
    'URL do YouTube inválida'
  ),
})

export const createSongSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  youtube_id: z.string().min(1, 'ID do YouTube é obrigatório'),
  views: z.number().min(0, 'Visualizações deve ser maior ou igual a 0'),
  thumbnail: z.string().url('Thumbnail deve ser uma URL válida'),
})

export const updateSongSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').optional(),
  youtube_id: z.string().min(1, 'ID do YouTube é obrigatório').optional(),
  views: z.number().min(0, 'Visualizações deve ser maior ou igual a 0').optional(),
  thumbnail: z.string().url('Thumbnail deve ser uma URL válida').optional(),
  status: z.enum(['pending', 'approved', 'rejected']).optional(),
})

export type SuggestSongFormData = z.infer<typeof suggestSongSchema>
export type CreateSongFormData = z.infer<typeof createSongSchema>
export type UpdateSongFormData = z.infer<typeof updateSongSchema>
