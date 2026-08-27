"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import type { Tag as TagType } from "../../lib/strapi-types"

export default function Tag({ tag }: { tag: TagType }) {
  const href = `/tags/${tag.slug}`
  const path = usePathname()
  const activeClass = href === path
    ? "bg-lime-50 dark:bg-gradient-to-br border-white dark:text-lime-300 dark:from-gray-800 dark:to-slate-900 ring-2 ring-lime-200 dark:ring-lime-300"
    : "bg-white"

  return (
    <Link
      href={href}
      className={`min-w-fit text-sm dark:border-slate-400 dark:text-slate-400 border cursor-pointer px-4 py-1 rounded-full mr-1 mb-1 ${activeClass}`}
    >
      # {tag.name}
    </Link>
  )
}
