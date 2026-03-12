import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'
import { PostDetail } from '../components/PostDetail'
import { usePost } from '../hooks/usePost'
import { useScrollToTop } from '../contexts/ScrollContext'

export function PostPage() {
  const { id } = useParams<{ id: string }>()
  const postId = id ? parseInt(id, 10) : undefined
  const { post, author, comments, isLoading, isError, error, refetch } = usePost(postId)
  const scrollToTop = useScrollToTop()

  useEffect(() => {
    if (!post || !scrollToTop) return
    const t = setTimeout(() => {
      scrollToTop()
    }, 150)
    return () => clearTimeout(t)
  }, [post?.id, scrollToTop])

  return (
    <Box>
      <PostDetail
        post={post}
        author={author}
        comments={comments}
        isLoading={isLoading}
        error={isError ? (error as Error) : null}
        onRetry={() => refetch()}
      />
    </Box>
  )
}
