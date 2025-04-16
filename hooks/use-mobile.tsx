"use client"

import { useEffect, useState } from "react"

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // Avoid errors during SSR by checking if window is defined
    if (typeof window === "undefined") {
      return
    }

    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    const listener = () => {
      if (typeof window !== "undefined") {
        setMatches(window.matchMedia(query).matches)
      }
    }

    window.addEventListener("resize", listener)

    return () => window.removeEventListener("resize", listener)
  }, [query]) // Remove matches from the dependency array

  return matches
}

// Corrigindo o nome da exportação para useIsMobile em vez de useMobile
export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 768px)")
}

// Mantendo a exportação antiga para compatibilidade
export const useMobile = useIsMobile
