import './index.css';
import { getPostListTpl } from './post';

async function loadPost(page: number, per_page: number) {
  document.getElementById('content').innerHTML = await getPostListTpl(page, per_page);
  document.getElementById('content').style.opacity = '1';
  document.getElementById('loading').style.display = 'none';
}

window.onload = async function () {
  loadPost(1, 5)
}
