// pages/feedback/feedback.js

'use strict';

const requests = require("../../libs/requests.js")

Page({
	data: {
		feedbackText: "",
		onFeedback: false,
		feedbackStatus: true,
		focus: false,
		showStatus: false,
	},
	bindFoucs() {
		this.setData({
			focus: true,
		});
	},
	bindBlur() {
		this.setData({
			focus: false,
		})
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
		this.setData({
			onFeedback: true,
		});
		requests.post("/feedback",{
			feedback: this.data.feedbackText,
		}).then((data)=>{
			this.setData({
				feedbackText: "", // 成功，则内容清空
				onFeedback: false,
				feedbackStatus: true,
				showStatus: true,
			});
			setTimeout(this.showStatusDown.bind(this),1500)
		}).catch((data)=>{
			this.setData({
				onFeedback: false,
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