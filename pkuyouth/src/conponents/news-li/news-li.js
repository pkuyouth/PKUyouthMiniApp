// conponents/news-li/news-li.js

const tools = require("../../libs/utilfuncs.js");
const requests = require("../../libs/requests.js");

Component({
	properties: {
        newsInfo: Object,
	},
	data: {
        newsID: 0,
        title: "",
        time: "",
        star: false,
        starTime: -1,
        rank: -1,
        cover_url: "",
        news_url: "",
        title_encode: "",
	},
    ready() { // created 在获得属性之前，如果用 created 则 props 均为 null !
        let newsInfo = this.data.newsInfo;
        this.setData({
            newsID: newsInfo.newsID,
            title: newsInfo.title,
            time: newsInfo.time,
            rank: newsInfo.rank === undefined ? -1 : newsInfo.rank, // 默认值 -1
            star: newsInfo.star,
            starTime: newsInfo.starTime === undefined ? -1 : newsInfo.starTime,
            cover_url: newsInfo.cover_url,
            news_url: encodeURIComponent(this.unifyUrl(newsInfo.news_url)),
            title_encode: encodeURIComponent(newsInfo.title),
        }); // news_url 需要事先转义，否则其中含有的 ? 会影响 navigator 对参数的匹配
    },
	methods: {
        unifyUrl(url) {
            let host = "https://mp.weixin.qq.com/s";
            let querys = tools.parseQuery(url);
            return tools.urlJoin(host, querys) + "#wechat_redirect";
        },
        tapStar(event) {
            this.setData({
                star: !this.data.star,
            });
            requests.post("/star",{
                newsID: event.target.dataset.newsId,
                action: this.data.star ? "star" : "unstar", // tap后的实际状态
                actionTime: new Date().getTime(),
            }).then((data)=>{
            }).catch((data)=>{
                if (data.errcode && data.errcode !== 0) {
                    this.setData({
                        star: !this.data.star,
                    });
                };
            });
        },
        tapRecommend(event) {
            wx.navigateTo({
                url: '/pages/recommend-result/recommend-result?newsid='+event.target.dataset.newsId,
            });
        }
	}
})
