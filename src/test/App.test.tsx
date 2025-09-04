import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from '../App'

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

describe('App', () => {
  it('renders without crashing', () => {
    const queryClient = createTestQueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    )
    expect(screen.getByText('Top 5 Tião Carreiro')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    const queryClient = createTestQueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    )
    expect(screen.getAllByText('Início')).toHaveLength(2) // Desktop + Mobile
    expect(screen.getAllByText('Sugerir Música')).toHaveLength(2) // Desktop + Mobile
  })
})
