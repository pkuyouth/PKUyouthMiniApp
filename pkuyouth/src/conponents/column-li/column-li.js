// conponents/column-li/column-li.js

const requests = require('../../libs/requests.js');

Component({

	properties: {
		columnInfo: Object,
	},
	data: {
		id: 0,
		title: "",
		desc: "",
		cover: "",
		newsCount: -1,
	},
	ready() {
		let baseCoverUrl = "https://rabbitzxh.top/static/image/miniprogram_api/column_cover/";
		let columnInfo = this.data.columnInfo;
		this.setData({
			id: columnInfo.id,
			title: columnInfo.title,
			desc: columnInfo.desc,
			cover: baseCoverUrl + columnInfo.cover,
			newsCount: columnInfo.newsCount,
		});
	},
	methods: {
		tapColumnCard(event) {
			wx.navigateTo({
				url: '/pages/column-news/column-news?column=' + encodeURIComponent(this.data.title),
			});
		}
	}
})
