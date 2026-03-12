import { Typography, Box } from '@mui/material'
import { PostDetailSkeleton } from './LoadingSkeleton'
import { ErrorFallback } from './ErrorFallback'
import { getPostImageUrl, getAvatarUrl, POST_IMAGE_HEIGHT } from '../utils/images'
import type { Post, Comment, User } from '../types'

interface PostDetailProps {
  post?: Post
  author?: User
  comments?: Comment[]
  isLoading: boolean
  error: Error | null
  onRetry?: () => void
}

export function PostDetail({
  post,
  author,
  comments,
  isLoading,
  error,
  onRetry,
}: PostDetailProps) {
  if (isLoading) {
    return <PostDetailSkeleton />
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <ErrorFallback
          message={error instanceof Error ? error.message : 'Failed to load post'}
          onRetry={onRetry}
        />
      </Box>
    )
  }

  if (!post) {
    return null
  }

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 640, mx: 'auto' }}>
      <Box
        sx={{
          width: '100%',
          height: POST_IMAGE_HEIGHT,
          borderRadius: 2,
          mb: 2,
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <Box
          component="img"
          src={getPostImageUrl(post.id, 800, 400)}
          alt=""
          sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </Box>
      <Typography variant="h5" component="h1" fontWeight={600} gutterBottom>
        {post.title}
      </Typography>
      {author && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
          <Box
            component="img"
            src={getAvatarUrl(author.id)}
            alt=""
            sx={{
              width: 36,
              height: 36,
              minWidth: 36,
              minHeight: 36,
              borderRadius: '50%',
              objectFit: 'cover',
              flexShrink: 0,
            }}
          />
          <Box>
            <Typography variant="subtitle2">{author.name}</Typography>
            <Typography variant="caption" color="text.secondary">
              @{author.username}
            </Typography>
          </Box>
        </Box>
      )}
      <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', mb: 4 }}>
        {post.body}
      </Typography>
      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
        Comments ({comments?.length ?? 0})
      </Typography>
      {comments?.map((comment) => (
        <Box
          key={comment.id}
          sx={{
            display: 'flex',
            gap: 2,
            mb: 2,
            p: 2,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          <Box
            component="img"
            src={`https://i.pravatar.cc/40?u=comment-${comment.id}`}
            alt=""
            sx={{
              width: 40,
              height: 40,
              minWidth: 40,
              minHeight: 40,
              borderRadius: '50%',
              objectFit: 'cover',
              flexShrink: 0,
            }}
          />
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="subtitle2" fontWeight={600}>
              {comment.name}
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block">
              {comment.email}
            </Typography>
            <Typography variant="body2" sx={{ mt: 0.5 }}>
              {comment.body}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  )
}
