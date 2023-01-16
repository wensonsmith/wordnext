import ArticleCard from "../../../components/article-card"
import Pagination from "../../../components/pagination"
import { fetchArticles } from "../../../lib/strapi"

export default async function Articles({ searchParams }: any) {
  const response = await fetchArticles({
    pagination: {
      page:searchParams.page,
      pageSize: 12,
    },
    populate: {
      tags: "*",
    },
  })

  const articles = response.data
  const { pagination } = response.meta

  return (
    <div className="container m-auto pt-10 px-6 md:px-0">
      <div className="text-xl font-light mb-6 font-mono dark:text-slate-400 flex items-center">
        ARTICLES <span className="font-xl text-red-500 font-medium">/</span> 全部文章
        <div className="text-xs px-1 rounded-full bg-red-500 text-white ml-2">{pagination.total}</div>
      </div>

      <div className="grid md:grid-cols-4 grid-cols-1 gap-6">
        {articles.map((article: any) => (
          <ArticleCard article={article} key={article.id} />
        ))}
      </div>

      <Pagination pagination={pagination}/>
    </div>
  )
}