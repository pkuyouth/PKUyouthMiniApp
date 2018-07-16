// pages/search-reporter/search-reporter.js

'use strict';

const requests = require('../../libs/requests.js');
const btnFuncs = require("../../components/floating-button/page-funcs.js");

Page({

	data: {
		name: '',
		rptsInfoList: [],
		status: '',
		focus: false,
	},
	nameInput(event) {
		this.setData({
			name: event.detail.value,
		});
	},
	tapConfirm(event) {
		this.search_rpt();
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
	onLoad(options) {
		this.random_get_rpt();
	},
	search_rpt() {
		if (!this.data.name.length) return;
		requests.post("/search_reporter", {
			name: this.data.name,
		}).then((data)=>{
			this.setData({
				rptsInfoList: data.reporters,
				status: '搜索结果：',
			});
		});
	},
	random_get_rpt() {
		requests.post("/random_get_reporter", {
			limit: 5,
		}).then((data)=>{
			this.setData({
				rptsInfoList: data.reporters,
				status: '随机推荐：',
			});
		});
	},
	tapBtn_1() {
		btnFuncs.feedback.call(this);
	},
	tapBtn_2() {
		this.random_get_rpt();
	},
})