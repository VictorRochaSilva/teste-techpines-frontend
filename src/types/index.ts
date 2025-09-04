export interface User {
  id: string
  name: string
  email: string
  created_at: string
  updated_at: string
}

export interface Song {
  id: string
  title: string
  views: number
  formatted_views: string
  youtube_id: string
  youtube_url: string
  thumbnail: string
  status: 'pending' | 'approved' | 'rejected'
  status_label: string
  user?: User
  created_at: string
  updated_at: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
  message: string
}

export interface ApiResponse<T> {
  data: T
  message: string
}

export interface LoginResponse {
  user: User
  token: string
  message: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
}
