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
    <>
      <div className="container m-auto bg-gradient-to-br from-pink-100 to-sky-50 h-96 rounded-3xl relative overflow-hidden mt-5">
        <div className="absolute bottom-0 left-0 w-full p-5 flex flex-wrap">
          {friends.map((friend: any) => (
            <Friend friend={friend} key={friend.id} />
          ))}
        </div>
      </div>

      <div className='container m-auto flex gap-10 mt-10 px-20'>
      <div className='w-3/4'>
        <article className='prose prose-sm md:prose-base' dangerouslySetInnerHTML={{ __html: contentHtml }} />
        <div  className="mt-10">
          <Waline serverURL={WalineServer} path='/about'/>
        </div>
      </div>


      <div className='flex-1'>
          <div className='flex'>
            <div>
              <IoPlanet className='text-blue-400 text-lg'/>
            </div>
            <div className=''>
              <div className='text-lg'>该博客已运行 {dayjs(profile.attributes.from).diff(dayjs(),  'days')} 天</div>
              <div>Since {profile.attributes.from}</div>
            </div>
        </div>
      </div>
    </div>

    </>
  )
}
