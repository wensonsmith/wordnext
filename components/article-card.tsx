import Link from "next/link"
import dayjs from "dayjs"

export default function ArticleCard({ article }: any) {
  return (
    <div className="flex flex-col justify-between mb-10 border-b pb-3">
      <Link
        href={`/articles/${article.attributes.slug}`}
        className="cursor-pointer  leading-tight hover:text-green-400 break-all"
      >
        {article.attributes.title}
      </Link>
      <div className="text-sm font-light text-gray-600 my-3">
        {article.attributes.content.slice(0, 57)}
      </div>
      <div className="flex justify-between text-xs text-gray-500">
        <div className="flex gap-2 items-center">
          {article.attributes.tags.data.map((tag: any) => (
            <Link href={`/tags/${tag.attributes.slug}`} key={tag.id}>
              <span className=" hover:text-green-400 transition">
                <span className="text-green-400"># </span>
                {tag.attributes.name}
              </span>
            </Link>
          ))}
        </div>
        <div>{dayjs(article.attributes.createdAt).format("M月DD日")} </div>
      </div>
    </div>
  )
}
