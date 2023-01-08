import dayjs from "dayjs"
import Link from "next/link"
import Logo from "./logo"
import { RiTwitterFill,RiGithubFill,RiMailFill, RiWechatFill,RiRssFill } from 'react-icons/ri'

export default function Footer() {
  return (
    <div className="mt-10 border-t text-sm">
      <div className='flex justify-between py-20 container m-auto'>
        <div className="w-1/3">
          <Link href='/'>
            <Logo/>
          </Link>
          <div className=''>Copyright</div>
          <div className='flex gap-5 mt-4 text-lg'>
            <a href="https://twitter.com/wensonsmith" target="_blank" rel="noreferrer"><RiTwitterFill/></a>
            <a href="https://github.com/wensonsmith" target="_blank" rel="noreferrer"><RiGithubFill/></a>
            <a href="https://twitter.com/wensonsmith" target="_blank" rel="noreferrer"><RiWechatFill/></a>
            <a href="mailto:wensonsmith@gmail.com" target="_blank" rel="noreferrer"><RiMailFill/></a>
            <a href="rss" target="_blank" rel="noreferrer"><RiRssFill/></a>
          </div>
        </div>
        <div className='text-gray-500 leading-loose'>
          <div className="text-base text-gray-600 mb-1">分类</div>
          <div>工程师</div>
          <div>方法论</div>
          <div>书影音</div>
          <div>生活</div>
        </div>

        <div className='text-gray-500 leading-loose'>
          <div className="text-base text-gray-600 mb-1">项目</div>
          <div>工程师</div>
          <div>方法论</div>
          <div>书影音</div>
          <div>生活</div>
        </div>

        <div className='text-gray-500 leading-loose text'>
          <div className="text-base text-gray-600 mb-1">友情连接</div>
          <a href="" target="_blank" className="block">XXXX 的博客</a>
          <a href="" target="_blank" className="block">XXXX 的博客</a>
          <a href="" target="_blank" className="block">XXXX 的博客</a>
          <a href="" target="_blank" className="block">更多..</a>
        </div>

        <div className='text-gray-500 leading-loose'>
          <div className="text-base text-gray-600 mb-1">本站</div>
          <div>已运行  3934 天</div>
          <div>文章 23 篇</div>
          <div>访问量 23233 UV</div>
          <div>运行版本 V-1.2.3</div>
        </div>
      </div>

      <div className="container m-auto text-center py-4 text-xs text-gray-500">
        @{dayjs().format('YYYY')} Wenson  | Code the Ambition | V1.1.2 
      </div>
    </div>
  )
}