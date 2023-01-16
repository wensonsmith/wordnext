'use client'

import { useRouter, usePathname } from 'next/navigation'
import { HiOutlineArrowLongRight, HiOutlineArrowLongLeft } from 'react-icons/hi2'

type MetaPagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export default function Pagination( { pagination }: { pagination: MetaPagination} ) {
  const router = useRouter()
  const path = usePathname()
  const pageNav = (type: string) => {
    if (type === 'next') {
      if (pagination.page === pagination.pageCount) {
        return
      }
      const href = `${path}?page=${pagination.page + 1}`
      router.push(href)
    } else {
      if (pagination.page === 1) {
        return
      }
      const href = `${path}?page=${pagination.page - 1}`
      router.push(href)
    }
  }

  return (
    <div className="flex justify-center mb-6 mt-4" onClick={() => pageNav('prev')}>
      <div className="p-2 flex justify-start cursor-pointer group">
        <HiOutlineArrowLongLeft className="group-hover:-translate-x-3 transition text-lg"/>
        <div className="text-sm ml-1">Prev</div>
      </div>
      <div className="p-2 text-sm border-r border-l">{pagination.page} <span className="text-slate-500 text-xs">/ {pagination.pageCount}</span></div>
      <div className="p-2 flex justify-end cursor-pointer group" onClick={() => pageNav('next')}>
        <div className="text-sm mr-1">Next</div>
        <HiOutlineArrowLongRight className="group-hover:translate-x-3 transition text-lg"/>
      </div>
    </div>
  )
}