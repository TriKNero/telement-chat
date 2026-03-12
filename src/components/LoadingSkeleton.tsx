import { Skeleton, Box, Grid } from '@mui/material'
import { POST_IMAGE_HEIGHT, POST_CARD_IMAGE_HEIGHT, SIDEBAR_AVATAR_SIZE } from '../utils/images'

interface SkeletonProps {
  variant?: 'grid' | 'sidebar'
}

export function PostListSkeleton({ variant = 'grid' }: SkeletonProps) {
  if (variant === 'sidebar') {
    return (
      <Box sx={{ minWidth: 0 }}>
        {Array.from({ length: 10 }).map((_, i) => (
          <Box
            key={i}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              p: 2,
              minWidth: 0,
            }}
          >
            <Skeleton
              variant="circular"
              width={SIDEBAR_AVATAR_SIZE}
              height={SIDEBAR_AVATAR_SIZE}
              sx={{ flexShrink: 0 }}
            />
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Skeleton variant="text" sx={{ width: '100%', maxWidth: 200, height: 24 }} />
              <Skeleton variant="text" sx={{ width: '100%', maxWidth: 140, height: 20, mt: 0.5 }} />
            </Box>
          </Box>
        ))}
      </Box>
    )
  }

  return (
    <Grid container spacing={2}>
      {Array.from({ length: 9 }).map((_, i) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
          <Skeleton
            variant="rectangular"
            height={POST_CARD_IMAGE_HEIGHT + 88}
            sx={{ borderRadius: 2, width: '100%' }}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export function PostDetailSkeleton() {
  return (
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 640, mx: 'auto', width: '100%' }}>
      <Box
        sx={{
          width: '100%',
          height: POST_IMAGE_HEIGHT,
          mb: 2,
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <Skeleton variant="rectangular" height="100%" sx={{ borderRadius: 0 }} />
      </Box>
      <Skeleton variant="text" sx={{ width: '100%', maxWidth: 400, height: 40 }} />
      <Skeleton variant="text" sx={{ width: '100%', maxWidth: 200, height: 24, mt: 2 }} />
      <Skeleton variant="rectangular" height={120} sx={{ mt: 2, borderRadius: 2, width: '100%' }} />
      <Skeleton variant="text" sx={{ width: '100%', maxWidth: 120, height: 32, mt: 4 }} />
      {Array.from({ length: 3 }).map((_, i) => (
        <Box key={i} sx={{ display: 'flex', gap: 2, mt: 2, minWidth: 0 }}>
          <Skeleton variant="circular" width={40} height={40} sx={{ flexShrink: 0 }} />
          <Skeleton variant="rectangular" height={60} sx={{ flex: 1, borderRadius: 2, minWidth: 0 }} />
        </Box>
      ))}
    </Box>
  )
}
