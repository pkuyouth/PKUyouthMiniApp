// pages/feedback/feedback.js

const requests = require("../../libs/requests.js")

Page({
	data: {
		feedbackText: "",
		feedbackStatus: true,
		showStatus: false,
	},
	onLoad() {
		wx.setNavigationBarTitle({
			title: '意见反馈'
		});
	},
	feedbackInput(event) { // 双向绑定
		this.setData({
			feedbackText: event.detail.value,
		});
	},
	feedback() {
		if (this.data.showStatus === true || this.data.feedbackText === "") {
			return;
		};
		requests.post("/feedback",{
			feedback: this.data.feedbackText,
		}).then((data)=>{
			this.setData({
				feedbackText: "", // 成功，则内容清空
				feedbackStatus: true,
				showStatus: true,
			});
			setTimeout(this.showStatusDown.bind(this),1500)
		}).catch((data)=>{
			this.setData({
				feedbackStatus: false,
				showStatus: true,
			});
			setTimeout(this.showStatusDown.bind(this),1500)
		});
	},
	showStatusDown() {
		this.setData({
			showStatus: false,
		});
	},

})