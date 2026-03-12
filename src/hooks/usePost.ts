import { useQuery } from '@tanstack/react-query'
import { getPost, getPostComments } from '../api/posts'
import { getUser } from '../api/users'

export function usePost(id: number | undefined) {
  const postQuery = useQuery({
    queryKey: ['post', id],
    queryFn: () => (id != null ? getPost(id) : Promise.reject(new Error('No id'))),
    enabled: id != null,
  })

  const commentsQuery = useQuery({
    queryKey: ['post', id, 'comments'],
    queryFn: () => (id != null ? getPostComments(id) : Promise.reject(new Error('No id'))),
    enabled: id != null && postQuery.isSuccess,
  })

  const authorQuery = useQuery({
    queryKey: ['user', postQuery.data?.userId],
    queryFn: () => {
      const userId = postQuery.data?.userId
      if (userId == null) return Promise.reject(new Error('No userId'))
      return getUser(userId)
    },
    enabled: postQuery.isSuccess && postQuery.data != null,
  })

  return {
    post: postQuery.data,
    comments: commentsQuery.data,
    author: authorQuery.data,
    isLoading: postQuery.isLoading || commentsQuery.isLoading || authorQuery.isLoading,
    isError: postQuery.isError || commentsQuery.isError || authorQuery.isError,
    error: postQuery.error ?? commentsQuery.error ?? authorQuery.error,
    refetch: () => {
      postQuery.refetch()
      commentsQuery.refetch()
      authorQuery.refetch()
    },
  }
}
