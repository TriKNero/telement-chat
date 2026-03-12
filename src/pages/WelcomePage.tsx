import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

export function WelcomePage() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        p: 3,
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Welcome to Telement
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 400, mb: 3 }}>
        {isMobile ? (
          <>
            Tap the{' '}
            <Box component="span" sx={{ display: 'inline-flex', verticalAlign: 'middle' }}>
              <MenuIcon fontSize="small" />
            </Box>{' '}
            menu icon or swipe right to open the post list, then select a post to read.
          </>
        ) : (
          <>Select a post from the list on the left to start reading.</>
        )}
      </Typography>
    </Box>
  )
}
