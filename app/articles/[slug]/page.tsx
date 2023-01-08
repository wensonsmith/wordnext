import dayjs from 'dayjs'
import Image from 'next/image'
import Waline from '../../../components/waline'
import { IoReturnUpBackOutline } from 'react-icons/io5'
import { fetchArticles } from '../../../lib/strapi'
import { getStrapiMedia } from '../../../lib/utils'
import Remark from '../../../lib/markdown'

const WalineServer = process.env.NEXT_PUBLIC_WALINE_URL as string

export default async function Article({ params }: any) {

  const articles = await fetchArticles({
    filters: {
      slug: params?.slug,
    },
    populate: {
      cover: '*'
    }
  })

  const article = articles.data.pop()

  const contentHtml = await Remark(article.attributes.content)

  return (
    <div className="bg-gray-100 pt-48">
      <div className="container relative m-auto rounded-2xl bg-white min-h-screen-sm p-20">
        <div className="absolute -top-8 left-0 h-8 flex justify-center w-full">
          <div className="w-11/12 bg-gray-200 rounded-t-xl h-full"></div>
        </div>
        <div className="absolute -top-16 left-0 h-8 flex justify-center w-full">
          <div className="w-10/12 bg-gray-300 rounded-t-xl h-full"></div>
        </div>
        <div className="absolute -top-24 left-0 h-8 flex justify-center w-full">
          <div className="w-9/12 bg-gray-400 rounded-t-xl h-full"></div>
        </div>
        <div className="flex justify-start">
          <div
            className="flex items-start gap-2 rounded py-2 px-3 hover:bg-blue-gray-100 cursor-pointer "
          >
            <IoReturnUpBackOutline className="text-xl" />
            <span className="text-sm text-gray-400">返回</span>
          </div>
        </div>
        <div className="items-center justify-between text-center">
          <div className="text-4xl my-5">
            {article.attributes.title}
          </div>
          <div className="flex text-sm text-gray-400 justify-center">
            <div>
              {dayjs(article.attributes.createdAt).format("YYYY-MM-DD")}
            </div>
          </div>
        </div>
        {article.attributes.cover.data && (
          <div className="min-h-100 overflow-hidden rounded-xl relative my-10">
            <Image
              src={getStrapiMedia(article.attributes.cover)}
              width={100}
              height={200}
              alt=""
            />
          </div>
        )}
        <div className="flex justify-center mt-10">
          <div className="w-3/4 content">
            <article className='prose prose-sm md:prose-base' dangerouslySetInnerHTML={{ __html: contentHtml }} />
          </div>
        </div>

        <div className="w-3/4 mx-auto mt-10">
          <Waline serverURL={WalineServer} path={article.attributes.slug} />
        </div>
      </div>
    </div>
  )
}
