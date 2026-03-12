import { Typography, Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <Typography component="div" sx={{ textAlign: 'center', py: 8 }}>
      <Typography variant="h4" gutterBottom>
        404
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Page not found
      </Typography>
      <Button component={RouterLink} to="/posts/1" variant="contained" sx={{ mt: 2 }}>
        Back to Posts
      </Button>
    </Typography>
  )
}
