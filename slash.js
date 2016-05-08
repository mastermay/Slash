Vue.config.debug = true;
var CACHE = {};
var PostList = Vue.extend({
    template: '#postList',
    data: function() {
        return {
            posts: [],
            prev: 0,
            next: 0,
            home: true,
            label: ''
        }
    },
    route: {
        data: function() {
            document.getElementById("content").style.opacity = 0.6;
            var _self = this,
                params = this.$route.params,
                page = params['page'] || 1,
                label = '',
                home = true;
            if (params.hasOwnProperty('name')) {
                label = params['name'];
                home = false;
            }
            var cache = CACHE[label + 'Page' + page];
            if (cache) {
                _self.$data.posts = cache.posts;
                _self.$data.prev = cache.prev;
                _self.$data.next = cache.next;
                _self.$data.home = cache.home;
                _self.$data.label = cache.label;
                document.getElementById("content").style.opacity = 1;
                return;
            }

            this.$http({
                url: "https://api.github.com/repos/" + config['user'] + "/" + config['repo'] + "/issues",
                data: {
                    creator: config['user'],
                    page: page,
                    per_page: config['per_page'],
                    labels: label
                },
                method: 'GET'
            }).then(function(response) {
                var data = response.data,
                    link = response.headers('Link'),
                    prev = false,
                    next = false;
                if (link && link.indexOf('rel="prev"') > 0) {
                    prev = parseInt(page) - 1;
                }
                if (link && link.indexOf('rel="next"') > 0) {
                    next = parseInt(page) + 1;
                }
                _self.$data.posts = data;
                _self.$data.prev = prev;
                _self.$data.next = next;
                _self.$data.home = home;
                _self.$data.label = label;
                title = config['blogname'];
                if (page != 1) {
                    title = 'Page ' + page + config['sep'] + title;
                }
                if (label) {
                    title = label + config['sep'] + title;
                }
                document.title = title;
                document.getElementById("content").style.opacity = 1;
                document.getElementById("loading").style.display = 'none';

                CACHE[label + 'Page' + page] = {
                    posts: data,
                    prev: prev,
                    next: next,
                    home: home,
                    label: label
                };
                for (var i in data) {
                    if (!CACHE.hasOwnProperty('Post' + data[i].number)) {
                        CACHE['Post' + data[i].number] = {
                            post: data[i]
                        };
                    }
                }
            }, function(response) {});

        }
    }
});

var PostDetail = Vue.extend({
    template: '#postDetail',
    data: function() {
        return {
            post: []
        }
    },
    route: {
        data: function() {
            var id = this.$route.params['id'],
                cache = CACHE['Post' + id];
            if (cache) {
                var data = cache.post;
                data.body = marked(data.body);
                this.$data.post = data;
                document.getElementById("content").style.opacity = 1;
                toggleDuoshuoComments('#content', parseInt(id));
                return;
            }
            var _self = this;
            this.$http({
                url: "https://api.github.com/repos/" + config['user'] + "/" + config['repo'] + "/issues/" + id,
                method: 'GET'
            }).then(function(response) {
                var data = response.data;
                data.body = marked(data.body);
                _self.$data.post = data;
                document.title = data.title + config['sep'] + config['blogname'];
                document.getElementById("content").style.opacity = 1;
                document.getElementById("loading").style.display = 'none';
                toggleDuoshuoComments('#content', parseInt(id));
            }, function(response) {});
        }
    }
});

var App = Vue.extend({});
var router = new VueRouter();

router.map({
    '/': {
        component: PostList
    },
    '/page/:page': {
        name: 'page',
        component: PostList
    },
    '/post/:id': {
        name: 'post',
        component: PostDetail
    },
    '/label/:name': {
        name: 'label',
        component: PostList
    },
    '/label/:name/page/:page': {
        name: 'labelPaged',
        component: PostList
    }
});

window.onload = function() {
    router.start(App, '#content');
};

function toggleDuoshuoComments(container, id) {
    var el = document.createElement('div');
    var url = window.location.href;
    el.setAttribute('data-thread-key', id);
    el.setAttribute('data-url', url);
    DUOSHUO.EmbedThread(el);
    jQuery(container).append(el);
}
