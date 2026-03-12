import { useState, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CircularProgress, Box } from '@mui/material'
import { AppThemeProvider } from './contexts/ThemeContext'
import { Layout } from './components/Layout'

const PostPage = lazy(() => import('./pages/PostPage').then((m) => ({ default: m.PostPage })))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })))

function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 5 * 60 * 1000, retry: 2 },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <AppThemeProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/posts/1" replace />} />
              <Route path="posts">
                <Route index element={<Navigate to="/posts/1" replace />} />
                <Route
                  path=":id"
                  element={
                    <Suspense
                      fallback={
                        <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
                          <CircularProgress />
                        </Box>
                      }
                    >
                      <PostPage />
                    </Suspense>
                  }
                />
              </Route>
              <Route
                path="*"
                element={
                  <Suspense
                    fallback={
                      <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
                        <CircularProgress />
                      </Box>
                    }
                  >
                    <NotFoundPage />
                  </Suspense>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppThemeProvider>
    </QueryClientProvider>
  )
}

export default App
