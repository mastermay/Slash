Vue.config.debug = true;

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
            var _self = this,
                params = this.$route.params,
                page = params['page'] || 1,
                label = '',
                home = true;
            if (params.hasOwnProperty('name')) {
                label = params['name'];
                home = false;
            }
            $.ajax({
                url: "https://api.github.com/repos/" + config['user'] + "/" + config['repo'] + "/issues",
                data: {
                    filter: 'created',
                    page: page,
                    per_page: config['per_page'],
                    labels: label
                },
                success: function(data, textStatus, jqXHR) {
                    var link = jqXHR.getResponseHeader("Link"),
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
                    $(document).attr("title", title);
                }
            });
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
            var _self = this;
            $.ajax({
                url: "https://api.github.com/repos/" + config['user'] + "/" + config['repo'] + "/issues/" + this.$route.params['id'],
                success: function(data) {
                    _self.$data.post = data;
                }
            });
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

$(document).ready(function() {
    router.start(App, '#content');
});
