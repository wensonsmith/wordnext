export type PageSearchParams = Promise<{ page?: string | string[] }>

export const getPageNumber = (value: string | string[] | undefined): number => {
  const rawValue = Array.isArray(value) ? value[0] : value
  const page = Number(rawValue)
  return Number.isInteger(page) && page > 0 ? page : 1
}
