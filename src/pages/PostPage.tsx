import { useParams } from 'react-router-dom'
import { PostDetail } from '../components/PostDetail'
import { usePost } from '../hooks/usePost'

export function PostPage() {
  const { id } = useParams<{ id: string }>()
  const postId = id ? parseInt(id, 10) : undefined
  const { post, author, comments, isLoading, isError, error, refetch } = usePost(postId)

  return (
    <PostDetail
      post={post}
      author={author}
      comments={comments}
      isLoading={isLoading}
      error={isError ? (error as Error) : null}
      onRetry={() => refetch()}
    />
  )
}
