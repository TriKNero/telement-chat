import { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'
import { PostDetail } from '../components/PostDetail'
import { usePost } from '../hooks/usePost'

export function PostPage() {
  const { id } = useParams<{ id: string }>()
  const postId = id ? parseInt(id, 10) : undefined
  const { post, author, comments, isLoading, isError, error, refetch } = usePost(postId)
  const topRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = topRef.current
    if (!el) return
    const scroll = () => el.scrollIntoView({ block: 'start', behavior: 'auto' })
    requestAnimationFrame(() => requestAnimationFrame(scroll))
  }, [id])

  return (
    <Box ref={topRef}>
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
