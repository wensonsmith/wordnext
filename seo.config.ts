// next-seo.config.ts
import type { NextSeoProps } from "next-seo"

export const NEXT_SEO_DEFAULT: NextSeoProps = {
  title: "I'm Wenson",
  description: "这里是 Wenson 的博客，记录学习到的方法和知识，创造有趣的项目以及生活感悟",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://iwenson.com",
    title: "I'm Wenson",
    description: "这里是 Wenson 的博客，记录学习到的方法和知识，创造有趣的项目以及生活感悟",
    images: [
      {
        url: "https://iwenson.com/",
        width: 800,
        height: 800,
        alt: "Wenson's Blog",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    handle: "@wensonsmith",
    site: "@wensonsmith",
    cardType: "summary_large_image",
  },
}
