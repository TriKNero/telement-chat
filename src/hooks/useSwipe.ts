import { useCallback, useRef } from 'react'

const MIN_SWIPE_DISTANCE = 90

export function useSwipe(onSwipeRight: () => void, onSwipeLeft?: () => void) {
  const touchStart = useRef<{ x: number } | null>(null)

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX }
  }, [])

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStart.current) return
      const deltaX = e.changedTouches[0].clientX - touchStart.current.x
      touchStart.current = null
      if (deltaX > MIN_SWIPE_DISTANCE) {
        onSwipeRight()
      } else if (deltaX < -MIN_SWIPE_DISTANCE && onSwipeLeft) {
        onSwipeLeft()
      }
    },
    [onSwipeRight, onSwipeLeft]
  )

  return { onTouchStart, onTouchEnd }
}
