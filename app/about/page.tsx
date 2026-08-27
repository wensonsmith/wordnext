import dayjs from "dayjs"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { IoPlanet } from "react-icons/io5"

import Friend from "../../components/friend"
import Waline from "../../components/waline"
import Remark from "../../lib/markdown"
import { fetchFriends, fetchProfile } from "../../lib/strapi"

export const metadata: Metadata = {
  title: "关于我",
}

export default async function About() {
  const [friendsResponse, profileResponse] = await Promise.all([
    fetchFriends({
      populate: {
        avatar: { fields: ["url", "alternativeText", "name"] },
      },
    }),
    fetchProfile(),
  ])

  const profile = profileResponse.data
  if (!profile) notFound()

  const contentHtml = await Remark(profile.content, false)
  const walineServer = process.env.NEXT_PUBLIC_WALINE_URL

  return (
    <div className="px-6 md:px-0">
      <div className="container m-auto bg-gradient-to-br from-pink-100 to-sky-50 dark:from-pink-300 dark:to-sky-100 h-96 rounded-3xl relative overflow-hidden mt-5">
        <div className="absolute bottom-0 left-0 w-full p-5 flex flex-wrap">
          {friendsResponse.data.map((friend) => (
            <Friend friend={friend} key={friend.documentId} />
          ))}
        </div>
      </div>

      <div className="container m-auto md:flex gap-10 mt-10 pb-10">
        <div className="md:w-3/4">
          <article
            className="prose prose-sm md:prose-base dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
          {walineServer && (
            <div className="mt-10">
              <Waline serverURL={walineServer} path="about" />
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex gap-2 items-center bg-slate-50 dark:bg-slate-900 p-4 rounded">
            <div className="w-1/5 flex justify-center">
              <IoPlanet className="text-sky-300 text-lg w-2/3 h-2/3" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-slate-500">
                <div>博客已在这颗星球存在</div>
                <span className="text-xl font-bold text-slate-800 dark:text-slate-400">
                  {dayjs().diff(dayjs(profile.from), "days")}
                </span> 天
                <div className="text-xs text-slate-400">Since {profile.from}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
