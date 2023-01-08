"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Category({ tag }: any) {
  const href = `/tags/${tag.attributes.slug}`
  const path = usePathname()

  return (
    <Link
      href={href}
      key={tag.id}
      className={`cursor-pointer px-4 py-2 border rounded-full mr-2 mb-2 hover:bg-slate-100 ${href == path ? 'bg-green-100': ''}`}
    >
      # {tag.attributes.name}
    </Link>
  )
}
