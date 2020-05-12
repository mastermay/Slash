import { getPostList } from './api';

export async function getPostListTpl(page: number, per_page: number) {
  let res: any = await getPostList({
    user: 'mastermay',
    repo: 'Slash',
    page,
    per_page
  })
  let content = '<div class="posts">'
  res.forEach((post: any) => {
    let labels = ''
    post.labels.forEach((label: any) => {
      labels += `<li class="tag"><a v-link="{ name: 'label', params: { name: label.name } }">${label.name}</a></li>`
    })
    let postContent = `<div class="post">
    <h2><a class="title" v-link="{ name: 'post', params: { id: post.number } }">${post.title}</a></h2>
    <ul class="tags">${labels}</ul>
    <span class="time">${new Date(post.created_at).toLocaleDateString()}</span>
</div>`
    content = content + postContent
  });
  content += '</div>'
  return content
}