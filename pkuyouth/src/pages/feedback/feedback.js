// pages/feedback/feedback.js

const requests = require("../../libs/requests.js")

Page({
	data: {
		feedbackText: "",
		feedbackStatus: "",
		showStatus: false,
	},
	feedbackInput(event) { // 双向绑定
		this.setData({
			feedbackText: event.detail.value,
		});
	},
	feedback() {
		if (this.data.showStatus === true || this.data.feedbackText === "") {
			return
		};
		requests.post("/feedback",{
			feedback: this.data.feedbackText,
		}).then((data)=>{
			let errcode = data.errcode;
			if (errcode === 0) {
				this.setData({
					feedbackText: "", // 成功，则内容清空
					feedbackStatus: true,
					showStatus: true,
				});
				setTimeout(this.hideStatus,3000);
			} else {
				this.setData({
					feedbackStatus: false,
					showStatus: true,
				});
				setTimeout(this.hideStatus,3000);
			}
		})
	},
	hideStatus() {
		this.setData({
			feedbackStatus: true,
			showStatus: false,
		});
	},
	onLoad: function () {
		this.hideStatus();

	},
	onUnload: function () {
		this.hideStatus();
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
	
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {
	
	}
})