import ImgLinks from '@pondorasti/remark-img-links'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/a11y-dark.css'
import { bundleMDX } from 'mdx-bundler'

export const mdxRender = async (content:string) => {
  const { code } = await bundleMDX({
    source: content,
    mdxOptions: options => {
      options.remarkPlugins = [...(options.remarkPlugins ?? []), [ImgLinks, { absolutePath: "http://localhost:1337/" }]]
      options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypeHighlight]
      return options
    },
  })
  return code
}