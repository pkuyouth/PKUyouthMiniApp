// pages/search-result/search-result.js

'use strict';

const requests = require('../../libs/requests.js');
const btnFuncs = require("../../components/floating-button/page-funcs.js");


Page({
	data: {
		keyword: '',
		range: '',
		notFound: '',
		page: 1,
		onSearch: false,
		entirelyGet: false,
		descByRank: true,
		descByTime: true,
		articlesList: [],
		touch: {start:{X:0, Y:0}, end:{X:0, Y:0}},
		moveAction: '',
	},
	onLoad(options) {
		let range = decodeURIComponent(options.range);
		if (['column','rpt'].indexOf(range.split("-")[0]) !== -1) { // column-xxx | rpt-xxx
			range = range.split("-")[1];
		};
		this.setData({
			keyword: decodeURIComponent(options.keyword),
			range: range,
			notFound: decodeURIComponent(options.notfound),
		});
		this.search();
	},
	onReachBottom() {
		if (this.data.entirelyGet === true) {
			this.setData({ // 触发
				entirelyGet: true,
			});
		} else {
			this.search();
		};
	},
	search() {
		if (this.data.onSearch || this.data.entirelyGet) return;
		this.setData({
			onSearch: true,
		});
		wx.showNavigationBarLoading();
		requests.post('/search',{
			keyword: this.data.keyword,
			page: this.data.page,
			range: this.data.range,
			limit: 8,
		}).then((data)=>{
			this.setData({
				articlesList: this.data.articlesList.concat(data.news),
				page: this.data.page + 1,
				onSearch: false,
			});
			wx.hideNavigationBarLoading();
			if (!data.news.length) {
				this.setData({
					entirelyGet: true,
				});
			};
		}).catch((data)=>{
			this.setData({
				onSearch: false,
			});
			wx.hideNavigationBarLoading();
		});
	},
	tapBtn_1() {
		btnFuncs.feedback.call(this);
	},
	tapBtn_2() { // 时间排序
		btnFuncs.sortedByTime.call(this);
	},
	tapBtn_3() { // 相关度排序
		btnFuncs.sortedByRank.call(this);
	},
	tapBtn_4() {
		btnFuncs.scrollToUpper.call(this);
	},
	tapBtn_5() {
		btnFuncs.pageBack.call(this);
	},
	handleTouchStart(event) {
		if (!this.data.articlesList.length) return;
		btnFuncs.handleTouchStart.call(this, event);
	},
	handleTouchEnd(event) {
		if (!this.data.articlesList.length) return;
		btnFuncs.handleTouchEnd.call(this, event);
	},
})