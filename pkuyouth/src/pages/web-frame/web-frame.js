// pages/web_tmp/web_tmp.js

Page({
	data: {
		url: "",
		type: "",
	},
	onLoad: function (options) {
		console.log(decodeURIComponent(options.url));
		
		this.setData({
			url: decodeURIComponent(options.url),
			type: options.type,
		});
		console.log(this.data.type)
	},
	onUnload: function () {
		this.setData({
			url: "",
			type: "",
		});
	},
	onShareAppMessage(options) {
		console.log(options.webViewUrl)
	},
	tapBtn_1() {
		console.log('tap btn 1 !');
	},
	tapBtn_2() {
		console.log('tap btn 2 !');
	},
	tapBtn_3() {
		console.log('tap btn 3 !');
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
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {
	
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {
	
	}
})