import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'
import { Shield, Eye, EyeOff, Loader2, ArrowLeft } from 'lucide-react'

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

type LoginFormData = z.infer<typeof loginSchema>

export function AdminLogin() {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setError('')
    
    try {
      await login(data.email, data.password)
      navigate('/admin/dashboard')
    } catch (err) {
      setError('Email ou senha incorretos')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-red-100 to-red-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link 
            to="/" 
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-8 group transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Voltar ao site
          </Link>
          
          <div className="flex items-center justify-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-red-600 to-red-700 rounded-3xl flex items-center justify-center text-white font-bold text-3xl shadow-2xl">
              🎵
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <Shield className="h-7 w-7 text-red-600" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900">
              Área Administrativa
            </h2>
          </div>
          <p className="text-gray-600 text-lg">
            Faça login para acessar o painel de administração
          </p>
        </div>

        {/* Form */}
        <div className="bg-white py-10 px-8 shadow-2xl rounded-2xl border border-gray-100">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 animate-pulse">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <p className="text-red-800 text-sm font-medium">{error}</p>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Email
              </label>
              <input
                {...register('email')}
                type="email"
                className="input w-full h-12 text-lg px-4 border-2 border-gray-200 focus:border-red-500 transition-colors"
                placeholder="admin@exemplo.com"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-red-500 text-sm font-medium">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Senha
              </label>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  className="input w-full h-12 text-lg px-4 pr-12 border-2 border-gray-200 focus:border-red-500 transition-colors"
                  placeholder="Digite sua senha"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-6 w-6" />
                  ) : (
                    <Eye className="h-6 w-6" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm font-medium">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary w-full h-14 text-lg font-semibold flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-6 w-6 animate-spin" />
                  <span>Entrando...</span>
                </>
              ) : (
                <>
                  <Shield className="h-6 w-6" />
                  <span>Entrar no Painel</span>
                </>
              )}
            </button>
          </form>

          {/* Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-blue-900 mb-2">Acesso Restrito</p>
                  <p className="text-blue-800 leading-relaxed">
                    Esta é uma área exclusiva para administradores autorizados. 
                    Se você não tem permissão, entre em contato com o administrador do sistema.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Não tem uma conta?{' '}
              <Link
                to="/admin/register"
                className="text-red-600 hover:text-red-700 font-semibold transition-colors"
              >
                Criar conta de administrador
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}