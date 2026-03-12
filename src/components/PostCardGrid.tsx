import { Box, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { getPostImageUrl, POST_CARD_IMAGE_HEIGHT } from '../utils/images'
import type { Post } from '../types'

interface PostCardGridProps {
  post: Post
}

export function PostCardGrid({ post }: PostCardGridProps) {
  return (
    <Box
      component={RouterLink}
      to={`/posts/${post.id}`}
      sx={{
        display: 'block',
        textDecoration: 'none',
        color: 'inherit',
        borderRadius: 2,
        overflow: 'hidden',
        bgcolor: 'background.paper',
        boxShadow: 1,
        transition: 'box-shadow 0.2s',
        '&:hover': { boxShadow: 3 },
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: POST_CARD_IMAGE_HEIGHT,
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <Box
          component="img"
          src={getPostImageUrl(post.id)}
          alt=""
          sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </Box>
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle1" fontWeight={600} noWrap>
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }} noWrap>
          {post.body}
        </Typography>
      </Box>
    </Box>
  )
}
