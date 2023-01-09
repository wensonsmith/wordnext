const qs = require('qs')

const request = (path: string, params: Object = {}) => {
  const host = process.env.NEXT_STRAPI_URL
  const token = process.env.NEXT_STRAPI_TOKEN

  const query = qs.stringify(
    params,
    { encodeValuesOnly: true } // prettify URL
  )

  const api = `${host}/api${path}?${query}`

  console.log(api)

  return fetch(api, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })
}

export const fetchSite = async (params = {}) => {
  const response = await request('/site', params)
  return response.json()
}

export const fetchArticles = async (params: any) => {
  const response =  await request('/articles', params)
  return response.json()
}

export const fetchCategories = async (params= {}) => {
  const response = await request('/categories', params)
  return response.json()
}

export const fetchArticle = async (id: number) => {
  const response = await request(`/articles/${id}`)
  return response.json()
}

export const fetchProfile = async () => {
  const response = await request('/profile')
  return response.json()
}

export const fetchMemos = async (params = {}) => {
  const response = await request('/memos', params)
  return response.json()
}

export const fetchTags = async (params = {}) => {
  const response = await request('/tags', params)
  return response.json()
}

export const fetchProjects = async (params = {}) => {
  const response = await request('/projects', params)
  return response.json()
}

export const fetchFriends = async (params = {}) => {
  const response = await request('/friends', params)
  return response.json()
}

export const fetchNavigations =async (id = 1) => {
  const response = await request(`/navigation/render/${id}`, {type: 'TREE', menu: true})
  return response.json()
}