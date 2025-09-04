import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AuthState, User } from '../types'
import { authApi } from '../services/api'

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        try {
          const response = await authApi.login(email, password)
          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
          })
        } catch (error) {
          throw error
        }
      },

      register: async (name: string, email: string, password: string) => {
        try {
          const response = await authApi.register(name, email, password)
          set({
            user: response.user,
            token: response.token,
            isAuthenticated: true,
          })
        } catch (error) {
          throw error
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        })
      },

      setUser: (user: User | null) => {
        set({ user })
      },

      setToken: (token: string | null) => {
        set({ token })
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
