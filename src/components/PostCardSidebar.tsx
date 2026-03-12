import { Box, Typography } from '@mui/material'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { getPostImageUrl, SIDEBAR_AVATAR_SIZE } from '../utils/images'
import type { Post } from '../types'

interface PostCardSidebarProps {
  post: Post
}

export function PostCardSidebar({ post }: PostCardSidebarProps) {
  const location = useLocation()
  const isActive = location.pathname === `/posts/${post.id}`

  return (
    <Box
      component={RouterLink}
      to={`/posts/${post.id}`}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 2,
        textDecoration: 'none',
        color: 'inherit',
        borderBottom: 1,
        borderColor: 'divider',
        bgcolor: isActive ? 'action.selected' : 'transparent',
        '&:hover': { bgcolor: 'action.hover' },
      }}
    >
      <Box
        component="img"
        src={getPostImageUrl(post.id, SIDEBAR_AVATAR_SIZE, SIDEBAR_AVATAR_SIZE)}
        alt=""
        sx={{
          width: SIDEBAR_AVATAR_SIZE,
          height: SIDEBAR_AVATAR_SIZE,
          minWidth: SIDEBAR_AVATAR_SIZE,
          minHeight: SIDEBAR_AVATAR_SIZE,
          borderRadius: '50%',
          objectFit: 'cover',
          flexShrink: 0,
        }}
      />
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography variant="subtitle2" noWrap fontWeight={isActive ? 600 : 400}>
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap sx={{ mt: 0.25 }}>
          {post.body}
        </Typography>
      </Box>
    </Box>
  )
}
