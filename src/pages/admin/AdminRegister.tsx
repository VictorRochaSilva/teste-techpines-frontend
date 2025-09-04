import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'
import { Shield, Eye, EyeOff, Loader2, ArrowLeft, UserPlus } from 'lucide-react'

const registerSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
  password_confirmation: z.string(),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Senhas não coincidem",
  path: ["password_confirmation"],
})

type RegisterFormData = z.infer<typeof registerSchema>

export function AdminRegister() {
  const navigate = useNavigate()
  const { register: registerUser } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)
    setError('')
    
    try {
      await registerUser(data.name, data.email, data.password)
      navigate('/admin/dashboard')
    } catch (err) {
      setError('Erro ao criar conta. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link 
            to="/" 
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao site
          </Link>
          
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
              🎵
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-2 mb-2">
            <UserPlus className="h-8 w-8 text-red-600" />
            <h2 className="text-3xl font-bold text-gray-900">
              Criar Conta Admin
            </h2>
          </div>
          <p className="text-gray-600">
            Registre-se para acessar o painel de administração
          </p>
        </div>

        {/* Form */}
        <div className="bg-white py-8 px-6 shadow-xl rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome Completo
              </label>
              <input
                {...register('name')}
                type="text"
                className="input w-full"
                placeholder="Seu nome completo"
                disabled={isLoading}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                {...register('email')}
                type="email"
                className="input w-full"
                placeholder="admin@exemplo.com"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  className="input w-full pr-10"
                  placeholder="Mínimo 8 caracteres"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirmar Senha
              </label>
              <div className="relative">
                <input
                  {...register('password_confirmation')}
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="input w-full pr-10"
                  placeholder="Digite a senha novamente"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password_confirmation && (
                <p className="text-red-500 text-sm mt-1">{errors.password_confirmation.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary btn-sm w-full flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <UserPlus className="h-5 w-5" />
              )}
              <span>{isLoading ? 'Criando conta...' : 'Criar Conta'}</span>
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Já tem uma conta?{' '}
              <Link
                to="/admin/login"
                className="text-red-600 hover:text-red-700 font-medium"
              >
                Faça login aqui
              </Link>
            </p>
          </div>

          {/* Info */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <Shield className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-amber-800">
                  <p className="font-medium mb-1">Atenção</p>
                  <p className="text-xs">
                    Esta é uma área restrita. Apenas administradores autorizados devem criar contas aqui.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
