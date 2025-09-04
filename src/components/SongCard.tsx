import { Song } from '../types'
import { Play, ThumbsUp, ThumbsDown, Edit, Trash2 } from 'lucide-react'

interface SongCardProps {
  song: Song
  isAdmin?: boolean
  onApprove?: (songId: string) => void
  onReject?: (songId: string) => void
  onEdit?: (song: Song) => void
  onDelete?: (songId: string) => void
}

export function SongCard({ 
  song, 
  isAdmin = false, 
  onApprove, 
  onReject, 
  onEdit, 
  onDelete 
}: SongCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handlePlay = () => {
    window.open(song.youtube_url, '_blank')
  }

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="flex flex-col sm:flex-row">
        {/* Thumbnail */}
        <div className="relative w-full sm:w-48 h-48 sm:h-32 flex-shrink-0">
          <img
            src={song.thumbnail}
            alt={song.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
            <button
              onClick={handlePlay}
              className="opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30"
            >
              <Play className="h-6 w-6 text-white" fill="currentColor" />
            </button>
          </div>
          <div className="absolute top-3 right-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(song.status)}`}>
              {song.status_label}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          <div className="flex flex-col h-full">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                {song.title}
              </h3>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    {song.formatted_views} visualizações
                  </span>
                </div>
                {song.user && (
                  <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    por {song.user.name}
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            {isAdmin && (
              <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                {song.status === 'pending' && (
                  <>
                    <button
                      onClick={() => onApprove?.(song.id)}
                      className="flex-1 sm:flex-none btn btn-success btn-sm flex items-center justify-center space-x-2 px-4 py-2"
                    >
                      <ThumbsUp className="h-4 w-4" />
                      <span>Aprovar</span>
                    </button>
                    <button
                      onClick={() => onReject?.(song.id)}
                      className="flex-1 sm:flex-none btn btn-danger btn-sm flex items-center justify-center space-x-2 px-4 py-2"
                    >
                      <ThumbsDown className="h-4 w-4" />
                      <span>Rejeitar</span>
                    </button>
                  </>
                )}
                <button
                  onClick={() => onEdit?.(song)}
                  className="flex-1 sm:flex-none btn btn-secondary btn-sm flex items-center justify-center space-x-2 px-4 py-2"
                >
                  <Edit className="h-4 w-4" />
                  <span>Editar</span>
                </button>
                <button
                  onClick={() => onDelete?.(song.id)}
                  className="flex-1 sm:flex-none btn btn-outline btn-sm text-red-600 hover:text-red-700 hover:bg-red-50 flex items-center justify-center space-x-2 px-4 py-2"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Excluir</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
