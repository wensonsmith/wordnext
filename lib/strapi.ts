import "server-only"

import { unstable_rethrow } from "next/navigation"
import qs from "qs"

import type {
  Article,
  Category,
  Friend,
  Memo,
  Navigation,
  NavigationDefinition,
  Profile,
  Project,
  Site,
  StrapiCollectionResponse,
  StrapiQuery,
  StrapiSingleResponse,
  Tag,
} from "./strapi-types"

const request = async <T>(path: string, params: StrapiQuery = {}): Promise<T> => {
  const host = process.env.NEXT_STRAPI_URL?.replace(/\/$/, "")
  const token = process.env.NEXT_STRAPI_TOKEN

  if (!host) {
    throw new Error("NEXT_STRAPI_URL is not configured")
  }

  const query = qs.stringify(params, { encodeValuesOnly: true })
  const api = `${host}/api${path}${query ? `?${query}` : ""}`
  const timeout = Number(process.env.NEXT_TIMEOUT ?? 10_000)
  const headers: HeadersInit = token
    ? { authorization: `Bearer ${token}` }
    : {}

  const response = await fetch(api, {
    headers,
    cache: "no-store",
    signal: AbortSignal.timeout(timeout),
  })

  if (!response.ok) {
    throw new Error(`Strapi request failed (${response.status}) for ${path}`)
  }

  return response.json() as Promise<T>
}

export const fetchSite = (params: StrapiQuery = {}) =>
  request<StrapiSingleResponse<Site>>("/site", params)

export const fetchArticles = (params: StrapiQuery = {}) =>
  request<StrapiCollectionResponse<Article>>("/articles", params)

export const fetchCategories = (params: StrapiQuery = {}) =>
  request<StrapiCollectionResponse<Category>>("/categories", params)

export const fetchArticle = (documentId: string, params: StrapiQuery = {}) =>
  request<StrapiSingleResponse<Article>>(`/articles/${documentId}`, params)

export const fetchProfile = (params: StrapiQuery = {}) =>
  request<StrapiSingleResponse<Profile>>("/profile", params)

export const fetchMemos = (params: StrapiQuery = {}) =>
  request<StrapiCollectionResponse<Memo>>("/memos", params)

export const fetchTags = (params: StrapiQuery = {}) =>
  request<StrapiCollectionResponse<Tag>>("/tags", params)

export const fetchProjects = (params: StrapiQuery = {}) =>
  request<StrapiCollectionResponse<Project>>("/projects", params)

export const fetchFriends = (params: StrapiQuery = {}) =>
  request<StrapiCollectionResponse<Friend>>("/friends", params)

const fallbackNavigations: Navigation[] = [
  {
    id: -1,
    title: "#站点",
    path: "/",
    items: [
      { id: -2, title: "#文章", path: "/articles" },
      { id: -3, title: "#关于", path: "/about" },
    ],
  },
]

export const fetchNavigations = async (): Promise<Navigation[]> => {
  try {
    let idOrSlug = process.env.NEXT_STRAPI_NAVIGATION

    if (!idOrSlug) {
      const definitions = await request<NavigationDefinition[]>("/navigation")
      const navigation = definitions.find(({ visible }) => visible) ?? definitions[0]
      idOrSlug = navigation?.documentId ?? navigation?.slug
    }

    if (!idOrSlug) {
      return fallbackNavigations
    }

    return await request<Navigation[]>(
      `/navigation/render/${encodeURIComponent(idOrSlug)}`,
      { type: "TREE", menu: true },
    )
  } catch (error) {
    unstable_rethrow(error)
    console.error(
      "Strapi navigation is unavailable; using fallback links.",
      error instanceof Error ? error.message : "Unknown error",
    )
    return fallbackNavigations
  }
}
