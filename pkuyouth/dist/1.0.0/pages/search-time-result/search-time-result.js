// pages/search-time-result/search-time-result.js

'use strict';

const requests = require('../../libs/requests.js');
const btnFuncs = require('../../components/floating-button/page-funcs.js');


Page({

	data: {
		initDone: false,
		method: '',
		articlesList: [],
		touch: {start:{X:0, Y:0}, end:{X:0, Y:0}},
		moveAction: '',
	},

	onLoad(options) {
		this.setData({
			method: options.method,
		});
		requests.post("/search_by_time",{
			date: options.date,
			method: options.method,
		}).then((data)=>{
			this.setData({
				articlesList: data.news,
				initDone: true,
			});
		}).catch((data)=>{
			this.setData({
				initDone: true,
			});
		});
	},
	tapBtn_1() {
		btnFuncs.feedback.call(this);
	},
	tapBtn_2() {
		btnFuncs.scrollToUpper.call(this);
	},
	handleTouchStart(event) {
		if (!this.data.articlesList.length) return;
		btnFuncs.handleTouchStart.call(this, event);
	},
	handleTouchEnd(event) {
		if (!this.data.articlesList.length) return;
		btnFuncs.handleTouchEnd.call(this, event);
	},
})