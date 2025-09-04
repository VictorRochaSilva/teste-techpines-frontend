import { Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AdminRedirect } from './components/AdminRedirect'
import { Home } from './pages/Home'
import { SuggestSong } from './pages/SuggestSong'
import { AdminLogin } from './pages/admin/AdminLogin'
import { AdminRegister } from './pages/admin/AdminRegister'
import { AdminDashboard } from './pages/admin/AdminDashboard'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          {/* Área Pública */}
          <Route path="/" element={<Home />} />
          <Route path="/suggest" element={<SuggestSong />} />
          
          {/* Redirecionamento Admin */}
          <Route path="/admin" element={<AdminRedirect />} />
          
          {/* Área Administrativa */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
    </div>
  )
}

export default App