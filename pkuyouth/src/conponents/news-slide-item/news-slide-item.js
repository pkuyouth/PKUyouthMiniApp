// conponents/news-slide-item/news-slide-item.js

const tools = require('../../libs/utilfuncs.js');

Component({

	properties: {
		newsInfo: Object,
	},

	data: {
		newsID: '',
		title: '',
		digest: '',
		time: '',
		cover_url: '',
		news_url: '',
		title_encode: '',
	},
	ready() {
		let newsInfo = this.data.newsInfo;
		this.setData({
			newsID: newsInfo.newsID,
			title: newsInfo.title,
			digest: this.fmtDigest(newsInfo.digest),
			time: this.fmtTime(newsInfo.time),
			cover_url: newsInfo.cover_url,
			news_url: encodeURIComponent(this.unifyUrl(newsInfo.news_url)),
			title_encode: encodeURIComponent(newsInfo.title),
		});
	},
	methods: {
        unifyUrl(url) {
            let host = "https://mp.weixin.qq.com/s";
            let querys = tools.parseQuery(url);
            return tools.urlJoin(host, querys) + "#wechat_redirect";
        },
        fmtTime(time) {
            let [year, month, day] = time.split("-");
            return year+'年'+month+'月'+day+'日'
        },
        fmtDigest(digest) {
        	if (digest.length < 44) { // (750 - 40 * 2) / 28
        		return digest;
        	} else {
        		return digest.substring(0, 44) + '……';
        	}
        }
	}
})
