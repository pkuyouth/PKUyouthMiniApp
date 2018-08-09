// components/reporter-li/reporter-li.js

'use strict';

const app = getApp();

Component({

	properties: {
		rptInfo: Object,
	},
	data: {
		name: '',
		avatar: '',
		newsCount: -1,
	},
	ready() {
		let rptInfo = this.data.rptInfo;
		let name = rptInfo.name;
		this.setData({
			name: name.length == 2 ? name.split('').join('　') : name,
			avatar: rptInfo.avatar === 'default' ? '../../images/Default_reporter_avatar.jpg' : app.globalData.config.prefix.avatar + rptInfo.avatar,
			newsCount: rptInfo.newsCount,
		});
	},
	methods: {
		tapRptCard() {
			wx.navigateTo({
				url: `/pages/reporter-news/reporter-news?name=${encodeURIComponent(this.data.name)}`,
			});
		}
	}
})
