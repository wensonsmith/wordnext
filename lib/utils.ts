import type { StrapiMedia } from "./strapi-types"

export const getStrapiMedia = (media: StrapiMedia): string => {
  const { url } = media

  if (!url.startsWith("/")) {
    return url
  }

  const imageHost = process.env.NEXT_PUBLIC_IMAGE_URL?.replace(/\/$/, "") ?? ""
  return `${imageHost}${url}`
}

export const getStrapiMediaAlt = (media: StrapiMedia): string =>
  media.alternativeText ?? media.name ?? ""
