// pages/collection-random/collection-random.js

'use strict';

const requests = require('../../libs/requests.js');
const btnFuncs = require('../../components/floating-button/page-funcs.js');
const cardFuncs = require('../../components/news-li/page-funcs.js');

Page({
	data: {
		onGetRandom: false,
		articlesList: [],
		touch: {start:{X:0, Y:0}, end:{X:0, Y:0}},
		moveAction: '',
	},
	onLoad() {
		this.get_random();
	},
	get_random() {
		if (this.data.onGetRandom) return;
		this.setData({
			onGetRandom: true,
		});
		wx.showNavigationBarLoading();
		requests.post('/get_col_random',{
			count: 8,
		}).then((data)=>{
			let newArticles = cardFuncs.filterExisted.call(this, data.news); // 去重
			this.setData({
				articlesList: this.data.articlesList.concat(newArticles),
				onGetRandom: false,
			});
			wx.hideNavigationBarLoading();
		}).catch((data)=>{
			this.setData({
				onGetRandom: false,
			})
			wx.hideNavigationBarLoading();
		});
	},
	onReachBottom() {
		this.get_random();
	},
	tapBtn_1() {
		btnFuncs.feedback.call(this);
	},
	tapBtn_2() {
		btnFuncs.sortedByTime.call(this);
	},
	tapBtn_3() {
		btnFuncs.sortedByReadNum.call(this);
	},
	tapBtn_4() {
		btnFuncs.scrollToUpper.call(this);
	},
	handleTouchStart(event) {
		btnFuncs.handleTouchStart.call(this, event);
	},
	handleTouchEnd(event) {
		btnFuncs.handleTouchEnd.call(this, event);
	},
})