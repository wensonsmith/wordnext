"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Category({ tag }: any) {
  const href = `/tags/${tag.attributes.slug}`
  const path = usePathname()

  const activeClass = href == path ? 'bg-lime-50 dark:bg-gradient-to-br border-white dark:text-lime-300 dark:from-gray-800 dark:to-slate-900 ring-2 ring-lime-200 dark:ring-lime-300': 'bg-white'

  return (
    <Link
      href={href}
      key={tag.id}
      className={`min-w-fit text-sm dark:border-slate-400 dark:text-slate-400 border cursor-pointer px-4 py-1 rounded-full mr-1 mb-1 ${activeClass}`}
    >
      # {tag.attributes.name}
    </Link>
  )
}
