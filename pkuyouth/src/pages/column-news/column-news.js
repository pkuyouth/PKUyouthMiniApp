// pages/column-news/column-news.js

'use strict';

const requests = require('../../libs/requests.js');
const btnFuncs = require('../../components/floating-button/page-funcs.js');

Page({
	data: {
		column: '',
		page: 1,
		articlesList: [],
		onGetColumnNews: false,
		entirelyGet: false,
		touch: {start:{X:0, Y:0}, end:{X:0, Y:0}},
		moveAction: '',
	},
	onLoad: function (options) {
		wx.showNavigationBarLoading();
		this.setData({
			column: decodeURIComponent(options.column),
			page: 1,
			onGetColumnNews: false,
			entirelyGet: false,
		});
		this.get_column_news();
	},
	onReachBottom() {
		if (this.data.entirelyGet === true) {
			this.setData({
				entirelyGet: true,
			});
		} else {
			this.get_column_news();
		};
	},
	get_column_news() {
		if (!this.onGetColumnNews && !this.entirelyGet) {
			wx.showNavigationBarLoading();
			this.setData({
				onGetColumnNews: true,
			});
			requests.post('/get_column_news',{
				column: this.data.column,
				page: this.data.page,
				limit: 10,
			}).then((data)=>{
				this.setData({
					articlesList: this.data.articlesList.concat(data.news),
					page: this.data.page + 1,
					onGetColumnNews: false,
				});
				if (!data.news.length) {
					this.setData({
						entirelyGet: true,
					});
				};
				wx.hideNavigationBarLoading();
			}).catch((data)=>{
				this.setData({
					onGetColumnNews: false,
				});
				wx.hideNavigationBarLoading();
			});
		};
	},
	tapBtn_1() {
		btnFuncs.feedback.call(this);
	},
	tapBtn_2() { // 时间排序
		btnFuncs.sortedByTime.call(this);
	},
	tapBtn_3() { // 热度排序
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