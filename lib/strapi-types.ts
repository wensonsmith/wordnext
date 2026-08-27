export type StrapiQuery = Record<string, unknown>

export type StrapiEntity = {
  id: number
  documentId: string
  createdAt: string
  updatedAt: string
  publishedAt: string | null
}

export type StrapiMedia = StrapiEntity & {
  name: string
  alternativeText: string | null
  caption: string | null
  width: number | null
  height: number | null
  formats?: Record<string, unknown> | null
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl?: string | null
  provider: string
}

export type Tag = StrapiEntity & {
  name: string
  slug: string
  description?: string | null
}

export type Category = StrapiEntity & {
  name: string
  slug: string
  description: string | null
  icon?: StrapiMedia | null
}

export type Article = StrapiEntity & {
  title: string
  slug: string
  content: string
  description: string | null
  cover?: StrapiMedia | null
  category?: Category | null
  tags?: Tag[]
}

export type Site = StrapiEntity & {
  name: string
  description: string
  copyright: string
  slogan: string
  version: string
  favicon?: StrapiMedia | null
  logo?: StrapiMedia | null
  cover?: StrapiMedia | null
}

export type Profile = StrapiEntity & {
  content: string
  from: string
}

export type Memo = StrapiEntity & {
  content: string
}

export type Project = StrapiEntity & {
  name: string
  link: string
  description: string | null
  icon?: StrapiMedia | null
}

export type Friend = StrapiEntity & {
  name: string
  link: string
  description: string | null
  avatar?: StrapiMedia | null
}

export type Pagination = {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export type StrapiCollectionResponse<T> = {
  data: T[]
  meta: { pagination: Pagination }
}

export type StrapiSingleResponse<T> = {
  data: T | null
  meta: Record<string, unknown>
}

export type NavigationItem = {
  id: number
  title: string
  path: string
  external?: boolean
  items?: NavigationItem[]
}

export type Navigation = NavigationItem & {
  items: NavigationItem[]
}

export type NavigationDefinition = {
  id: number
  documentId: string
  name: string
  slug: string
  visible: boolean
}
