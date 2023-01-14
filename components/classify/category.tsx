"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { getStrapiMedia, getStrapiMediaAlt } from "../../lib/utils"

export default function Category({ category }: any) {
  const href = `/categories/${category.attributes.slug}`
  const path = usePathname()

  const activeClass =
    href == path
      ? "dark:from-lime-900 dark:to-dark ring-2 ring-lime-200 dark:ring-lime-300 dark:text-white"
      : ""

  return (
    <Link
      href={href}
      key={category.id}
      className={`flex flex-col items-center md:flex-row flex-1 h-24 rounded-lg cursor-pointer transition bg-gradient-to-tr dark:bg-gradient-to-br from-white to-sky-50 dark:from-slate-800 dark:to-slate-900 ${activeClass}`}
    >
      <div className="md:w-1/3 flex justify-center items-center mt-2 md:mt-0">
        <div className="w-12 h-12 md:w-16 md:h-16 relative">
          {category.attributes.icon.data && (<Image
            src={getStrapiMedia(category.attributes.icon)}
            alt={getStrapiMediaAlt(category.attributes.icon)}
            fill
          />)}
        </div>
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
