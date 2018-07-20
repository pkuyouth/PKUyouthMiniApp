// components/news-li-sm/news-li-sm.js

'use strict';

const tools = require("../../libs/utilfuncs.js");
const requests = require("../../libs/requests.js");

const app = getApp();

Component({

	properties: {
        newsInfo: Object,
	},

	data: {
        newsID: '',
        title: '',
        time: '',
        read_num: -1,
        like_num: -1,
        star: false,
        starTime: -1,
        rank: -1,
        weight: -1,
        cover_url: '',
        news_url: '',
        title_encode: '',
	},
    ready() { // created 在获得属性之前，如果用 created 则 props 均为 null !
        let newsInfo = this.data.newsInfo;
        this.setData({
            newsID: newsInfo.newsID,
            title: newsInfo.title,
            //time: this.fmtTime(newsInfo.time),
            time: newsInfo.time,
            read_num: newsInfo.read_num,
            like_num: newsInfo.like_num,
            rank: newsInfo.rank === undefined ? -1 : newsInfo.rank, // 默认值 -1
            star: newsInfo.star,
            starTime: newsInfo.starTime === undefined ? -1 : newsInfo.starTime,
            weight: newsInfo.weight === undefined ? -1 : newsInfo.weight,
            cover_url: app.globalData.config.prefix.sm_cover + newsInfo.cover_url,
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
        fmtTime(time) {
            //let [year, month, day] = time.split("-");
            //return year+'年'+month+'月'+day+'日'
            return time.split("-").join(" / ")
        },
        tapStar() {
            this.setData({
                star: !this.data.star,
            });
            requests.post("/star_news",{
                newsID: this.data.newsID,
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
        tapRecommend() {
            wx.navigateTo({
                url: '/pages/recommend-result/recommend-result?newsid=' + this.data.newsID,
            });
        },
        tapNavigate() {
        	wx.navigateTo({
        		url: `/pages/web-frame/web-frame?url=${this.data.news_url}&title=${this.data.title_encode}&type=news"`
        	});
        }
	}
})
