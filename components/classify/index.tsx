import Category from "./category"
import Tag from "./tag"

export default function Classify({ categories, tags }: any) {
  return (
    <>
      <div className="flex gap-5 ">
        {categories.map((category: any) => (
          <Category category={category} key={category.id} />
        ))}
      </div>
      <div className="flex mt-10 flex-wrap">
        {tags.map((tag: any) => (
          <Tag tag={tag} key={tag.id} />
        ))}
      </div>
    </>
  )
}
