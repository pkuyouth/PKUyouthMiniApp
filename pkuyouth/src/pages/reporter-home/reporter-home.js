// pages/reporter-home/reporter-home.js

'use strict';

const requests = require('../../libs/requests.js');
const btnFuncs = require('../../conponents/floating-button/page-funcs.js');
const sort = require('../../libs/sort.js');

const app = getApp();


Page({
	data: {
		page: 1,
		entirelyGet: false,
		onGetNews: false,
		initDone: false,
		name: '',
		nameOnShow: '',
		avatar: '',
		desc: '',
		newsCount: -1,
		like: -1, // 总点赞数
		star: false, // 当前用户是否点赞该作者
		articlesList: [],
		screenHeight: app.globalData.systemInfo.screenHeight,
		touch: {start:{X:0, Y:0}, end:{X:0, Y:0}},
		cardTouch: {start:{X:0, Y:0}, end:{X:0, Y:0}},
		moveAction: '',
		cardAnimation: {},
		unfolded: true, // 记者信息卡片是否折叠
		descByTime: false,
		onStarPost: false,
	},
	onLoad(options) {
		this.animation = wx.createAnimation({
			duration: 500,
			timingFunction: 'ease',
	    });
		this.setData({
			page: 1,
			onGetNews: false,
			initDone: false,
			entirelyGet: false,
			onStarPost: false,
			unfolded: true,
			descByTime: false,
			name: options.name.split('　').join(''),
			nameOnShow: options.name,
		});
		wx.setNavigationBarTitle({
			title: this.data.name + '的主页',
		});
		this.get_rpt_info();
	},
	onReachBottom() {
		if (this.data.entirelyGet === true) {
			this.setData({ // 触发
				entirelyGet: true,
			});
		} else {
			this.get_rpt_news();
		};
	},
	get_rpt_info() {
		requests.post("/get_reporter_info",{
			name: this.data.name,
		}).then((data)=>{
			console.log(data);
			let baseAvatarUrl = "https://rabbitzxh.top/static/image/miniprogram_api/reporter_avatar/";
			let rptInfo = data.reporter;
			this.setData({
				desc: rptInfo.desc,
				avatar: baseAvatarUrl + rptInfo.avatar,
				like: rptInfo.like,
				star: rptInfo.star,
				newsCount: rptInfo.newsCount,
				initDone: true,
			});
			this.get_rpt_news(); // 先获得记者信息 然后再获得图文信息
		});
	},
	get_rpt_news() {
		if (this.onGetNews || this.entirelyGet) return;
		this.setData({
			onGetNews: true,
		});
		wx.showNavigationBarLoading();
		requests.post("get_reporter_news",{
			name: this.data.name,
			page: this.data.page,
			limit: 10,
		}).then((data)=>{
			console.log(data);
			this.setData({
				articlesList: this.data.articlesList.concat(data.news),
				page: this.data.page + 1,
				onGetNews: false,
			});
			wx.hideNavigationBarLoading();
			if (!data.news.length) {
				this.setData({
					entirelyGet: true,
				});
			};
		}).catch((data)=>{
			this.setData({
				onGetNews: false,
			})
			wx.hideNavigationBarLoading();
		});
	},
	tapStar() {
		if (this.data.onStarPost) return;
		this.setData({
			onStarPost: true,
		});
		requests.post("/star_reporter",{
			name: this.data.name,
			action: this.data.star ? 'unstar' : 'star',
		}).then((data)=>{
			console.log(data);
			let like = this.data.like;
			this.setData({
				star: !this.data.star,
				like: this.data.star ? like-1 : like+1 , // 注意此时 star 的含义
				onStarPost: false,
			});
		}).catch((data)=>{
			this.setData({
				onStarPost: false,
			});
		});
	},
	foldCard() {
		this.setData({ // 注意 还需要让透明度变化 否则 回到顶端会闪屏！
			cardAnimation: this.animation.translateY(-this.data.screenHeight).step().opacity(0).step({duration: 10}).export(),
		});
		setTimeout(function() {
			this.setData({
				unfolded: false,
			});
		}.bind(this), 610);
	},
	unfoldedCard() {
		this.setData({
			cardAnimation: this.animation.opacity(1).step({duration: 10}).translateY(0).step().export(),
		});
		setTimeout(function() {
			this.setData({
				unfolded: true,
			});
		}.bind(this), 610);
	},
	handleCardTouchStart(event) {
		this.setData({
			'cardTouch.start.X': event.changedTouches[0].pageX,
			'cardTouch.start.Y': event.changedTouches[0].pageY,
		});
	},
	handleCardTouchEnd(event) {
		this.setData({
			'cardTouch.end.X': event.changedTouches[0].pageX,
			'cardTouch.end.Y': event.changedTouches[0].pageY,
		});
		let dx = this.data.cardTouch.end.X - this.data.cardTouch.start.X;
		let dy = this.data.cardTouch.end.Y - this.data.cardTouch.start.Y;
		if (Math.abs(dy) > 50 && Math.abs(dy) > Math.abs(dx)) {
			if (dy < 0 && this.data.unfolded) { // 向上滑动
				this.foldCard();
			}
		}
	},
	tapBtn_1() {
		btnFuncs.feedback.call(this);
	},
	tapBtn_2() {
		this.unfoldedCard();
	},
	tapBtn_3() { // 按权重排序
		sort.newsByWeight.call(this);
	},
	tapBtn_4() { // 按时间排序
		btnFuncs.sortedByTime.call(this);
	},
	tapBtn_5() {
		btnFuncs.scrollToUpper.call(this);
	},
	handleTouchStart(event) {
		if (this.data.unfolded) return;
		btnFuncs.handleTouchStart.call(this, event);

	},
	handleTouchEnd(event) {
		if (this.data.unfolded) return;
		btnFuncs.handleTouchEnd.call(this, event);
	},
})