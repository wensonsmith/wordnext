import Image from "next/image"

import type { Friend as FriendType } from "../lib/strapi-types"
import { getStrapiMedia, getStrapiMediaAlt } from "../lib/utils"
import Poptip from "./poptip"

export default function Friend({ friend }: { friend: FriendType }) {
  return (
    <>
      <Poptip anchorId={`friend-${friend.id}`} content={friend.description ?? ""} />
      <a
        id={`friend-${friend.id}`}
        href={friend.link}
        target="_blank"
        className="flex rounded-full bg-white p-2 mr-5 mb-5 cursor-pointer hover:text-green-400"
        rel="noreferrer"
      >
        <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
          {friend.avatar && (
            <Image
              alt={getStrapiMediaAlt(friend.avatar)}
              src={getStrapiMedia(friend.avatar)}
              width={100}
              height={100}
            />
          )}
        </div>
        <div className="flex items-center mx-2 dark:text-gray-800">{friend.name}</div>
      </a>
    </>
  )
}
