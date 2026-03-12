import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PostDetail } from '../PostDetail'
import type { Post, Comment, User } from '../../types'

const mockPost: Post = {
  id: 1,
  userId: 1,
  title: 'Test Post',
  body: 'Test body content',
}
const mockAuthor: User = {
  id: 1,
  name: 'John Doe',
  username: 'johndoe',
  email: 'j@b.com',
}
const mockComments: Comment[] = [
  { id: 1, postId: 1, name: 'Commenter', email: 'c@b.com', body: 'Comment text' },
]

describe('PostDetail', () => {
  it('shows skeleton when loading', () => {
    render(
      <PostDetail
        isLoading={true}
        error={null}
      />
    )
    expect(document.querySelector('.MuiSkeleton-root')).toBeInTheDocument()
  })

  it('shows error when error provided', () => {
    render(
      <PostDetail
        isLoading={false}
        error={new Error('Load failed')}
        onRetry={vi.fn()}
      />
    )
    expect(screen.getByText('Load failed')).toBeInTheDocument()
  })

  it('renders post content when post provided', () => {
    render(
      <PostDetail
        post={mockPost}
        author={mockAuthor}
        comments={mockComments}
        isLoading={false}
        error={null}
      />
    )
    expect(screen.getByText('Test Post')).toBeInTheDocument()
    expect(screen.getByText('Test body content')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Commenter')).toBeInTheDocument()
    expect(screen.getByText('Comments (1)')).toBeInTheDocument()
  })

  it('returns null when no post', () => {
    const { container } = render(
      <PostDetail post={undefined} isLoading={false} error={null} />
    )
    expect(container.firstChild).toBeNull()
  })
})
