"use client"

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { RiSunLine, RiMoonFill} from 'react-icons/ri'

export default function ThemeToggler() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme} = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  if (theme === 'dark') {
    return <RiSunLine onClick={() => setTheme('light')}/>
  } else {
    return <RiMoonFill onClick={() => setTheme('dark')}/>
  }
}