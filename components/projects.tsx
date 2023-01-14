import Image from "next/image"
import Link from "next/link"
import { getStrapiMedia, getStrapiMediaAlt } from "../lib/utils"

export default function Projects({ projects }: any) {
  return (
    <>
      <div className="text-xs text-gray-500 mt-10 mb-2">项目</div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {projects.map((project: any) => (
          <Link
            href={project.attributes.link}
            target="_blank"
            key={project.id}
            className="bg-white dark:bg-gray-800 rounded-md shadow-md p-4 flex items-center cursor-pointer hover:shadow-2xl transition"
          >
            <div className="flex-1 mr-2">
              <Image
                alt={getStrapiMediaAlt(project.attributes.icon)}
                src={getStrapiMedia(project.attributes.icon)}
                width="50"
                height="50"
                className="rounded-lg"
              />
            </div>
            <div className="w-4/5">
              <div className="truncate overflow-hidden">{project.attributes.name}</div>
              <div className="hidden md:block text-sm text-gray-500 dark:text-gray-400 mt-1 break-all">
                {project.attributes.description}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
