'use client'

import { useRouter } from "next/navigation"
import { BsArrowBarLeft } from "react-icons/bs"

export default function Back() {
  const router = useRouter()
  return (
    <div  onClick={router.back} className="flex items-center gap-2 rounded py-2 px-3 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer text-gray-500">
      <BsArrowBarLeft className="text-xl" />
      <span className="text-md">返回</span>
    </div>
  )
}
