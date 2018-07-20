// pages/setting/setting.js

'use strict';

const requests = require('../../libs/requests.js');

const app = getApp();

Page({

	data: app.globalData.setting,

	changeSetting(event) {
		this.setData({
			[event.target.dataset.option]: event.detail.value,
		});
		app.globalData.setting[event.target.dataset.option] = event.detail.value;
        requests.post('/change_setting', {
            key: event.target.dataset.option,
            value: event.detail.value,
        }).then((data)=>{
            console.log(data);
        });
	},
})