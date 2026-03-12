import type { z } from 'zod'

const BASE_URL = 'https://jsonplaceholder.typicode.com'

export class ApiError extends Error {
  readonly status: number
  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export async function request<T>(path: string, schema: z.ZodType<T>): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`)
  if (!res.ok) {
    throw new ApiError(`HTTP ${res.status}`, res.status)
  }
  const data = await res.json()
  return schema.parse(data)
}
