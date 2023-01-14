import Link from "next/link"
import Image from "next/image"
import { getStrapiMedia, getStrapiMediaAlt } from "../lib/utils"

export default function Articles({ posts }: any) {
  return (
    <>
      <div className="text-xs text-gray-500 mt-10 md:mt-24 mb-2">
        最新文章
      </div>
      <div className="grid sm:grid-cols-3 sm:px-0 gap-6 grid-cols-1">
        {posts.map((post: any) => (
          <Link href={`/articles/${post.attributes.slug}`} key={post.id}>
            <div className="flex items-center p-3 bg-gradient-to-br from-slate-100 to-violet-100 dark:from-gray-800 dark:bg-slate-900 rounded hover:shadow-xl transition cursor-pointer ">
              <div className="p-3 min-w-0 flex-1">
                <div className="mb-2 truncate">{post.attributes.title}</div>
                <div className="flex justify-start">
                  {post.attributes.tags.data &&
                    post.attributes.tags.data.map((tag: any) => (
                      <div key={tag.id}>
                        <div className="text-xs text-gray-500 mr-2 hover:text-green-400 transition">
                          # {tag.attributes.name}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              {post.attributes.cover.data && (
                <div className="p-3 relative w-16 h-16">
                  <Image
                    alt={getStrapiMediaAlt(post.attributes.cover)}
                    src={getStrapiMedia(post.attributes.cover)}
                    className="rounded"
                    fill
                  />
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
