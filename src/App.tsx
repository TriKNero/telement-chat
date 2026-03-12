import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppThemeProvider } from './contexts/ThemeContext'
import { Layout } from './components/Layout'
import { PostPage } from './pages/PostPage'
import { NotFoundPage } from './pages/NotFoundPage'

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
                <Route path=":id" element={<PostPage />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppThemeProvider>
    </QueryClientProvider>
  )
}

export default App
