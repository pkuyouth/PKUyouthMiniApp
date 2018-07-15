// pages/favorite/favorite.js

const requests = require('../../libs/requests.js');
const btnFuncs = require('../../conponents/floating-button/page-funcs.js');
const sort = require('../../libs/sort.js');

Page({
	data: {
		articlesList: [],
		descByStarTime: false,
		page: 1,
		onGetFavorite: false,
		entirelyGet: false,
		touch: {start:{X:0, Y:0}, end:{X:0, Y:0}},
		moveAction: '',
	},
	onLoad() {
		wx.setNavigationBarTitle({
			title: '我的收藏'
		});
		this.setData({
			descByStarTime: false,
			page: 1,
			onGetFavorite: false,
			entirelyGet: false,
		});
		this.get_favorite();
	},
	onReachBottom() {
		if (this.data.entirelyGet === true) {
			this.setData({
				entirelyGet: true,
			});
		} else {
			this.get_favorite();
		}
	},
	get_favorite() {
		if (!this.data.onGetFavorite && !this.data.entirelyGet) {
			wx.showNavigationBarLoading();
			this.setData({
				onGetFavorite: true,
			});
			requests.post('/get_favorite',{
				limit: 10,
				page: this.data.page,
			}).then((data)=>{
				this.setData({
					articlesList: this.data.articlesList.concat(data.news),
					page: this.data.page + 1,
					onGetFavorite: false,
				});
				if (!data.news.length) {
					this.setData({
						entirelyGet: true,
					});
					wx.hideNavigationBarLoading();
				};
			}).catch((data)=>{
				this.setData({
					onGetFavorite: false,
				});
				wx.hideNavigationBarLoading();
			});
		};
	},
	tapBtn_1() {
		btnFuncs.feedback.call(this);
	},
	tapBtn_2() { // 点赞时间排序
		sort.newsByStarTime.call(this);
	},
	tapBtn_3() {
		btnFuncs.scrollToUpper.call(this);
	},
	handleTouchStart(event) {
		btnFuncs.handleTouchStart.call(this, event);
	},
	handleTouchEnd(event) {
		btnFuncs.handleTouchEnd.call(this, event);
	},
})