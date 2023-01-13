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

  //dark:from-sky-300 dark:to-lime-100

  return (
    <>
      <div className="bg-gradient-to-br from-sky-100 to-lime-50 dark:from-sky-300 dark:to-lime-100 rounded-b-3xl pb-10 md:pb-20 pt-20 -mt-24">
        <div className="container m-auto mt-16 px-6 md:px-0">
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
