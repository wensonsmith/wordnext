"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function ScrollUp() {
  const pathname = usePathname()

  useEffect(() => {
    window.document.scrollingElement?.scrollTo(0, 0)
  }, [pathname])

  return null
}
