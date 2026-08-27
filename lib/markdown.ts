import rehypeToc from "@jsdevtools/rehype-toc"
import remarkImgLinks from "@pondorasti/remark-img-links"
import rehypeAutoLinks from "rehype-autolink-headings"
import rehypeFormat from "rehype-format"
import rehypeHighlight from "rehype-highlight"
import rehypeSlug from "rehype-slug"
import rehypeStringify from "rehype-stringify"
import remarkGfm from "remark-gfm"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { unified } from "unified"

import "highlight.js/styles/atom-one-dark.css"

export default async function Remark(content: string, toc = true) {
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkImgLinks, { absolutePath: process.env.NEXT_PUBLIC_IMAGE_URL })
    .use(remarkRehype)
    .use(rehypeSlug)

  if (toc) processor.use(rehypeToc)

  const processedContent = await processor
    .use(rehypeHighlight)
    .use(rehypeAutoLinks)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(content)

  return processedContent.toString()
}
