import Image from "next/image"
import { notFound } from "next/navigation"

import Articles from "../components/articles"
import Memos from "../components/memos"
import Projects from "../components/projects"
import { fetchArticles, fetchMemos, fetchProjects, fetchSite } from "../lib/strapi"
import { getStrapiMedia, getStrapiMediaAlt } from "../lib/utils"

export default async function Home() {
  const [siteResponse, articlesResponse, memosResponse, projectsResponse] = await Promise.all([
    fetchSite({
      populate: {
        cover: { fields: ["url", "alternativeText", "name"] },
      },
    }),
    fetchArticles({
      sort: ["createdAt:desc"],
      pagination: { page: 1, pageSize: 9 },
      populate: {
        tags: "*",
        cover: { fields: ["url", "alternativeText", "name"] },
      },
    }),
    fetchMemos({ pagination: { page: 1, pageSize: 12 } }),
    fetchProjects({
      populate: {
        icon: { fields: ["url", "alternativeText", "name"] },
      },
    }),
  ])

  const site = siteResponse.data
  if (!site) notFound()

  return (
    <>
      <div className="absolute left-0 top-0 w-full -z-10">
        <div className="flex h-screen">
          <div className="w-1/4" />
          <div className="flex-1 max-h-96 md:max-h-[75%] bg-gradient-to-br from-cyan-100 to-violet-100 dark:from-cyan-300 dark:to-violet-200 rounded-bl-3xl" />
        </div>
      </div>

      <div className="container m-auto pb-10 px-6 md:px-0">
        <div className="flex">
          <div className="w-1/2 md:w-2/3 mt-10 md:mt-48">
            <h1 className="text-6xl md:text-8xl">{site.slogan}</h1>
            <div className="text-xl hidden md:block leading-loose">{site.description}</div>
          </div>
          <div className="flex-1">
            {site.cover && (
              <Image
                alt={getStrapiMediaAlt(site.cover)}
                width={410}
                height={410}
                src={getStrapiMedia(site.cover)}
                priority
              />
            )}
          </div>
        </div>

        <div className="mt-4 text-sm md:hidden leading-loose">{site.description}</div>
        <Projects projects={projectsResponse.data} />
        <Articles posts={articlesResponse.data} />
        <Memos memos={memosResponse.data} />
      </div>
    </>
  )
}
