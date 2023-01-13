import ArticleCard from "../../../components/article-card"
import { fetchArticles } from "../../../lib/strapi"

export default async function Articles() {
  const response = await fetchArticles({
    filters: {},
    populate: {
      tags: "*",
    },
  })

  const articles = response.data

  return (
    <div className="container m-auto pt-10 px-6 md:px-0">
      <div className="text-xl font-light mb-6 font-mono dark:text-slate-400">
        ARTICLES <span className="font-xl text-red-500 font-medium">/</span> 全部文章
      </div>

      <div className="grid md:grid-cols-4 grid-cols-1 gap-6">
        {articles.map((article: any) => (
          <ArticleCard article={article} key={article.id} />
        ))}
      </div>
    </div>
  )
}