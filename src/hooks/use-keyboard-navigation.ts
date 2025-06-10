import { useEffect, useRef, useState } from "react"

type UseKeyboardNavigationProps = {
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  customerRef: React.RefObject<HTMLElement | null>;
  productRefs: React.MutableRefObject<(HTMLElement | null)[]>;
};

export function useKeyboardNavigation({
  searchInputRef,
  customerRef,
  productRefs,
}: UseKeyboardNavigationProps) {
  const [selectedProductIndex, setSelectedProductIndex] = useState<number | null>(null)

  // Initial focus on customer
  useEffect(() => {
    customerRef.current?.focus()
  }, [customerRef])

  // Press numbers o letters goes to te search product component
  useEffect(() => {
    const handleAlphaNumericFocusSearch = (e: KeyboardEvent) => {
      const isTypingInInput =
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA" ||
        document.activeElement?.getAttribute("contenteditable") === "true"

      const isAlphaNumeric = /^[a-zA-Z0-9]$/.test(e.key)

      if (!isTypingInInput && isAlphaNumeric) {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
    }

    window.addEventListener("keydown", handleAlphaNumericFocusSearch)
    return () => window.removeEventListener("keydown", handleAlphaNumericFocusSearch)
  }, [searchInputRef])

  // Arrow keys to navigate products
  useEffect(() => {
    const handleArrowNavigation = (e: KeyboardEvent) => {
      if (selectedProductIndex === null) return

      const total = productRefs.current.length
      if (e.key === "ArrowRight") {
        e.preventDefault()
        const next = (selectedProductIndex + 1) % total
        productRefs.current[next]?.focus()
        setSelectedProductIndex(next)
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        const prev = (selectedProductIndex - 1 + total) % total
        productRefs.current[prev]?.focus()
        setSelectedProductIndex(prev)
      }
    }

    window.addEventListener("keydown", handleArrowNavigation)
    return () => window.removeEventListener("keydown", handleArrowNavigation)
  }, [selectedProductIndex, productRefs])

  // Update index when a card is focused
  const onProductFocus = (index: number) => setSelectedProductIndex(index)

  return { onProductFocus }
}