import { createContext, useContext, useCallback, useRef } from 'react'

type ScrollToTopFn = () => void

const ScrollContext = createContext<ScrollToTopFn | null>(null)

export function ScrollProvider({ children, scrollRef }: { children: React.ReactNode; scrollRef: React.RefObject<HTMLDivElement | null> }) {
  const scrollToTop = useCallback(() => {
    scrollRef.current?.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [scrollRef])

  return <ScrollContext.Provider value={scrollToTop}>{children}</ScrollContext.Provider>
}

export function useScrollToTop() {
  return useContext(ScrollContext)
}
