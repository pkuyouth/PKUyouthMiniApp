// pages/web_tmp/web_tmp.js

'use strict';

Page({
	data: {
		url: "",
		type: "",
		title: ""
	},
	onLoad(options) {
		this.setData({
			url: decodeURIComponent(options.url),
			type: options.type,
			title: decodeURIComponent(options.title)
		});
	},
	onReady() {
		wx.setNavigationBarTitle({
			title: this.data.title,
		});
	},
})