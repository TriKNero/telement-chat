import { Alert, AlertTitle, Button } from '@mui/material'

interface ErrorFallbackProps {
  message?: string
  onRetry?: () => void
}

export function ErrorFallback({ message = 'Something went wrong', onRetry }: ErrorFallbackProps) {
  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      {message}
      {onRetry && (
        <Button color="inherit" size="small" onClick={onRetry} sx={{ mt: 1 }}>
          Retry
        </Button>
      )}
    </Alert>
  )
}
