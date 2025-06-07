import * as React from "react"

const MOBILE_BREAKPOINT = 768

/**
 * useIsMobile
 * 
 * A custom hook that returns true if the current screen width
 * is less than the defined mobile breakpoint (768px).
 *
 * Useful for conditionally rendering mobile vs. desktop UI components.
 */
export const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

    // Handler to update state on viewport change
    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches)
    }

    // Set initial value
    setIsMobile(mediaQuery.matches)

    // Subscribe to changes
    mediaQuery.addEventListener("change", handleChange)

    // Cleanup on unmount
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  return isMobile
}