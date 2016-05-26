# Slash
A Github issues based blog

## 简介
利用 issue 写博客，可用此工具提供更好的显示效果。[查看演示](http://mastermay.github.io/Slash/)

## 使用方法
下载源代码，编辑配置文件 `config.js` 中的相关参数，新建 repo ，将所有文件 push 到该 repo 的 gh-pages 分支。在新建的 repo 里提交 issue 作为博客文章，同时可使用 label 能给文章添加分类。[自定义域名](https://help.github.com/articles/using-a-custom-domain-with-github-pages/)可增加 CNAME 文件。

> 请严格按照 MarkDown 的格式书写博客，否则显示效果会受影响

```
config = {
    blogname: 'Slash',  // 博客首页标题
    sep: ' | ',         // 博客标题间隔符
    user: 'mastermay',  // GitHub 用户名
    repo: 'Slash',      // GitHub repo 名
    per_page: 1,        // 每页显示文章数目，建议不要设置的太大
	duoshuo_id: 'slash' // 多说二级域名
}
```

## 注意事项

直接 fork 是没有 issues 的，请

1. clone 编辑后上传；
2. 或者 fork 后修改 repo 名字。


many thanks to [jQuery](http://jquery.com), [vue.js](https://github.com/vuejs/vue), [vue-router](https://github.com/vuejs/vue-router), [vue-resource](https://github.com/vuejs/vue-resource), [marked.js](https://github.com/chjj/marked), [多说](http://duoshuo.com).
