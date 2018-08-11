// components/news-li/news-li.js

'use strict';

Component({
	properties: {
		newsInfo: Object,
	},
	data: {
		networkType: '',
		auto_change_card: false,
		use_small_card: true,
	},
	ready() {
		const app = getApp();
		this.setData({
			networkType: app.globalData.networkType,
			auto_change_card: app.globalData.setting.auto_change_card,
			use_small_card: app.globalData.setting.use_small_card,
		});
		wx.onNetworkStatusChange((res)=>{
			if (res.isConnected) {
				this.setData({
					networkType: res.networkType,
				});
			};
		});
	},
})
