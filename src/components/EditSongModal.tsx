import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X, Save, Loader2 } from 'lucide-react'
import { Song } from '../types'

const editSongSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  youtube_url: z.string().url('URL do YouTube inválida'),
})

type EditSongFormData = z.infer<typeof editSongSchema>

interface EditSongModalProps {
  song: Song | null
  isOpen: boolean
  onClose: () => void
  onSave: (songId: string, data: EditSongFormData) => Promise<void>
  isLoading?: boolean
}

export function EditSongModal({ 
  song, 
  isOpen, 
  onClose, 
  onSave, 
  isLoading = false 
}: EditSongModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditSongFormData>({
    resolver: zodResolver(editSongSchema),
  })

  useEffect(() => {
    if (song && isOpen) {
      reset({
        title: song.title,
        youtube_url: song.youtube_url,
      })
    }
  }, [song, isOpen, reset])

  const onSubmit = async (data: EditSongFormData) => {
    if (!song) return
    
    setIsSubmitting(true)
    try {
      await onSave(song.id, data)
      onClose()
    } catch (error) {
      console.error('Erro ao salvar música:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Editar Música
          </h2>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título da Música
            </label>
            <input
              {...register('title')}
              type="text"
              className="input w-full"
              placeholder="Digite o título da música"
              disabled={isSubmitting}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL do YouTube
            </label>
            <input
              {...register('youtube_url')}
              type="url"
              className="input w-full"
              placeholder="https://www.youtube.com/watch?v=..."
              disabled={isSubmitting}
            />
            {errors.youtube_url && (
              <p className="text-red-500 text-sm mt-1">{errors.youtube_url.message}</p>
            )}
          </div>

          {/* Preview */}
          {song && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Preview:</h4>
              <div className="flex items-center space-x-3">
                <img
                  src={song.thumbnail}
                  alt="Thumbnail"
                  className="w-16 h-12 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {song.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {song.formatted_views} visualizações
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="btn btn-outline btn-sm"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary btn-sm flex items-center space-x-2"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              <span>{isSubmitting ? 'Salvando...' : 'Salvar'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
