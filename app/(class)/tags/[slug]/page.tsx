import { fetchArticles, fetchTags } from "../../../../lib/strapi"
import ArticleCard from "../../../../components/article-card"

export default async function Tags({ params, searchParams}: any) {
  const response = await fetchArticles({
    filters: {
      tags: {
        slug: params?.slug,
      },
    },
    populate: {
      tags: "*",
    },
  })

  const tagResponse = await fetchTags({})

  const articles = response.data
  const tags = tagResponse.data

  const tagger = tags.find((item: any) => item.attributes.slug === params?.slug)

  return (
    <div className="container m-auto pt-10">
      <div className="text-xl font-light mb-6 font-mono">
        TAGS <span className="font-xl text-red-500 font-medium">/</span> {tagger.attributes.name}
      </div>

      <div className="grid md:grid-cols-4 grid-cols-1 gap-5">
        {articles.map((article: any) => (
          <ArticleCard article={article} key={article.id} />
        ))}
      </div>
    </div>
  )
}
