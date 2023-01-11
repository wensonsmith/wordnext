"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Category({ category }: any) {
  const href = `/categories/${category.attributes.slug}`
  const path = usePathname()

  const activeClass = href == path ? 'bg-gradient-to-br from-green-100 to-indigo-100 dark:from-gray-500 dark:to-gray-600 ring-2 ring-indigo-300': ''

  return (
    <Link
      href={href}
      key={category.id}
      className={`flex flex-1 h-24 rounded-lg cursor-pointer transition bg-white dark:bg-black ${activeClass}`}
    >
      <div className="w-1/3 flex justify-center items-center h-full">
        <div className="w-16 h-16 bg-red-700 rounded-md"></div>
      </div>
      <div className="flex-1 flex flex-col justify-center gap-1">
        <div className="text-lg">{category.attributes.name}</div>
        <div className="text-xs text-gray-400">
          {category.attributes.description}
        </div>
      </div>
    </Link>
  )
}
