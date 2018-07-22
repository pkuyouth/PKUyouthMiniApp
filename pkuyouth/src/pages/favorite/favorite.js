// pages/favorite/favorite.js

'use strict';

const requests = require('../../libs/requests.js');
const btnFuncs = require('../../components/floating-button/page-funcs.js');


Page({
	data: {
		initDone: false,
		articlesList: [],
		descByStarTime: false,
		page: 1,
		onGetFavorite: false,
		entirelyGet: false,
		touch: {start:{X:0, Y:0}, end:{X:0, Y:0}},
		moveAction: '',
	},
	onLoad() {
		this.get_favorite();
	},
	onReachBottom() {
		if (this.data.entirelyGet || this.data.page === 0) { // page = 0 说明 entirelyGet
			this.setData({
				entirelyGet: true, // 触发提示
			});
		} else {
			this.get_favorite();
		}
	},
	get_favorite(get_all=false) {
		if (this.data.onGetFavorite || this.data.entirelyGet || this.data.page === 0) {
			return;
		};
		wx.showNavigationBarLoading();
		this.setData({
			onGetFavorite: true,
		});
		requests.post('/get_favorite',{
			limit: 8,
			page: get_all ? 0 : this.data.page, // get_all 则 page = 0
		}).then((data)=>{
			if (get_all) {
				this.setData({
					articlesList: data.news,
					page: 0,
					onGetFavorite: false,
					initDone: true,
				}); // 此时不设置 entirelyGet 而是在随后的触底再设置，并触发提示
			} else {
				this.setData({
					articlesList: this.data.articlesList.concat(data.news),
					page: this.data.page + 1,
					onGetFavorite: false,
					initDone: true,
				});
				if (!data.news.length) {
					this.setData({
						entirelyGet: true,
					});
				};
			};
			wx.hideNavigationBarLoading();
		}).catch((data)=>{
			this.setData({
				onGetFavorite: false,
				initDone: true,
			});
			wx.hideNavigationBarLoading();
		});
	},
	tapBtn_1() {
		btnFuncs.feedback.call(this);
	},
	tapBtn_2() { // 点赞时间排序
		let articlesList = this.data.articlesList;
		if (articlesList.length === 0) return;
		articlesList.sort((news1,news2)=>{
			if (this.data.descByStarTime) {
				return (news1.starTime > news2.starTime ? -1 : 1);
			} else {
				return (news2.starTime > news1.starTime ? -1 : 1);
			};
		});
		this.setData({
			articlesList: articlesList,
			descByStarTime: !this.data.descByStarTime,
		});
	},
	tapBtn_3() {
		btnFuncs.sortedByTime.call(this);
	},
	tapBtn_4() {
		this.get_favorite(true);
	},
	tapBtn_5() {
		btnFuncs.scrollToUpper.call(this);
	},
	handleTouchStart(event) {
		btnFuncs.handleTouchStart.call(this, event);
	},
	handleTouchEnd(event) {
		btnFuncs.handleTouchEnd.call(this, event);
	},
})

