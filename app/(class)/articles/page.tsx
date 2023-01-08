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
    <div className="container m-auto pt-10">
      <div className="text-xl font-light mb-6 font-mono">
        ARTICLES <span className="font-xl text-red-500 font-medium">/</span> 全部文章
      </div>

      <div className="grid md:grid-cols-4 grid-cols-1 gap-5">
        {articles.map((article: any) => (
          <ArticleCard article={article} key={article.id} />
        ))}
      </div>
    </div>
  )
}