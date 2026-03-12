import { z } from 'zod'
import { request } from './client'
import { postSchema, commentSchema } from './schemas'
import type { Post, Comment } from '../types'

export async function getPosts(): Promise<Post[]> {
  return request<Post[]>('/posts', z.array(postSchema))
}

export async function getPost(id: number): Promise<Post> {
  return request<Post>(`/posts/${id}`, postSchema)
}

export async function getPostComments(postId: number): Promise<Comment[]> {
  return request<Comment[]>(`/posts/${postId}/comments`, z.array(commentSchema))
}
