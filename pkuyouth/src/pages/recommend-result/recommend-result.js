// pages/recommend-result/recommend-result.js

const requests = require('../../libs/requests.js');

Page({
	data: {
		articlesList: [],
	},
	onLoad: function (options) {
		wx.setNavigationBarTitle({
			title: '相似推荐'
		});
		wx.showNavigationBarLoading();
		requests.post('/recommend',{
			newsID: parseInt(options.newsid),
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