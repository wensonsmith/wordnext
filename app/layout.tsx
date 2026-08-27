import type { Metadata, Viewport } from "next"

import Analytics from "../components/analytics"
import Footer from "../components/footer"
import Header from "../components/header"
import ScrollUp from "../components/scroll-up"
import ThemeProvider from "../components/theme-provider"
import { fetchNavigations, fetchSite } from "../lib/strapi"
import { SITE_METADATA } from "../seo.config"
import "../styles/globals.css"

export const metadata: Metadata = SITE_METADATA

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [navigations, siteResponse] = await Promise.all([
    fetchNavigations(),
    fetchSite({
      populate: {
        cover: { fields: ["url", "alternativeText"] },
      },
    }),
  ])

  if (!siteResponse.data) {
    throw new Error("Strapi did not return site settings")
  }

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Header />
          {children}
          <Footer navigations={navigations} site={siteResponse.data} />
          <ScrollUp />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
