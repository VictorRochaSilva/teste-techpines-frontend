import { Trash2, AlertTriangle, X } from 'lucide-react'
import { Song } from '../types'

interface DeleteConfirmModalProps {
  song: Song | null
  isOpen: boolean
  onClose: () => void
  onConfirm: (songId: string) => void
  isLoading?: boolean
}

export function DeleteConfirmModal({ 
  song, 
  isOpen, 
  onClose, 
  onConfirm, 
  isLoading = false 
}: DeleteConfirmModalProps) {
  if (!isOpen || !song) return null

  const handleConfirm = () => {
    onConfirm(song.id)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              Confirmar Exclusão
            </h2>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start space-x-4 mb-6">
            <img
              src={song.thumbnail}
              alt={song.title}
              className="w-16 h-12 object-cover rounded flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                {song.title}
              </h3>
              <p className="text-sm text-gray-500">
                {song.formatted_views} visualizações
              </p>
              <span className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${
                song.status === 'approved' 
                  ? 'bg-green-100 text-green-800' 
                  : song.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {song.status_label}
              </span>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-red-800">
                <p className="font-medium mb-1">Atenção!</p>
                <p>
                  Esta ação não pode ser desfeita. A música será permanentemente 
                  removida do sistema.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="btn btn-outline btn-sm"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirm}
              disabled={isLoading}
              className="btn btn-danger btn-sm flex items-center space-x-2"
            >
              <Trash2 className="h-4 w-4" />
              <span>{isLoading ? 'Excluindo...' : 'Excluir Música'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
