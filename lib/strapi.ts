import "server-only"

import qs from "qs"

import type {
  Article,
  Category,
  Friend,
  Memo,
  Navigation,
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

export const fetchNavigations = (id = 1) =>
  request<Navigation[]>(`/navigation/render/${id}`, { type: "TREE", menu: true })
