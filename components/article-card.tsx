import dayjs from "dayjs"
import Link from "next/link"

import type { Article } from "../lib/strapi-types"

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <div className="flex flex-col justify-between mb-2 md:mb-10 border-b pb-3 dark:border-slate-700">
      <Link
        href={`/articles/${article.slug}`}
        className="cursor-pointer leading-tight hover:text-green-400 break-all dark:text-slate-200"
      >
        {article.title}
      </Link>
      <div className="text-sm font-light text-slate-500 my-3">
        {article.content.slice(0, 57)}
      </div>
      <div className="flex justify-between text-xs text-gray-500 dark:text-slate-600">
        <div className="flex gap-2 items-center">
          {article.tags?.map((tag) => (
            <Link href={`/tags/${tag.slug}`} key={tag.documentId}>
              <span className="hover:text-green-400 transition">
                <span className="text-green-400"># </span>
                {tag.name}
              </span>
            </Link>
          ))}
        </div>
        <div>{dayjs(article.createdAt).format("M月D日")}</div>
      </div>
    </div>
  )
}
