// pages/search-result/search-result.js

const requests = require('../../libs/requests.js');

Page({
	data: {
		keyword: '',
		page: 1,
		onSearch: false,
		entirelyGet: false,
		descByRank: true,
		descByTime: true,
		articlesList: [],
		touch: {start:{X:0, Y:0}, end:{X:0, Y:0}},
		moveAction: '',
	},
	onLoad: function (options) {
		wx.setNavigationBarTitle({
			title: '搜索结果'
		});
		this.setData({
			descByRank: true,
			descByTime: true,
			keyword: decodeURIComponent(options.keyword),
			page: 1,
			onSearch: false,
			entirelyGet: false,
		});
		this.search();
	},
	onReachBottom() {
		this.search();
		if (this.data.entirelyGet === true) {
			this.setData({ // 触发
				entirelyGet: true,
			});
		};
	},
	search() {
		if (!this.data.onSearch && !this.data.entirelyGet) {
			wx.showNavigationBarLoading();
			requests.post('/search',{
				keyword: this.data.keyword,
				page: this.data.page,
				limit: 5,
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
			if (this.data.descByTime) {
				return (news1.time > news2.time ? -1 : 1);
			} else {
				return (news2.time > news1.time ? -1 : 1);
			};
		});
		this.setData({
			articlesList: articlesList,
			descByTime: !this.data.descByTime,
		});
	},
	tapBtn_3() { // 相关度排序
		let articlesList = this.data.articlesList;
		if (articlesList.length === 0) return;
		articlesList.sort((news1,news2)=>{
			if (this.data.descByRank) {
				return (news1.rank > news2.rank ? -1 : 1);
			} else {
				return (news2.rank > news1.rank ? -1 : 1);
			};
		});
		this.setData({
			articlesList: articlesList,
			descByRank: !this.data.descByRank,
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