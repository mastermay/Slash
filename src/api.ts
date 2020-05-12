import http from './http'

const api_host = "https://api.github.com"

export interface UserConfig {
  user: string,
  repo: string
}

export interface QueryPostList extends UserConfig {
  creator?: string,
  page: number,
  per_page: number,
  labels?: string
}

export async function getPostList(param: QueryPostList) {
  return await http({
    url: api_host + `/repos/${param.user}/${param.repo}/issues`,
    params: {
      page: 1,
      per_page: 1
    },
    method: 'get'
  });
}