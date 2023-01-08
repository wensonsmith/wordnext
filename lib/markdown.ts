import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeHighlight from 'rehype-highlight'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import rehypeToc from '@jsdevtools/rehype-toc'
import rehypeAutoLinks from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import 'highlight.js/styles/a11y-dark.css'

const remarkImgLinks = require('@pondorasti/remark-img-links')
export default async function Remark(content: string, toc: boolean = true) {
  
  const tocPlugin = toc ? rehypeToc : {}

  const processedContent = await unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkImgLinks, { absolutePath: process.env.NEXT_PUBLIC_IMAGE_URL  })
  .use(remarkRehype)
  .use(rehypeSlug)
  .use(tocPlugin)
  .use(rehypeHighlight)
  .use(rehypeAutoLinks)
  .use(rehypeFormat)
  .use(rehypeStringify)
  .process(content)

  return processedContent.toString()
}