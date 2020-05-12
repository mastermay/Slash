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
export interface QueryPostDetail extends UserConfig {
  post_id: number
}

export async function getPostList(param: QueryPostList) {
  return await http({
    url: api_host + `/repos/${param.user}/${param.repo}/issues`,
    params: {
      page: param.page,
      per_page: param.per_page
    },
    method: 'get'
  });
}

export async function getPostDetail(param: QueryPostDetail) {
  return await http({
    url: api_host + `/repos/${param.user}/${param.repo}/issues/${param.post_id}`,
    method: 'get'
  });
}