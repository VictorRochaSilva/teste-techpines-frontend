import axios from 'axios'
import { Song, PaginatedResponse, LoginResponse } from '../types'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// Interceptor para adicionar token nas requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth-storage')
  if (token) {
    try {
      const parsedToken = JSON.parse(token)
      if (parsedToken.state?.token) {
        config.headers.Authorization = `Bearer ${parsedToken.state.token}`
      }
    } catch (error) {
      console.error('Erro ao parsear token:', error)
    }
  }
  return config
})

// Interceptor para tratar erros de resposta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth-storage')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const authApi = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  },

  register: async (name: string, email: string, password: string): Promise<LoginResponse> => {
    const response = await api.post('/auth/register', { 
      name, 
      email, 
      password, 
      password_confirmation: password 
    })
    return response.data
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout')
  },
}

export const songApi = {
  getTopSongs: async (): Promise<Song[]> => {
    const response = await api.get('/songs/top')
    return response.data.data
  },

  getSongs: async (page: number = 1, perPage: number = 10): Promise<PaginatedResponse<Song>> => {
    const response = await api.get(`/songs`, {
      params: { page, per_page: perPage }
    })
    return response.data
  },

  getPendingSongs: async (): Promise<Song[]> => {
    const response = await api.get('/admin/songs/pending')
    return response.data.data
  },

  suggestSong: async (youtubeUrl: string): Promise<Song> => {
    const response = await api.post('/songs/suggest', { youtube_url: youtubeUrl })
    return response.data.data
  },

  approveSong: async (songId: string): Promise<void> => {
    await api.post(`/admin/songs/${songId}/approve`)
  },

  rejectSong: async (songId: string): Promise<void> => {
    await api.post(`/admin/songs/${songId}/reject`)
  },

  createSong: async (songData: Partial<Song>): Promise<Song> => {
    const response = await api.post('/admin/songs', songData)
    return response.data.data
  },

  updateSong: async (songId: string, songData: Partial<Song>): Promise<void> => {
    await api.put(`/admin/songs/${songId}`, songData)
  },

  deleteSong: async (songId: string): Promise<void> => {
    await api.delete(`/admin/songs/${songId}`)
  },

  getSong: async (songId: string): Promise<Song> => {
    const response = await api.get(`/admin/songs/${songId}`)
    return response.data.data
  },
}
