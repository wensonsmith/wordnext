import type { Metadata } from "next"

import ArticleCard from "../../../components/article-card"
import Pagination from "../../../components/pagination"
import { getPageNumber, type PageSearchParams } from "../../../lib/page"
import { fetchArticles } from "../../../lib/strapi"

export const metadata: Metadata = {
  title: "文章列表",
}

export default async function Articles({ searchParams }: { searchParams: PageSearchParams }) {
  const query = await searchParams
  const response = await fetchArticles({
    pagination: { page: getPageNumber(query.page), pageSize: 12 },
    sort: ["createdAt:desc"],
    populate: { tags: { fields: ["name", "slug"] } },
  })

  return (
    <div className="container m-auto pt-10 px-6 md:px-0">
      <div className="text-xl font-light mb-6 font-mono dark:text-slate-400 flex items-center">
        ARTICLES <span className="font-xl text-red-500 font-medium">/</span> 全部文章
        <div className="text-xs px-1 rounded-full bg-red-500 text-white ml-2">{response.meta.pagination.total}</div>
      </div>

      <div className="grid md:grid-cols-4 grid-cols-1 gap-6">
        {response.data.map((article) => (
          <ArticleCard article={article} key={article.documentId} />
        ))}
      </div>

      <Pagination pagination={response.meta.pagination} />
    </div>
  )
}
