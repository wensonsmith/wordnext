import {
  fetchArticles,
  fetchCategories,
  fetchFriends,
  fetchMemos,
  fetchProfile,
  fetchProjects,
  fetchSite,
  fetchTags,
} from "../../../lib/strapi"

export const dynamic = "force-dynamic"

export async function GET() {
  const checks = {
    site: () => fetchSite(),
    articles: () => fetchArticles({
      sort: ["createdAt:desc"],
      pagination: { page: 1, pageSize: 9 },
      populate: { tags: "*", cover: { fields: ["url", "alternativeText", "name"] } },
    }),
    categories: () => fetchCategories(),
    tags: () => fetchTags(),
    memos: () => fetchMemos(),
    projects: () => fetchProjects(),
    friends: () => fetchFriends({ populate: { avatar: "*" } }),
    profile: () => fetchProfile(),
  }

  const entries = await Promise.all(
    Object.entries(checks).map(async ([name, check]) => {
      try {
        await check()
        return [name, { ok: true }]
      } catch (error) {
        return [name, {
          ok: false,
          error: error instanceof Error ? error.message : "Unknown error",
        }]
      }
    }),
  )

  return Response.json(Object.fromEntries(entries), {
    headers: { "cache-control": "no-store" },
  })
}
