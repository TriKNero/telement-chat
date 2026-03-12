import { vi, beforeEach, describe, it, expect } from 'vitest'
import { getPosts, getPost, getPostComments } from '../posts'
import { ApiError } from '../client'

vi.stubGlobal('fetch', vi.fn())

describe('posts API', () => {
  beforeEach(() => {
    vi.mocked(fetch).mockReset()
  })

  it('getPosts returns posts on success', async () => {
    const mockPosts = [{ id: 1, userId: 1, title: 'Test', body: 'Body' }]
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockPosts),
    } as Response)

    const result = await getPosts()
    expect(result).toEqual(mockPosts)
    expect(fetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/posts'
    )
  })

  it('getPost returns post on success', async () => {
    const mockPost = { id: 1, userId: 1, title: 'Test', body: 'Body' }
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockPost),
    } as Response)

    const result = await getPost(1)
    expect(result).toEqual(mockPost)
    expect(fetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/posts/1'
    )
  })

  it('getPostComments returns comments on success', async () => {
    const mockComments = [{ id: 1, postId: 1, name: 'A', email: 'a@b.com', body: 'Body' }]
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockComments),
    } as Response)

    const result = await getPostComments(1)
    expect(result).toEqual(mockComments)
    expect(fetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/posts/1/comments'
    )
  })

  it('throws ApiError on non-ok response', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 404,
    } as Response)

    try {
      await getPosts()
    } catch (e) {
      expect(e).toBeInstanceOf(ApiError)
      expect(e).toMatchObject({ status: 404, message: 'HTTP 404' })
      return
    }
    expect.fail('Expected ApiError to be thrown')
  })
})
