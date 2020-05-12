import './index.css';
import { getPostListTpl, getPostDetailTpl } from './post';

async function loadPostList(page: number) {
  document.getElementById('content').innerHTML = await getPostListTpl(page);
  document.getElementById('content').style.opacity = '1';
  document.getElementById('loading').style.display = 'none';
}
async function loadPostDetail(psotId: number) {
  document.getElementById('content').innerHTML = await getPostDetailTpl(psotId);
  document.getElementById('content').style.opacity = '1';
  document.getElementById('loading').style.display = 'none';
}

window.onload = async function () {
  let hash = window.location.hash;
  route(hash)
}

window.addEventListener('hashchange', (event) => {
  let split = event.newURL.split('/#/')
  let hash = split.length === 1 ? '' : '#/' + split[1]
  route(hash)
})

async function route(hash: string) {
  if (!hash.startsWith('#/')) {
    loadPostList(1)
  }
  if (/#\/page\/(\d+)/.test(hash)) {
    loadPostList(parseInt(RegExp.$1))
  }
  if (/#\/post\/(\d+)/.test(hash)) {
    loadPostDetail(parseInt(RegExp.$1))
  }
}