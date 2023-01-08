import { fetchArticles, fetchCategories } from "../../../../lib/strapi"
import ArticleCard from "../../../../components/article-card"

export default async function Categories({ params, searchParams}: any) {
  const response = await fetchArticles({
    filters: {
      category: {
        slug: params?.slug,
      },
    },
    populate: {
      tags: "*",
    },
  })

  const cateResponse = await fetchCategories()

  const articles = response.data
  const cates = cateResponse.data

  const category = cates.find((item: any) => item.attributes.slug === params?.slug)

  return (
    <div className="container m-auto pt-10">
      <div className="text-xl font-light mb-6 font-mono">
        CATEGORY <span className="font-xl text-red-500 font-medium">/</span> {category.attributes.name}
      </div>

      <div className="grid md:grid-cols-4 grid-cols-1 gap-5">
        {articles.map((article: any) => (
          <ArticleCard article={article} key={article.id} />
        ))}
      </div>
    </div>
  )
}
