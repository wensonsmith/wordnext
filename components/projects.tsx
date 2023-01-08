import Image from "next/image"
import Link from "next/link"
import { getStrapiMedia } from "../lib/utils"

export default function Projects({ projects }: any) {
  return (
    <>
      <div className="text-xs text-gray-500 mt-10 mb-2">项目</div>
      <div className="flex gap-4">
        {projects.map((project: any) => (
          <Link
            href={project.attributes.link}
            target="_blank"
            key={project.id}
            className="bg-white flex-1 rounded-md shadow-md p-5 flex items-center cursor-pointer hover:shadow-2xl transition"
          >
            <div className="mr-3">
              <Image
                alt=""
                src={getStrapiMedia(project.attributes.icon)}
                width="50"
                height="50"
                className="rounded-lg"
              />
            </div>
            <div className="flex-1">
              <div>{project.attributes.name}</div>
              <div className=" text-sm text-gray-500 mt-1">
                {project.attributes.description}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
