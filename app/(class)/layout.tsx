import Classify from "../../components/classify"
import { fetchCategories, fetchTags } from "../../lib/strapi"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const categoriesData = fetchCategories({})
  const tagsData = fetchTags({})

  const response = await Promise.all([categoriesData, tagsData])
  const [categories, tags] = response.map((res) => res.data)

  return (
    <>
      <div className="from-pink-50 to-blue-50 bg-gradient-to-tr rounded-b-3xl py-20 -mt-24">
        <div className="container m-auto mt-16">
          <div className="text-3xl font-normal font-serif mb-12">
            沉淀文字以经得时间考验
          </div>
          <Classify categories={categories} tags={tags} />
        </div>
      </div>
      {children}
    </>
  )
}
