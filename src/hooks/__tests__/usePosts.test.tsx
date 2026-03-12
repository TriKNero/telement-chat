import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { usePosts } from '../usePosts'
import * as postsApi from '../../api/posts'

vi.mock('../../api/posts')

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

describe('usePosts', () => {
  beforeEach(() => {
    vi.mocked(postsApi.getPosts).mockReset()
  })

  it('returns loading state initially', () => {
    vi.mocked(postsApi.getPosts).mockImplementation(
      () => new Promise(() => {})
    )
    const { result } = renderHook(() => usePosts(), {
      wrapper: createWrapper(),
    })
    expect(result.current.isLoading).toBe(true)
    expect(result.current.data).toBeUndefined()
  })

  it('returns posts on success', async () => {
    const mockPosts = [{ id: 1, userId: 1, title: 'T', body: 'B' }]
    vi.mocked(postsApi.getPosts).mockResolvedValue(mockPosts)

    const { result } = renderHook(() => usePosts(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data).toEqual(mockPosts)
    expect(result.current.isLoading).toBe(false)
  })

  it('returns error on failure', async () => {
    vi.mocked(postsApi.getPosts).mockImplementation(() =>
      Promise.reject(new Error('Network error'))
    )

    const { result } = renderHook(() => usePosts(), {
      wrapper: createWrapper(),
    })

    await waitFor(
      () => expect(result.current.isError).toBe(true),
      { timeout: 5000 }
    )
    expect(result.current.error).toBeDefined()
    expect(result.current.data).toBeUndefined()
  })
})
