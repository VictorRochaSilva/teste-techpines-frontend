import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import { Music, User, LogOut, Shield, Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuthStore()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      <header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 md:space-x-3 group">
            <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-lg md:rounded-xl flex items-center justify-center text-white font-bold text-lg md:text-2xl group-hover:scale-110 transition-transform duration-200 shadow-lg">
              🎵
            </div>
            <div className="hidden sm:block">
              <span className="text-lg md:text-2xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                Top 5 Tião Carreiro
              </span>
              <p className="text-xs text-gray-500 -mt-1 hidden md:block">As melhores músicas</p>
            </div>
            <div className="block sm:hidden">
              <span className="text-sm font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                Top 5
              </span>
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <Link
              to="/"
              className="text-gray-600 hover:text-red-600 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-red-50"
            >
              Início
            </Link>
            <Link
              to="/suggest"
              className="text-gray-600 hover:text-red-600 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-red-50"
            >
              Sugerir Música
            </Link>
            {isAuthenticated && (
              <Link
                to="/admin/dashboard"
                className="text-gray-600 hover:text-red-600 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-red-50 flex items-center space-x-1"
              >
                <Shield className="h-4 w-4" />
                <span>Admin</span>
              </Link>
            )}
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                    <p className="text-xs text-gray-500">Administrador</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline btn-sm flex items-center space-x-1"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sair</span>
                </button>
              </div>
            ) : (
              <Link
                to="/admin/login"
                className="btn btn-primary flex items-center space-x-2 btn-sm"
              >
                <Shield className="h-5 w-5" />
                <span>Área Admin</span>
              </Link>
            )}
          </div>

          {/* Mobile User Actions */}
          <div className="md:hidden flex items-center space-x-2">
            {isAuthenticated ? (
              <>
                <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </>
            ) : (
              <Link
                to="/admin/login"
                className="btn btn-primary btn-sm flex items-center space-x-2"
              >
                <Shield className="h-5 w-5" />
                <span>Admin</span>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden border-t border-gray-200 py-4 transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-96 opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
            <nav className="flex flex-col space-y-2">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-600 hover:text-red-600 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-red-50"
              >
                Início
              </Link>
              <Link
                to="/suggest"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-600 hover:text-red-600 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-red-50"
              >
                Sugerir Música
              </Link>
              {isAuthenticated && (
                <Link
                  to="/admin/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-600 hover:text-red-600 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-red-50 flex items-center space-x-2"
                >
                  <Shield className="h-4 w-4" />
                  <span>Admin</span>
                </Link>
              )}
              {!isAuthenticated && (
                <Link
                  to="/admin/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-600 hover:text-red-600 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-red-50 flex items-center space-x-2"
                >
                  <Shield className="h-4 w-4" />
                  <span>Admin</span>
                </Link>
              )}
            </nav>
        </div>
        </div>
      </header>
    </>
  )
}
