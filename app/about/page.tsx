import dayjs from "dayjs"
import { IoPlanet } from "react-icons/io5"
import Friend from "../../components/friend"
import Waline from "../../components/waline"
import Remark from "../../lib/markdown"
import { fetchFriends, fetchProfile } from "../../lib/strapi"

const WalineServer = process.env.NEXT_PUBLIC_WALINE_URL as string
export default async function About() {
  const friendsData = fetchFriends({
    populate: {
      avatar: "*",
    },
  })
  const profileData = fetchProfile()

  const response = await Promise.all([friendsData, profileData])
  const [friends, profile] = response.map((res) => res.data)
  const contentHtml = await Remark(profile.attributes.content, false)

  return (
    <div className="px-6 md:px-0">
      <div className="container m-auto bg-gradient-to-br from-pink-100 to-sky-50 dark:from-pink-300 dark:to-sky-100  h-96 rounded-3xl relative overflow-hidden mt-5">
        <div className="absolute bottom-0 left-0 w-full p-5 flex flex-wrap">
          {friends.map((friend: any) => (
            <Friend friend={friend} key={friend.id} />
          ))}
        </div>
      </div>

      <div className="container m-auto md:flex gap-10 mt-10 pb-10 ">
        <div className="md:w-3/4">
          <article
            className="prose prose-sm md:prose-base dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
          <div className="mt-10">
            <Waline serverURL={WalineServer} path="about" />
          </div>
        </div>

        <div className="flex-1">
          <div className="flex gap-2 items-center bg-slate-50 dark:bg-slate-900 p-4 rounded">
            <div className="w-1/5 flex justify-center">
              <IoPlanet className="text-sky-300 text-lg w-2/3 h-2/3" />
            </div>
            <div className="flex-1">
              <div className="text-xs text-slate-500">
                <div className="">博客已在这颗星球存在</div>
                <span className="text-xl font-bold text-slate-800 dark:text-slate-400">{dayjs().diff(dayjs(profile.attributes.from), "days")}</span> 天
                <div className="text-xs text-slate-400">Since {profile.attributes.from}</div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
