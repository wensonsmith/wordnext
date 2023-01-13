import Link from 'next/link'
import Logo from './logo'
import ThemeToggler from './theme-toggler'

export default function Header() {
  return (
    <>
      <div className='flex pt-5 md:pt-10 items-center container m-auto px-4 md:px-0'>
        <div className='w-1/5'>
          <Link href='/'>
            <Logo/>
          </Link>
        </div>
        <div className='flex-1 flex gap-2 md:gap-6 justify-end items-center'>
          <Link href='/articles'>
            <div className='cursor-pointer hover:bg-white py-1 px-2 md:px-4 rounded transition'>文章</div>
          </Link>
          <Link href='/about'>
            <div className='cursor-pointer hover:bg-white py-1 px-2 md:px-4 rounded transition'>关于</div>
          </Link>
          <ThemeToggler/>
        </div>
      </div>
    </>
  )
}