import type { Category as CategoryType, Tag as TagType } from "../../lib/strapi-types"
import Category from "./category"
import Tag from "./tag"

export default function Classify({ categories, tags }: { categories: CategoryType[]; tags: TagType[] }) {
  return (
    <>
      <div className="flex gap-5">
        {categories.map((category) => (
          <Category category={category} key={category.documentId} />
        ))}
      </div>
      <div className="flex mt-10 flex-wrap">
        {tags.map((tag) => (
          <Tag tag={tag} key={tag.documentId} />
        ))}
      </div>
    </>
  )
}
