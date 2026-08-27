"use client"

import { useTheme } from "next-themes"
import { useSyncExternalStore } from "react"
import { RiMoonFill, RiSunLine } from "react-icons/ri"

const subscribe = () => () => undefined

export default function ThemeToggler() {
  const mounted = useSyncExternalStore(subscribe, () => true, () => false)
  const { resolvedTheme, setTheme } = useTheme()

  if (!mounted) return null

  const isDark = resolvedTheme === "dark"
  return (
    <button
      type="button"
      aria-label={isDark ? "切换到浅色模式" : "切换到深色模式"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="cursor-pointer"
    >
      {isDark ? <RiSunLine /> : <RiMoonFill />}
    </button>
  )
}
