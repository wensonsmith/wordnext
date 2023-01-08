import Link from 'next/link'
import Logo from './logo'
import ThemeToggler from './theme-toggler'

export default function Header() {
  return (
    <>
      <div className='flex pt-10 items-center container m-auto'>
        <div className='w-1/5'>
          <Link href='/'>
            <Logo/>
          </Link>
        </div>
        <div className='flex-1 flex gap-6 justify-end items-center'>
          <Link href='/articles'>
            <div className='cursor-pointer hover:bg-white py-1 px-4 rounded transition'>文章</div>
          </Link>
          <Link href='/about'>
            <div className='cursor-pointer hover:bg-white py-1 px-4 rounded transition'>关于</div>
          </Link>
          <ThemeToggler/>
        </div>
      </div>
    </>
  )
}