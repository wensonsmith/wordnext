import dayjs from 'dayjs'
import Image from 'next/image'
import Waline from '../../../components/waline'
import { fetchArticles } from '../../../lib/strapi'
import { getStrapiMedia, getStrapiMediaAlt } from '../../../lib/utils'
import Remark from '../../../lib/markdown'
import { RiBookOpenLine, RiCalendarEventLine, RiFolderLine, RiHashtag } from 'react-icons/ri'
import Back from '../../../components/back'

const WalineServer = process.env.NEXT_PUBLIC_WALINE_URL as string

export default async function Article({ params }: any) {

  const articles = await fetchArticles({
    filters: {
      slug: params?.slug,
    },
    populate: {
      cover: '*',
      tags: '*',
      category: '*',
    }
  })

  const article = articles.data.pop()

  const contentHtml = await Remark(article.attributes.content)

  return (
    <div className="bg-gradient-to-tl from-cyan-50 to-violet-50 dark:from-stone-900 dark:to-slate-800 pt-72 -mt-24 pb-10">
      <div className="container relative m-auto rounded-2xl bg-white min-h-screen-sm p-6 md:p-20 dark:bg-slate-900">
        <div className="absolute -top-8 left-0 h-8 flex justify-center w-full">
          <div className="w-11/12 bg-slate-100 dark:bg-slate-700 rounded-t-xl h-full"></div>
        </div>
        <div className="absolute -top-16 left-0 h-8 flex justify-center w-full">
          <div className="w-10/12 bg-slate-200 dark:bg-slate-600 rounded-t-xl h-full"></div>
        </div>
        <div className="absolute -top-24 left-0 h-8 flex justify-center w-full">
          <div className="w-9/12 bg-slate-300 dark:bg-slate-500 rounded-t-xl h-full"></div>
        </div>
        <div className="flex justify-start">
          <Back/>
        </div>
        <div className="items-center justify-between text-center">
          <div className="text-4xl my-5 break-all">
            {article.attributes.title}
          </div>
          <div className="flex text-md gap-4 text-slate-500 justify-center">
            <div className='flex items-center gap-1'>
              <RiCalendarEventLine/>
              {dayjs(article.attributes.createdAt).format("YYYY-MM-DD")}
            </div>
            <div className='md:flex hidden items-center gap-1 '>
              <RiFolderLine/>
              {article.attributes.category.data.attributes.name}
            </div>
            <div className='flex items-center gap-1'>
              <RiHashtag/>
              {article.attributes.tags.data && article.attributes.tags.data.map((tag: any) => (
                <div key={tag.id}>{tag.attributes.name}</div>
              ))}
            </div>
            <div className='flex items-center gap-1'>
              <RiBookOpenLine/>
              <div className="waline-pageview-count"/>
            </div>
          </div>
        </div>
        {article.attributes.cover.data && (
          <div className="h-40 md:h-80 w-full overflow-hidden rounded-xl relative my-10">
            <Image
              alt={getStrapiMediaAlt(article.attributes.cover)}
              src={getStrapiMedia(article.attributes.cover)}
              className='object-cover'
              fill
            />
          </div>
        )}

        <div className="md:w-4/5 content mx-auto my-10">
          <article className='prose dark:prose-invert' dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>

        <div className="md:w-3/4 mx-auto mt-10">
          <Waline serverURL={WalineServer} path={article.attributes.slug} />
        </div>
      </div>
    </div>
  )
}
