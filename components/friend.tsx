import Image from "next/image"
import Poptip from "./poptip"
import { getStrapiMedia } from "../lib/utils"

export default function Friend({ friend }: any) {
  return (
    <>
      <Poptip
        anchorId={`friend-${friend.id}`}
        content={friend.attributes.description}
      />
      <a
        id={`friend-${friend.id}`}
        href={friend.attributes.link}
        target="_blank"
        className="flex rounded-full bg-white p-2 mr-5 mb-5 cursor-pointer hover:text-green-400"
        rel="noreferrer"
      >
        <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
          <Image
            src={getStrapiMedia(friend.attributes.avatar)}
            width={100}
            height={100}
            alt=""
          />
        </div>
        <div className="flex items-center mx-2">{friend.attributes.name}</div>
      </a>
    </>
  )
}
