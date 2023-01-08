export const getStrapiMedia = (media: any) => {
  const { url } = media.data.attributes
  return url.startsWith("/") ? `${process.env.NEXT_STRAPI_URL}${url}` : url
}
