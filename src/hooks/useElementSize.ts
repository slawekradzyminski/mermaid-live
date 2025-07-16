import { useState, useEffect, type RefObject } from 'react'

interface ElementSize {
  width: number
  height: number
}

export function useElementSize(elementRef: RefObject<HTMLElement | null>): ElementSize {
  const [size, setSize] = useState<ElementSize>({ width: 0, height: 0 })

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        setSize({ width, height })
      }
    })

    resizeObserver.observe(element)

    // Set initial size
    const { width, height } = element.getBoundingClientRect()
    setSize({ width, height })

    return () => {
      resizeObserver.disconnect()
    }
  }, [elementRef])

  return size
} 