import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X, Plus, Loader2, Music } from 'lucide-react'

const addSongSchema = z.object({
  youtube_url: z.string().url('URL do YouTube inválida'),
})

type AddSongFormData = z.infer<typeof addSongSchema>

interface AddSongModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: { youtube_url: string }) => Promise<void>
  isLoading?: boolean
}

export function AddSongModal({ 
  isOpen, 
  onClose, 
  onSave, 
  isLoading = false 
}: AddSongModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddSongFormData>({
    resolver: zodResolver(addSongSchema),
  })

  const onSubmit = async (data: AddSongFormData) => {
    setIsSubmitting(true)
    try {
      await onSave(data)
      reset()
      onClose()
    } catch (error) {
      console.error('Erro ao adicionar música:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      reset()
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Music className="h-6 w-6 text-primary-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              Adicionar Nova Música
            </h2>
          </div>
          <button
            onClick={handleClose}
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
              URL do YouTube *
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
            <p className="text-xs text-gray-500 mt-1">
              Cole aqui o link completo do YouTube da música. O título será extraído automaticamente.
            </p>
          </div>

          {/* Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <Music className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Como funciona:</p>
                <ul className="space-y-1 text-xs">
                  <li>• A música será adicionada como "Pendente"</li>
                  <li>• Você poderá aprovar ou rejeitar depois</li>
                  <li>• O sistema extrairá automaticamente as informações do YouTube</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
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
                <Plus className="h-4 w-4" />
              )}
              <span>{isSubmitting ? 'Adicionando...' : 'Adicionar Música'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
