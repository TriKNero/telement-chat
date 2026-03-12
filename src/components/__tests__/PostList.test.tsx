import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { PostList } from '../PostList'
import type { Post } from '../../types'

function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>)
}

const mockPosts: Post[] = [
  { id: 1, userId: 1, title: 'Post 1', body: 'Body 1' },
  { id: 2, userId: 2, title: 'Post 2', body: 'Body 2' },
]

describe('PostList', () => {
  it('shows skeleton when loading', () => {
    render(
      <PostList posts={[]} isLoading={true} error={null} variant="sidebar" />
    )
    expect(document.querySelector('.MuiSkeleton-root')).toBeInTheDocument()
  })

  it('shows error when error provided', () => {
    render(
      <PostList
        posts={[]}
        isLoading={false}
        error={new Error('Failed')}
        onRetry={vi.fn()}
      />
    )
    expect(screen.getByText('Failed')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument()
  })

  it('renders post cards when posts provided', () => {
    renderWithRouter(
      <PostList
        posts={mockPosts}
        isLoading={false}
        error={null}
        variant="sidebar"
      />
    )
    expect(screen.getByText('Post 1')).toBeInTheDocument()
    expect(screen.getByText('Post 2')).toBeInTheDocument()
  })

  it('shows No posts when empty and not loading', () => {
    renderWithRouter(
      <PostList posts={[]} isLoading={false} error={null} />
    )
    expect(screen.getByText('No posts')).toBeInTheDocument()
  })
})
