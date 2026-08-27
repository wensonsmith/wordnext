import dayjs from "dayjs"
import Link from "next/link"
import { RiGithubFill, RiMailFill, RiRssFill, RiTwitterFill, RiWechatFill } from "react-icons/ri"

import type { Navigation, Site } from "../lib/strapi-types"
import Logo from "./logo"

export default function Footer({ navigations, site }: { navigations: Navigation[]; site: Site }) {
  return (
    <div className="border-t text-sm dark:border-slate-600 dark:text-gray-500">
      <div className="md:flex justify-between py-10 container m-auto px-6 md:px-0">
        <div className="flex justify-between md:block w-full md:w-1/3">
          <Link href="/">
            <Logo />
          </Link>
          <div>
            <div>{site.copyright}</div>
            <div className="flex gap-5 mt-4 text-lg">
              <a href="https://twitter.com/wensonsmith" target="_blank" rel="noreferrer"><RiTwitterFill /></a>
              <a href="https://github.com/wensonsmith" target="_blank" rel="noreferrer"><RiGithubFill /></a>
              <a href="https://twitter.com/wensonsmith" target="_blank" rel="noreferrer"><RiWechatFill /></a>
              <a href="mailto:wensonsmith@gmail.com" target="_blank" rel="noreferrer"><RiMailFill /></a>
              <a href="/rss" target="_blank" rel="noreferrer"><RiRssFill /></a>
            </div>
          </div>
        </div>
        <div className="flex-1 text-center md:text-right mt-10 md:mt-0 grid grid-cols-3 gap-6">
          {navigations.map((nav) => (
            <div className="text-gray-500 leading-loose" key={nav.id}>
              <div className="text-base text-gray-600 mb-1">{nav.title.slice(1)}</div>
              {nav.items.map((item) => (
                <div key={item.id}>
                  <Link href={item.path} target={item.external ? "_blank" : undefined}>
                    {item.title.slice(1)}
                  </Link>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="container m-auto text-center py-4 text-xs text-gray-500">
        @{dayjs().format("YYYY")} Wenson | Code the Ambition | {site.version}
      </div>
    </div>
  )
}
