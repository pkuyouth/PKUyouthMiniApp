// pages/favorite/favorite.js

const requests = require('../../libs/requests.js');

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
	onLoad: function () {
		wx.setNavigationBarTitle({
			title: '我的收藏'
		});
		this.setData({
			descByStarTime: false,
			limit: 10,
			page: 1,
			onGetFavorite: false,
			entirelyGet: false,
		});
		this.get_favorite();
	},
	onReachBottom() {
		this.get_favorite();
		if (this.data.entirelyGet === true) {
			this.setData({
				entirelyGet: true,
			});
		};
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
		wx.navigateTo({
			url: '/pages/feedback/feedback',
		});
	},
	tapBtn_2() { // 时间排序
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
	handleTouchStart(event) {
		if (this.data.articlesList.length) {
			this.setData({
				'touch.start.X': event.changedTouches[0].pageX,
				'touch.start.Y': event.changedTouches[0].pageY,				
			});	
		};
	},
	handleTouchEnd(event) {
		if (this.data.articlesList.length) {
			this.setData({
				'touch.end.X': event.changedTouches[0].pageX,
				'touch.end.Y': event.changedTouches[0].pageY,		
			});	
			let dx = this.data.touch.end.X - this.data.touch.start.X;
			let dy = this.data.touch.end.Y - this.data.touch.start.Y;
			if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
				this.setData({ // 至少滑动 50 px 。如果是 tap 则 dx == dy == 0
					moveAction: dx > 0 ? 'right' : 'left'
				});
			} else {
				this.setData({
					moveAction: ''
				});
			};
		};
	},
})