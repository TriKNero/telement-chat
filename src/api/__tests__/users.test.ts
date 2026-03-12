import { vi, beforeEach, describe, it, expect } from 'vitest'
import { getUser } from '../users'
import { ApiError } from '../client'

vi.stubGlobal('fetch', vi.fn())

describe('users API', () => {
  beforeEach(() => {
    vi.mocked(fetch).mockReset()
  })

  it('getUser returns user on success', async () => {
    const mockUser = { id: 1, name: 'John', username: 'johndoe', email: 'j@b.com' }
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockUser),
    } as Response)

    const result = await getUser(1)
    expect(result).toEqual(mockUser)
    expect(fetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/users/1'
    )
  })

  it('throws ApiError on non-ok response', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 500,
    } as Response)

    try {
      await getUser(1)
    } catch (e) {
      expect(e).toBeInstanceOf(ApiError)
      expect(e).toMatchObject({ status: 500 })
      return
    }
    expect.fail('Expected ApiError to be thrown')
  })
})
