export const getStrapiMedia = (media: any) => {
  const { url } = media.data.attributes
  return url.startsWith("/") ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${url}` : url
}

export const getStrapiMediaAlt  = (media: any): string => {
  const { alternativeText } = media.data.attributes
  return alternativeText
}