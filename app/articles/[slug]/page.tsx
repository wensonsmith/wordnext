import dayjs from "dayjs"
import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { cache } from "react"
import { RiBookOpenLine, RiCalendarEventLine, RiFolderLine, RiHashtag } from "react-icons/ri"

import Back from "../../../components/back"
import Waline from "../../../components/waline"
import { fetchArticles } from "../../../lib/strapi"
import Remark from "../../../lib/markdown"
import { getStrapiMedia, getStrapiMediaAlt } from "../../../lib/utils"

type ArticlePageProps = {
  params: Promise<{ slug: string }>
}

const getArticleBySlug = cache(async (slug: string) => {
  const response = await fetchArticles({
    filters: { slug },
    pagination: { page: 1, pageSize: 1 },
    populate: {
      cover: { fields: ["url", "alternativeText", "name"] },
      tags: { fields: ["name", "slug"] },
      category: { fields: ["name", "slug"] },
    },
  })
  return response.data[0] ?? null
})

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) return { title: "文章不存在" }

  return {
    title: article.title,
    description: article.description ?? article.content.slice(0, 150),
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()

  const contentHtml = await Remark(article.content)
  const walineServer = process.env.NEXT_PUBLIC_WALINE_URL

  return (
    <div className="bg-gradient-to-tl from-cyan-50 to-violet-50 dark:from-stone-900 dark:to-slate-800 pt-72 -mt-24 pb-10">
      <div className="container relative m-auto rounded-2xl bg-white min-h-screen-sm p-6 md:p-20 dark:bg-slate-900">
        <div className="absolute -top-8 left-0 h-8 flex justify-center w-full">
          <div className="w-11/12 bg-slate-100 dark:bg-slate-700 rounded-t-xl h-full" />
        </div>
        <div className="absolute -top-16 left-0 h-8 flex justify-center w-full">
          <div className="w-10/12 bg-slate-200 dark:bg-slate-600 rounded-t-xl h-full" />
        </div>
        <div className="absolute -top-24 left-0 h-8 flex justify-center w-full">
          <div className="w-9/12 bg-slate-300 dark:bg-slate-500 rounded-t-xl h-full" />
        </div>
        <div className="flex justify-start"><Back /></div>
        <div className="items-center justify-between text-center">
          <div className="text-4xl my-5 break-all">{article.title}</div>
          <div className="flex text-md gap-4 text-slate-500 justify-center">
            <div className="flex items-center gap-1">
              <RiCalendarEventLine />
              {dayjs(article.createdAt).format("YYYY-MM-DD")}
            </div>
            {article.category && (
              <div className="md:flex hidden items-center gap-1">
                <RiFolderLine />
                {article.category.name}
              </div>
            )}
            <div className="flex items-center gap-1">
              <RiHashtag />
              {article.tags?.map((tag) => <div key={tag.documentId}>{tag.name}</div>)}
            </div>
            <div className="items-center gap-1 hidden">
              <RiBookOpenLine />
              <div className="waline-pageview-count" />
            </div>
          </div>
        </div>
        {article.cover && (
          <div className="h-40 md:h-80 w-full overflow-hidden rounded-xl relative my-10">
            <Image
              alt={getStrapiMediaAlt(article.cover)}
              src={getStrapiMedia(article.cover)}
              className="object-cover"
              fill
              priority
            />
          </div>
        )}

        <div className="md:w-4/5 content mx-auto my-10">
          <article className="prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>

        {walineServer && (
          <div className="md:w-3/4 mx-auto mt-10">
            <Waline serverURL={walineServer} path={article.slug} />
          </div>
        )}
      </div>
    </div>
  )
}
