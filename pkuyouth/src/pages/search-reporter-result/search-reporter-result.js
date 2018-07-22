// pages/search-reporter-result/search-reporter-result.js

'use strict';

const requests = require('../../libs/requests.js');

Page({

	data: {
		initDone: false,
		rptsInfoList: [],
	},

	onLoad(options) {
		requests.post("/search_reporter", {
			name: decodeURIComponent(options.name),
		}).then((data)=>{
			this.setData({
				rptsInfoList: data.reporters,
				initDone: true,
			});
		}).catch((data)=>{
			this.setData({
				initDone: true,
			});
		});
	},

})