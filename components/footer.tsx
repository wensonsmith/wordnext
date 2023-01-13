import dayjs from "dayjs"
import Link from "next/link"
import Logo from "./logo"
import { RiTwitterFill,RiGithubFill,RiMailFill, RiWechatFill,RiRssFill } from 'react-icons/ri'

export default function Footer({navigations}: any) {
  return (
    <div className="border-t text-sm dark:border-slate-600 dark:text-gray-500">
      <div className='md:flex justify-between py-10 md:py-20 container m-auto px-6 md:px-0'>
        <div className="flex justify-between md:block w-full md:w-1/3">
          <Link href='/' className="">
            <Logo/>
          </Link>
          <div>
            <div className=''>Copyright</div>
            <div className='flex gap-5 mt-4 text-lg'>
              <a href="https://twitter.com/wensonsmith" target="_blank" rel="noreferrer"><RiTwitterFill/></a>
              <a href="https://github.com/wensonsmith" target="_blank" rel="noreferrer"><RiGithubFill/></a>
              <a href="https://twitter.com/wensonsmith" target="_blank" rel="noreferrer"><RiWechatFill/></a>
              <a href="mailto:wensonsmith@gmail.com" target="_blank" rel="noreferrer"><RiMailFill/></a>
              <a href="rss" target="_blank" rel="noreferrer"><RiRssFill/></a>
            </div>
          </div>
        </div>
        <div className="flex-1 text-center md:text-right mt-10 md:mt-0 grid grid-cols-3 gap-6">
        {navigations.map((nav: any) => (
          <div className='text-gray-500 leading-loose' key={nav.id}>
            <div className="text-base text-gray-600 mb-1">{nav.title.slice(1)}</div>
            {nav.items.map((item: any) => (
              <Link href={item.path} target='_blank' key={item.id}>
                <div>{item.title.slice(1)}</div>
              </Link>
            ))}
          </div>
        ))}
        </div>
      </div>

      <div className="container m-auto text-center py-4 text-xs text-gray-500">
        @{dayjs().format('YYYY')} Wenson  | Code the Ambition | V1.1.2 
      </div>
    </div>
  )
}