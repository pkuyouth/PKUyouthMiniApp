// pages/blank/blank.js

'use strict';

const requests = require('../../libs/requests.js');

/*
const requests = require('../../libs/requests.js');

Page({

	data: {
		articlesList: [],
	},

	onLoad(options) {
		this.get_random();
	},
	get_random() {
		requests.post('/get_col_random',{
			count: 10,
		}).then((data)=>{
			this.setData({
				articlesList: data.news
			});
			console.log(this.data.articlesList);
		});
	},
	onPullDownRefresh() {
		this.onLoad();
		wx.stopPullDownRefresh();
	}
})
 */

Page({
	data: {
		date: '2016-09-01',
	},

	bindDateChange: function(e) {
		console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			date: e.detail.value
		});
	},
	submitTimeSearch(event) {
		console.log(event.target.dataset.method)
		requests.post("/search_by_time",{
			date: this.data.date,
			method: event.target.dataset.method,
			limit: 8,
		}).then((data)=>{
			console.log(data);
		});
	}

})