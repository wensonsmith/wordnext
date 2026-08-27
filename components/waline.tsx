"use client"

import type { WalineInitOptions, WalineInstance } from "@waline/client"
import { useTheme } from "next-themes"
import { useEffect, useRef } from "react"

import "@waline/client/dist/waline.css"

export type WalineOptions = Pick<WalineInitOptions, "serverURL"> & { path: string }

export default function Waline({ path, serverURL }: WalineOptions) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    let active = true
    let instance: WalineInstance | null | undefined
    const container = containerRef.current

    const mountWaline = async () => {
      const { init } = await import("@waline/client")
      if (!active || !container) return

      instance = init({
        el: container,
        serverURL,
        path,
        search: false,
        pageview: true,
        lang: "zh",
        imageUploader: false,
        copyright: false,
        dark: resolvedTheme === "dark",
      })
    }

    void mountWaline().catch((error: unknown) => {
      console.error(
        "Waline failed to initialize.",
        error instanceof Error ? error.message : "Unknown error",
      )
    })

    return () => {
      active = false
      instance?.destroy()
    }
  }, [path, resolvedTheme, serverURL])

  return <div ref={containerRef} />
}
