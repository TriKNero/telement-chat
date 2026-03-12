import { useCallback, useRef } from 'react'

const MIN_SWIPE_DISTANCE = 55
const MAX_VERTICAL_RATIO = 0.6

export function useSwipe(onSwipeRight: () => void, onSwipeLeft?: () => void) {
  const touchStart = useRef<{ x: number; y: number } | null>(null)

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    }
  }, [])

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStart.current) return
      const deltaX = e.changedTouches[0].clientX - touchStart.current.x
      const deltaY = e.changedTouches[0].clientY - touchStart.current.y
      touchStart.current = null
      const absX = Math.abs(deltaX)
      const absY = Math.abs(deltaY)
      if (absY > absX * MAX_VERTICAL_RATIO) return
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
