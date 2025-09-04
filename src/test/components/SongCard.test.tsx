import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { SongCard } from '../../components/SongCard'
import { Song } from '../../types'

const mockSong: Song = {
  id: '1',
  title: 'Test Song',
  youtube_id: 'test123',
  youtube_url: 'https://youtube.com/watch?v=test123',
  views: 1000,
  thumbnail: 'https://img.youtube.com/vi/test123/hqdefault.jpg',
  status: 'approved',
  status_label: 'Aprovada',
  formatted_views: '1.000',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  user: null
}

describe('SongCard', () => {
  it('renders song information', () => {
    render(<SongCard song={mockSong} />)
    
    expect(screen.getByText('Test Song')).toBeInTheDocument()
    expect(screen.getByText('1.000 visualizações')).toBeInTheDocument()
    expect(screen.getByText('Aprovada')).toBeInTheDocument()
  })

  it('renders admin actions when isAdmin is true', () => {
    render(<SongCard song={mockSong} isAdmin={true} />)
    
    expect(screen.getByText('Editar')).toBeInTheDocument()
    expect(screen.getByText('Excluir')).toBeInTheDocument()
  })

  it('does not render admin actions when isAdmin is false', () => {
    render(<SongCard song={mockSong} isAdmin={false} />)
    
    expect(screen.queryByText('Editar')).not.toBeInTheDocument()
    expect(screen.queryByText('Excluir')).not.toBeInTheDocument()
  })
})
