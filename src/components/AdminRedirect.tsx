import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import { Loader2, Shield } from 'lucide-react'

export function AdminRedirect() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard')
    } else {
      navigate('/admin/login')
    }
  }, [isAuthenticated, navigate])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Shield className="h-12 w-12 text-primary-600 animate-pulse" />
        </div>
        <div className="flex items-center justify-center mb-4">
          <Loader2 className="h-6 w-6 animate-spin text-primary-600" />
        </div>
        <p className="text-gray-600">Redirecionando para área administrativa...</p>
      </div>
    </div>
  )
}
