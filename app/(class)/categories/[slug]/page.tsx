import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { cache } from "react"

import ArticleCard from "../../../../components/article-card"
import Pagination from "../../../../components/pagination"
import { getPageNumber, type PageSearchParams } from "../../../../lib/page"
import { fetchArticles, fetchCategories } from "../../../../lib/strapi"

type CategoryPageProps = {
  params: Promise<{ slug: string }>
  searchParams: PageSearchParams
}

const getCategoryBySlug = cache(async (slug: string) => {
  const response = await fetchCategories({
    filters: { slug },
    pagination: { page: 1, pageSize: 1 },
  })
  return response.data[0] ?? null
})

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  return category
    ? { title: `文章分类 / ${category.name}`, description: category.description }
    : { title: "分类不存在" }
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const [{ slug }, query] = await Promise.all([params, searchParams])
  const [response, category] = await Promise.all([
    fetchArticles({
      pagination: { page: getPageNumber(query.page), pageSize: 12 },
      sort: ["createdAt:desc"],
      filters: { category: { slug } },
      populate: { tags: { fields: ["name", "slug"] } },
    }),
    getCategoryBySlug(slug),
  ])

  if (!category) notFound()

  return (
    <div className="container m-auto pt-10 px-6 md:px-0">
      <div className="text-xl font-light mb-6 font-mono flex items-center">
        CATEGORY <span className="font-xl text-red-500 font-medium px-1">/</span> {category.name}
        <div className="text-xs px-1 rounded-full bg-red-500 text-white ml-2">{response.meta.pagination.total}</div>
      </div>

      <div className="grid md:grid-cols-4 grid-cols-1 gap-6">
        {response.data.map((article) => (
          <ArticleCard article={article} key={article.documentId} />
        ))}
      </div>
      {!response.data.length && (
        <div className="text-center text-gray-500 py-10">文章还在脑海酝酿</div>
      )}

      <Pagination pagination={response.meta.pagination} />
    </div>
  )
}
