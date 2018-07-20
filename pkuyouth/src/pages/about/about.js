// pages/about/about.js

'use strict';

const app = getApp();

Page({

	data: {
		version_number: -1,
	},

	onLoad(options) {
		this.setData({
			version_number: app.globalData.config.version.number,
		});
	},

})