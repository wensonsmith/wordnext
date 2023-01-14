import { NextSeo } from 'next-seo'
import { NEXT_SEO_DEFAULT } from '../seo.config'

export default function Head() {
  return (
    <NextSeo {...NEXT_SEO_DEFAULT} titleTemplate='%s' useAppDir={true}/>
  )
}
