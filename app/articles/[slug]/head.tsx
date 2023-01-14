import { NextSeo, NextSeoProps } from 'next-seo'
import { fetchArticles } from "../../../lib/strapi"
import { NEXT_SEO_DEFAULT } from '../../../seo.config'

export default async function Head({params}: any) {
  const articles = await fetchArticles({
    filters: {
      slug: params?.slug,
    },
    populate: {
      cover: '*',
      tags: '*',
      category: '*',
    }
  })

  const article = articles.data.pop()
  const updateMeta: NextSeoProps = {
    ...NEXT_SEO_DEFAULT,
    title: article.attributes.title,
    description: article.attributes.description,
    titleTemplate: '%s | Wenson',
  }
  return <NextSeo {...updateMeta} useAppDir={true} />
}
