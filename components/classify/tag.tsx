"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Category({ tag }: any) {
  const href = `/tags/${tag.attributes.slug}`
  const path = usePathname()

  const activeClass = href == path ? 'bg-gradient-to-br from-green-100 to-indigo-100 dark:from-gray-800 dark:to-green-900 ring-2 ring-indigo-300': ''

  return (
    <Link
      href={href}
      key={tag.id}
      className={`cursor-pointer px-4 py-2 border rounded-full mr-2 mb-2 hover:bg-white ${activeClass}`}
    >
      # {tag.attributes.name}
    </Link>
  )
}
