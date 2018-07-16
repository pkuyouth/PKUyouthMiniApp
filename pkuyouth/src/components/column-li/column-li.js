// components/column-li/column-li.js

'use strict';

const requests = require('../../libs/requests.js');

const app = getApp();

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
		let coverPrefix = app.globalData.config.prefix.column;
		let columnInfo = this.data.columnInfo;
		this.setData({
			id: columnInfo.id,
			title: columnInfo.title,
			desc: columnInfo.desc,
			cover: coverPrefix + columnInfo.cover,
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
