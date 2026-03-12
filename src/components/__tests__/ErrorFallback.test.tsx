import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ErrorFallback } from '../ErrorFallback'

describe('ErrorFallback', () => {
  it('renders message', () => {
    render(<ErrorFallback message="Custom error" />)
    expect(screen.getByText('Custom error')).toBeInTheDocument()
    expect(screen.getByText('Error')).toBeInTheDocument()
  })

  it('renders default message when no message prop', () => {
    render(<ErrorFallback />)
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  it('calls onRetry when Retry button clicked', async () => {
    const onRetry = vi.fn()
    render(<ErrorFallback message="Fail" onRetry={onRetry} />)
    fireEvent.click(screen.getByRole('button', { name: /retry/i }))
    expect(onRetry).toHaveBeenCalledTimes(1)
  })

  it('does not render Retry button when onRetry not provided', () => {
    render(<ErrorFallback message="Fail" />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
