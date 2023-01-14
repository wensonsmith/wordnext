import { NextSeo, NextSeoProps } from 'next-seo'
import { NEXT_SEO_DEFAULT } from '../../seo.config'

export default async function Head({params}: any) {
  const updateMeta: NextSeoProps = {
    ...NEXT_SEO_DEFAULT,
    title: '关于我',
    titleTemplate: '%s | Wenson',
  }
  return <NextSeo {...updateMeta} useAppDir={true} />
}
