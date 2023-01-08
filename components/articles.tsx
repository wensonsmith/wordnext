import Link from "next/link"
import Image from "next/image"
import { getStrapiMedia } from "../lib/utils";

export default function Articles({ posts }: any) {
  return (
    <>
      <div className="text-xs text-gray-500 mt-24 mb-2 sm:px-0 px-4">
        最新文章
      </div>
      <div className="grid sm:grid-cols-3 sm:px-0 gap-6 grid-cols-1 px-4">
        {posts.map((post: any) => (
          <Link href={`/articles/${post.attributes.slug}`} key={post.id}>
            <div className="flex p-3 bg-slate-100 rounded hover:shadow-xl transition cursor-pointer ">
              <div className="p-3 min-w-0 flex-1">
                <div className="mb-2 truncate">{post.attributes.title}</div>
                <div className="flex justify-between">
                  {post.attributes.tags.data && post.attributes.tags.data.map((tag: any) => (
                    <div key={tag.id}>
                      <div className="text-xs text-gray-500 mr-2 hover:text-green-400 transition">
                        # {tag.attributes.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {post.attributes.cover.data && (
                <div className="p-3 relative w-20 flex-shrink-0">
                  {/* <Image
                    alt=""
                    src={getStrapiMedia(post.attributes.cover)}
                    className="rounded"
                    width={80}
                    height={80}
                  /> */}
                </div>
              )}
            </div>
        </Link>
        ))}
      </div>
    </>
  );
}
