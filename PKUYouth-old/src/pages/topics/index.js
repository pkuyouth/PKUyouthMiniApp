import {GET, POST} from '../../libs/request.js';

let pageConfig = {
    data: {
        layerLevel: 0,
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
    onLoad: function(options) {
        this.refresh();
    },
    refresh: function(finished = function(){}) {
        var page = this;
        let mapArticle = objects => {
            var articles = [];
            objects.forEach(function(v) {
                articles.push({
                    id: v.name,
                    title: v.name,
                    image: v.img,
                    content: '',
                    'navurl': '/pages/search/index?mode=subject&subject='+v.name
                })
            });
            return articles;
        };
        GET('https://www.pkuyouth.top/pkuyouth/get_all_subject?code=' + getApp().globalData.access_token).then(function(data){
            page.setData({
                'articles': mapArticle(data)
            });
            finished();
        }, finished);
    },
    refreshTrigger: function(e) {
        this.setData({
            layerLevel: 0
        });
        this.refresh();
    },
    onPullDownRefresh: function(e) {
        wx.showNavigationBarLoading();
        this.refresh(() => {
            setTimeout(() => {
                wx.hideNavigationBarLoading();
                wx.stopPullDownRefresh()
            }, 500);
        });
    }
};


Page(pageConfig);
