declare module "@pondorasti/remark-img-links" {
  import type { Plugin } from "unified"

  type RemarkImageLinksOptions = {
    absolutePath?: string
  }

  const remarkImageLinks: Plugin<[RemarkImageLinksOptions]>
  export default remarkImageLinks
}
