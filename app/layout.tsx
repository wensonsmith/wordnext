import '../styles/globals.css'
import ThemeProvider from '../components/theme-provider'
import Header from '../components/header'
import Footer from '../components/footer'
import Analytics from '../components/analytics'
import { fetchNavigations } from "../lib/strapi"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const navigations = await fetchNavigations()
  return (
    <html lang="zh-CN">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <Analytics/>
      </head>
      <body>
        <ThemeProvider>
          <Header/>
          {children}
          <Footer navigations={navigations}/>
        </ThemeProvider>
      </body>
    </html>
  )
}
