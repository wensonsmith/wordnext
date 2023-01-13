import Image from 'next/image'
import Link from 'next/link'
import Projects from '../components/projects'
import Articles from '../components/articles'
import Memos from '../components/memos'
import { fetchSite, fetchArticles, fetchMemos, fetchProjects } from '../lib/strapi'
import { getStrapiMedia } from '../lib/utils'

export default async function Home() {
  const siteData = fetchSite({
    populate: {
      cover: {
        fields: ["url"],
      },
    },
  })

  const articlesData = fetchArticles({
    sort: ["createdAt:desc"],
    pagination: {
      page: 1,
      pageSize: 9,
    },
    populate: {
      tags: "*",
      cover: {
        fields: ["url"],
      },
    },
  })

  const memosData = fetchMemos({
    pagination: {
      page: 1,
      pageSize: 12,
    },
  })

  const projectsData = fetchProjects({
    populate: {
      icon: {
        fields: ["url"],
      },
    },
  })

  const response = await Promise.all([siteData, articlesData, memosData, projectsData])

  const [site, posts, memories, products] = response.map((res) => res.data)

  return (
    <>
      <div className="absolute left-0 top-0 w-full -z-10">
        <div className="flex h-screen">
          <div className="w-1/4"></div>
          <div className="flex-1 max-h-80 md:max-h-[75%] bg-gradient-to-br from-cyan-100 to-violet-100 dark:from-cyan-300 dark:to-violet-200 rounded-bl-3xl"></div>
        </div>
      </div>

      <div className="container m-auto pb-10 px-6 md:px-0">
        <div className="flex">
          <div className="w-1/2 md:w-2/3 mt-10 md:mt-48">
            <h1 className="text-6xl md:text-8xl">{site.attributes.slogan}</h1>
            <div className="text-xl hidden md:block leading-loose">{site.attributes.description}</div>
          </div>
          <div className="flex-1">
            <Image
              alt=""
              width="410"
              height="410"
              src={getStrapiMedia(site.attributes.cover)}
            />
          </div>
        </div>

        <div className="mt-4 text-sm md:hidden leading-loose">{site.attributes.description}</div>
        

        <Projects projects={products}/>

        <Articles posts={posts}/>

        <Memos memos={memories}/>
      </div>
    </>
  )
}
