import { Typography } from '@mui/material'
import { PostCardSidebar } from './PostCardSidebar'
import { PostCardGrid } from './PostCardGrid'
import { PostListSkeleton } from './LoadingSkeleton'
import { ErrorFallback } from './ErrorFallback'
import type { Post } from '../types'

interface PostListProps {
  posts?: Post[]
  isLoading: boolean
  error: Error | null
  onRetry?: () => void
  variant?: 'grid' | 'sidebar'
}

export function PostList({ posts, isLoading, error, onRetry, variant = 'grid' }: PostListProps) {
  if (isLoading) {
    return <PostListSkeleton variant={variant} />
  }

  if (error) {
    return (
      <ErrorFallback
        message={error instanceof Error ? error.message : 'Failed to load posts'}
        onRetry={onRetry}
      />
    )
  }

  if (!posts?.length) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
        No posts
      </Typography>
    )
  }

  const Card = variant === 'sidebar' ? PostCardSidebar : PostCardGrid
  return (
    <>
      {posts.map((post) => (
        <Card key={post.id} post={post} />
      ))}
    </>
  )
}
