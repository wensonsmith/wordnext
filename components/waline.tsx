'use client'

import React, { useEffect, useRef } from 'react'
import { init } from '@waline/client'
import '@waline/client/dist/waline.css'

import type { WalineInstance, WalineInitOptions } from '@waline/client'
import { useTheme } from 'next-themes'

export type WalineOptions = Omit<WalineInitOptions, 'el'> & { path: string}

const Waline = (props: WalineOptions) => {
  const walineInstanceRef = useRef<WalineInstance | null>(null)
  const containerRef = React.createRef<HTMLDivElement>()
  const { theme } = useTheme()

  useEffect(() => {
    walineInstanceRef.current = init({
      ...props,
      el: containerRef.current,
      search: false,
      pageview: true,
      lang: 'zh',
      imageUploader: false,
      copyright: false,
      dark: theme === 'dark',
    })

    return () => walineInstanceRef.current?.destroy()
  })

  useEffect(() => {
    walineInstanceRef.current?.update(props)
  })

  return <div ref={containerRef} />
}

export default Waline