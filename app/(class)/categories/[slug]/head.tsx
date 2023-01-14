import { NextSeo, NextSeoProps } from 'next-seo'
import { fetchCategories } from "../../../../lib/strapi"
import { NEXT_SEO_DEFAULT } from '../../../../seo.config'

export default async function Head({params}: any) {
  const categories = await fetchCategories()
  const category = categories.data.find((item: any) => item.attributes.slug === params?.slug)
  const updateMeta: NextSeoProps = {
    ...NEXT_SEO_DEFAULT,
    title: category.attributes.name,
    description: category.attributes.description,
    titleTemplate: '文章分类 / %s | Wenson',
  }
  return <NextSeo {...updateMeta} useAppDir={true} />
}
