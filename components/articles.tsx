import Image from "next/image"
import Link from "next/link"

import type { Article } from "../lib/strapi-types"
import { getStrapiMedia, getStrapiMediaAlt } from "../lib/utils"

export default function Articles({ posts }: { posts: Article[] }) {
  return (
    <>
      <div className="text-xs text-gray-500 mt-10 md:mt-24 mb-2">最新文章</div>
      <div className="grid sm:grid-cols-3 sm:px-0 gap-6 grid-cols-1">
        {posts.map((post) => (
          <Link href={`/articles/${post.slug}`} key={post.documentId}>
            <div className="flex items-center p-3 bg-gradient-to-br from-slate-100 to-violet-100 dark:from-gray-800 dark:bg-slate-900 rounded hover:shadow-xl transition cursor-pointer">
              <div className="p-3 min-w-0 flex-1">
                <div className="mb-2 truncate">{post.title}</div>
                <div className="flex justify-start">
                  {post.tags?.map((tag) => (
                    <div key={tag.documentId} className="text-xs text-gray-500 mr-2 hover:text-green-400 transition">
                      # {tag.name}
                    </div>
                  ))}
                </div>
              </div>
              {post.cover && (
                <div className="p-3 relative w-16 h-16">
                  <Image
                    alt={getStrapiMediaAlt(post.cover)}
                    src={getStrapiMedia(post.cover)}
                    className="rounded object-cover"
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
