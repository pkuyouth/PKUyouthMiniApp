//index.js
import {GET, POST} from '../../libs/request.js';


let pageConfig = {
    data: {
        layerLevel: 0,
        mode: "search",
        params: {},
        articles: [
        ]
    },
    layerTrigger: function(e) {
        if (this.data.layerLevel == 0)
            this.setData({
                layerLevel: 1
            });
        else
            this.setData({
                layerLevel: 0
            });
    },
    refresh: function(finished = function(){}) {
        var page = this;
        let mapArticle = objects => {
            var articles = [];
            objects.forEach(function(v) {
                articles.push({
                    id: v.id,
                    title: v.title,
                    image: v.pic_url,
                    content: v.desc,
                    navurl: ""
                })
            });
            return articles;
        };
        var url = "";
        if (this.data.mode == "search")
            url = 'https://www.pkuyouth.top/pkuyouth/search';
        else if (this.data.mode == "subject")
            url = 'https://www.pkuyouth.top/pkuyouth/subject';
        else
            url = 'https://www.pkuyouth.top/pkuyouth/view_collect';

        POST(url, this.data.params).then(function(data){
            page.setData({
                'articles': mapArticle(data.articleVOs)
            });
            finished();
        }, finished);
    },
    onLoad: function(query) {
        this.setData({
            mode: query.mode
        });
        if (query.mode == "search") {
            this.data.params = { "content":query.content };
        }
        else if (query.mode == "subject") {
            this.data.params = { "subject":query.subject };
        }
        else if (query.mode == "favorite") {
            this.data.params = { "user_id":query.subject };
        }
        this.refresh();
    }
};


Page(pageConfig);
