"use client"

import { usePathname, useRouter } from "next/navigation"
import { GiSpiralLollipop } from "react-icons/gi"
import { HiOutlineArrowLongLeft, HiOutlineArrowLongRight } from "react-icons/hi2"

import type { Pagination as PaginationData } from "../lib/strapi-types"

export default function Pagination({ pagination }: { pagination: PaginationData }) {
  const router = useRouter()
  const path = usePathname()

  const goToPage = (page: number) => router.push(`${path}?page=${page}`)

  if (pagination.pageCount <= 1) {
    return (
      <div className="mb-6 mt-4 text-slate-500 flex gap-2 items-center justify-center">
        <GiSpiralLollipop /> That&apos;s all
      </div>
    )
  }

  return (
    <div className="flex justify-center mb-6 mt-4">
      <button
        type="button"
        disabled={pagination.page <= 1}
        className="p-2 flex justify-start cursor-pointer group disabled:cursor-not-allowed disabled:opacity-40"
        onClick={() => goToPage(pagination.page - 1)}
      >
        <HiOutlineArrowLongLeft className="group-hover:-translate-x-3 transition text-lg" />
        <span className="text-sm ml-1">Prev</span>
      </button>
      <div className="p-2 text-sm border-r border-l">
        {pagination.page} <span className="text-slate-500 text-xs">/ {pagination.pageCount}</span>
      </div>
      <button
        type="button"
        disabled={pagination.page >= pagination.pageCount}
        className="p-2 flex justify-end cursor-pointer group disabled:cursor-not-allowed disabled:opacity-40"
        onClick={() => goToPage(pagination.page + 1)}
      >
        <span className="text-sm mr-1">Next</span>
        <HiOutlineArrowLongRight className="group-hover:translate-x-3 transition text-lg" />
      </button>
    </div>
  )
}
