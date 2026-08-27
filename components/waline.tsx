"use client"

import { init } from "@waline/client"
import type { WalineInitOptions } from "@waline/client"
import { useTheme } from "next-themes"
import { useEffect, useRef } from "react"

import "@waline/client/dist/waline.css"

export type WalineOptions = Omit<WalineInitOptions, "el"> & { path: string }

export default function Waline(props: WalineOptions) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const instance = init({
      ...props,
      el: containerRef.current,
      search: false,
      pageview: true,
      lang: "zh",
      imageUploader: false,
      copyright: false,
      dark: resolvedTheme === "dark",
    })

    return () => instance?.destroy()
  }, [props, resolvedTheme])

  return <div ref={containerRef} />
}
