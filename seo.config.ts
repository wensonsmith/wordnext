import type { Metadata } from "next"

export const SITE_METADATA: Metadata = {
  metadataBase: new URL("https://iwenson.com"),
  title: {
    default: "Wenson - Keep looking, don't settle",
    template: "%s | Wenson",
  },
  description: "这里是 Wenson 的博客，记录学到的方法和知识，创造有趣的项目，书写生活感悟。",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://iwenson.com",
    siteName: "Wenson",
    title: "I'm Wenson",
    description: "记录学到的方法和知识，创造有趣的项目，书写生活感悟。",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@wensonsmith",
    site: "@wensonsmith",
  },
}
