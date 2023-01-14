import { NextSeo, NextSeoProps } from 'next-seo'
import { fetchTags } from '../../../../lib/strapi'
import { NEXT_SEO_DEFAULT } from '../../../../seo.config'

export default async function Head({params}: any) {
  const tags = await fetchTags({})
  const tagger = tags.data.find((item: any) => item.attributes.slug === params?.slug)

  const updateMeta: NextSeoProps = {
    ...NEXT_SEO_DEFAULT,
    title: tagger.attributes.name,
    description: tagger.attributes.description,
    titleTemplate: '文章标签 / %s | Wenson',
  }
  return <NextSeo {...updateMeta} useAppDir={true} />
}
