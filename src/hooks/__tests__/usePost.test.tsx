import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { usePost } from '../usePost'
import * as postsApi from '../../api/posts'
import * as usersApi from '../../api/users'

vi.mock('../../api/posts')
vi.mock('../../api/users')

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
  }
}

describe('usePost', () => {
  beforeEach(() => {
    vi.mocked(postsApi.getPost).mockReset()
    vi.mocked(postsApi.getPostComments).mockReset()
    vi.mocked(usersApi.getUser).mockReset()
  })

  it('does not fetch when id is undefined', () => {
    const { result } = renderHook(() => usePost(undefined), {
      wrapper: createWrapper(),
    })
    expect(result.current.post).toBeUndefined()
    expect(postsApi.getPost).not.toHaveBeenCalled()
  })

  it('returns post, comments, author on success', async () => {
    const mockPost = { id: 1, userId: 1, title: 'T', body: 'B' }
    const mockComments = [{ id: 1, postId: 1, name: 'A', email: 'a@b.com', body: 'B' }]
    const mockUser = { id: 1, name: 'John', username: 'j', email: 'j@b.com' }

    vi.mocked(postsApi.getPost).mockResolvedValue(mockPost)
    vi.mocked(postsApi.getPostComments).mockResolvedValue(mockComments)
    vi.mocked(usersApi.getUser).mockResolvedValue(mockUser)

    const { result } = renderHook(() => usePost(1), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.post).toEqual(mockPost))
    await waitFor(() => expect(result.current.comments).toEqual(mockComments))
    await waitFor(() => expect(result.current.author).toEqual(mockUser))
    expect(result.current.isLoading).toBe(false)
  })
})
