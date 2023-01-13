"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Category({ category }: any) {
  const href = `/categories/${category.attributes.slug}`
  const path = usePathname()

  const activeClass = href == path ? 'dark:from-green-800 dark:to-dark ring-2 ring-lime-200 dark:ring-lime-300 dark:text-white': ''

  return (
    <Link
      href={href}
      key={category.id}
      className={`flex flex-col items-center md:flex-row flex-1 h-24 rounded-lg cursor-pointer transition bg-gradient-to-tr dark:bg-gradient-to-br from-white to-sky-50 dark:from-slate-800 dark:to-slate-900 ${activeClass}`}
    >
      <div className="md:w-1/3 flex justify-center items-center h-full">
        <div className="w-16 h-16 bg-slate-600 rounded-md"></div>
      </div>
      <div className="flex-1 flex flex-col justify-center gap-1">
        <div className="text-sm py-1">{category.attributes.name}</div>
        <div className="text-xs text-gray-400 hidden md:block">
          {category.attributes.description}
        </div>
      </div>
    </Link>
  )
}
