import { fetchArticles, fetchTags } from "../../../../lib/strapi"
import ArticleCard from "../../../../components/article-card"
import Pagination from "../../../../components/pagination"

export default async function Tags({ params, searchParams}: any) {
  const response = await fetchArticles({
    pagination: {
      page: searchParams.page,
      pageSize: 4
    },
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
  const { pagination } = response.meta

  const tagger = tags.find((item: any) => item.attributes.slug === params?.slug)

  return (
    <div className="container m-auto pt-10 px-6 md:px-0">
      <div className="text-xl font-light mb-6 font-mono dark:text-gray-500 flex items-center">
        TAGS <span className="font-xl text-red-500 font-medium px-1">/</span> {tagger.attributes.name}
        <div className="text-xs px-1 rounded-full bg-red-500 text-white ml-2">{pagination.total}</div>
      </div>

      <div className="grid md:grid-cols-4 grid-cols-1 gap-6">
        {articles.map((article: any) => (
          <ArticleCard article={article} key={article.id} />
        ))}
      </div>

      { !articles.length && (
        <div className="text-center text-gray-500 py-10">文章还在脑海酝酿</div>
      )}

      <Pagination pagination={pagination}/>
    </div>
  )
}
