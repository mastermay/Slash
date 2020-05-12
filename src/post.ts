import { getPostList, getPostDetail } from './api';
import config from './config'
import * as marked from 'marked'

export async function getPostListTpl(page: number) {
  let res: any = await getPostList({
    user: config.user,
    repo: config.repo,
    page,
    per_page: config.per_page
  })
  if (res.length === 0) {
    return '<div>sorry, but no more posts found</div>'
  }
  let content = '<div class="posts">'
  res.forEach((post: any) => {
    let labels = ''
    post.labels.forEach((label: any) => {
      labels += `<li class="tag">${label.name}</li>`
    })
    let postContent = `<div class="post">
    <h2><a class="title" href="#/post/${post.number}">${post.title}</a></h2>
    <ul class="tags">${labels}</ul>
    <span class="time">${new Date(post.created_at).toLocaleDateString()}</span>
</div>`
    content = content + postContent
  });
  content += '</div>'
  let pagination = '<div class="pagination">'
  if (page > 1) {
    pagination += `<span><a href="#/page/${page - 1}">prev</a></span> `
  }
  pagination += `<span><a href="#/page/${page + 1}">next</a></span></div>`
  return content + pagination
}

export async function getPostDetailTpl(postId: number) {
  let post: any = await getPostDetail({
    user: config.user,
    repo: config.repo,
    post_id: postId
  })
  let labels = ''
  post.labels.forEach((label: any) => {
    labels += `<li class="tag"><a v-link="{ name: 'label', params: { name: label.name } }">${label.name}</a></li>`
  })
  let postBody = marked(post.body)
  let content = `<article class="post">
  <h2><a class="title">${post.title}</a></h2>
  <ul class="tags" v-for="label in post.labels">
      ${labels}
  </ul>
  <span class="time">${new Date(post.created_at).toLocaleDateString()}</span>
  <div class="content">
      ${postBody}
  </div>
</article>`
  return content
}