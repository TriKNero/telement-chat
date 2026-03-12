import { request } from './client'
import { userSchema } from './schemas'
import type { User } from '../types'

export async function getUser(id: number): Promise<User> {
  return request<User>(`/users/${id}`, userSchema)
}
