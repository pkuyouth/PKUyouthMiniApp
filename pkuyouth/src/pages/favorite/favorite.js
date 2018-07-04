// pages/favorite/favorite.js

const requests = require('../../libs/requests.js');

Page({
	data: {
		articlesList: [],
		descByStarTime: false,
		touch: {start:{X:0, Y:0}, end:{X:0, Y:0}},
		moveAction: '',
	},
	onLoad: function () {
		requests.get('/get_favorite').then((data)=>{
			this.setData({
				articlesList: data.news,
			});
		});
		this.setData({
			descByStarTime: false,
		})
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
		this.setData({
			'touch.start.X': event.changedTouches[0].pageX,
			'touch.start.Y': event.changedTouches[0].pageY,				
		});
	},
	handleTouchEnd(event) {
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
		}
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
	
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
	
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {
	
	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {
	
	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {
	
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {
	
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {
	
	}
})