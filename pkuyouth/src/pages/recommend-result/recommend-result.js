// pages/recommend-result/recommend-result.js

const requests = require('../../libs/requests.js');
const btnFuncs = require('../../conponents/floating-button/page-funcs.js');


Page({
	data: {
		articlesList: [],
		touch: {start:{X:0, Y:0}, end:{X:0, Y:0}},
		moveAction: '',
	},
	onLoad: function (options) {
		wx.showNavigationBarLoading();
		requests.post('/recommend',{
			newsID: options.newsid,
			limit: 10,
		}).then((data)=>{
			this.setData({
				articlesList: data.news,
			});
			wx.hideNavigationBarLoading();
		}).catch((data)=>{
			wx.hideNavigationBarLoading();
		});
	},
	tapBtn_1() {
		btnFuncs.feedback.call(this);
	},
	tapBtn_2() {
		btnFuncs.sortedByTime.call(this);
	},
	tapBtn_3() {
		btnFuncs.pageBack.call(this);
	},
	handleTouchStart(event) {
		btnFuncs.handleTouchStart.call(this, event);
	},
	handleTouchEnd(event) {
		btnFuncs.handleTouchEnd.call(this, event);
	},
})