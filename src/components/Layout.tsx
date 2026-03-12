import { useState, useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  SwipeableDrawer,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { useThemeMode } from '../contexts/ThemeContext'
import { useSwipe } from '../hooks/useSwipe'
import { Sidebar } from './Sidebar'
import { APP_BAR_HEIGHT, HEADER_COLOR_LIGHT, HEADER_COLOR_DARK } from '../theme'

export function Layout() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const location = useLocation()
  const { mode, toggleMode } = useThemeMode()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isPostView = /\/posts\/\d+/.test(location.pathname)

  const swipeHandlers = useSwipe(
    () => {
      if (isMobile && isPostView) setDrawerOpen(true)
    },
    () => {
      if (isMobile) setDrawerOpen(false)
    }
  )

  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setDrawerOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    const scroll = () => {
      el.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }
    requestAnimationFrame(() => requestAnimationFrame(scroll))
  }, [location.pathname])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppBar
        position="sticky"
        sx={{
          bgcolor: mode === 'light' ? HEADER_COLOR_LIGHT : HEADER_COLOR_DARK,
          zIndex: 1400,
        }}
      >
        <Toolbar sx={{ minHeight: APP_BAR_HEIGHT }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setDrawerOpen((prev) => !prev)}
            sx={{
              mr: 1,
              display: { xs: 'flex', md: 'none' },
              cursor: 'pointer',
              touchAction: 'manipulation',
              minWidth: 48,
              minHeight: 48,
            }}
          >
            {drawerOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{
              flexGrow: 1,
              py: 1.5,
              px: 1,
              cursor: 'pointer',
              touchAction: 'manipulation',
              userSelect: 'none',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            Telement
          </Typography>
          <IconButton
            color="inherit"
            onClick={toggleMode}
            sx={{
              ml: 1,
              cursor: 'pointer',
              touchAction: 'manipulation',
              minWidth: 48,
              minHeight: 48,
            }}
          >
            {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <Box
          className="scrollbar-hide"
          sx={{
            width: 360,
            flexShrink: 0,
            height: `calc(100vh - ${APP_BAR_HEIGHT}px)`,
            borderRight: 1,
            borderColor: 'divider',
            bgcolor: 'background.paper',
            overflowY: 'auto',
            display: { xs: 'none', md: 'block' },
          }}
        >
          <Sidebar />
        </Box>
        <SwipeableDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          onOpen={() => setDrawerOpen(true)}
          disableSwipeToOpen={false}
          hysteresis={0.5}
          minFlingVelocity={400}
          swipeAreaWidth={56}
          slotProps={{
            swipeArea: {
              sx: {
                top: APP_BAR_HEIGHT,
                height: `calc(100vh - ${APP_BAR_HEIGHT}px)`,
              },
            },
          }}
          sx={{ display: { xs: 'block', md: 'none' } }}
          PaperProps={{
            sx: {
              width: 320,
              top: APP_BAR_HEIGHT,
              height: `calc(100vh - ${APP_BAR_HEIGHT}px)`,
            },
          }}
          ModalProps={{
            slotProps: {
              backdrop: {
                sx: {
                  top: APP_BAR_HEIGHT,
                  height: `calc(100vh - ${APP_BAR_HEIGHT}px)`,
                },
              },
            },
          }}
        >
          <Box
            className="scrollbar-hide"
            sx={{ height: '100%', overflowY: 'auto' }}
          >
            <Sidebar />
          </Box>
        </SwipeableDrawer>
        <Box
          ref={contentRef}
          className="scrollbar-hide"
          sx={{
            flex: 1,
            minWidth: 0,
            overflowY: 'auto',
            bgcolor: 'background.default',
            pt: 2,
            pb: 'calc(24px + env(safe-area-inset-bottom, 0px))',
            ...(isMobile ? { touchAction: 'pan-y' } : {}),
          }}
          {...(isMobile ? swipeHandlers : {})}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}
