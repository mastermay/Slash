# Slash
A Github issues based blog

## 简介
利用 issue 写博客，可用此工具提供更好的显示效果。[查看演示](http://mastermay.github.io/Slash/)

## 使用方法
下载源代码，新建 repo ，编辑配置文件 `config.js`，push 到该 repo 的 gh-pages 分支
```
config = {
    blogname: 'Slash',  // 博客首页标题
    sep: ' | ',         // 博客标题间隔符
    user: 'mastermay',  // GitHub 用户名
    repo: 'Slash',      // GitHub repo 名
    per_page: 1         // 每页显示文章数目
}
```
在新建的 repo 里提交 issue，可使用 label 作为文章的分类。

[vue.js](https://github.com/vuejs/vue)
[vue-router](https://github.com/vuejs/vue-router)
[vue-resource](https://github.com/vuejs/vue-resource)
[marked.js](https://github.com/chjj/marked)
