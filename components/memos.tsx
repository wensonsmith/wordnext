import { MdFormatQuote } from "react-icons/md"
import dayjs from "dayjs"

export default function Memos({ memos }: any) {
  return (
    <>
      <div className="text-xs text-gray-500 mt-10 mb-2 sm:px-0 px-4">
        只言片语
      </div>
      <div className="grid sm:grid-cols-4 gap-6 grid-cols-1 sm:px-0 px-4">
        {memos.map((memo: any) => (
          <div
            className=" bg-white rounded-sm border p-6 text-gray-600 relative"
            key={memo.id}
          >
            <MdFormatQuote className="float-right text-blue-gray-300 scale-md mx-2" />
            <div className="font-serif">{memo.attributes.content}</div>
            <div className="text-xs text-gray-400 text-left mt-2">
              {dayjs(memo.attributes.createdAt).format("YYYY-MM-DD")}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
