// pages/web_tmp/web_tmp.js

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
	tapBtn_1() {
		console.log('tap btn 1 !');
	},
	tapBtn_2() {
		console.log('tap btn 2 !');
	},
	tapBtn_3() {
		console.log('tap btn 3 !');
	},
})