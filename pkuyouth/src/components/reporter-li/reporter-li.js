// components/reporter-li/reporter-li.js

'use strict';

const app = getApp()

Component({

	properties: {
		rptInfo: Object,
	},
	data: {
		name: '',
		nameSpell: '',
		like: -1,
		avatar: '',
		newsCount: -1,
	},
	ready() {
		let avatarPrefix = app.globalData.config.prefix.avatar;
		let rptInfo = this.data.rptInfo;
		let name = rptInfo.name;
		this.setData({
			name: name.length == 2 ? name.split('').join('　') : name,
			nameSpell: rptInfo.nameSpell,
			like: rptInfo.like,
			avatar: avatarPrefix + rptInfo.avatar,
			newsCount: rptInfo.newsCount,
		});
	},
	methods: {
		tapRptCard() {
			wx.navigateTo({
				url: '/pages/reporter-home/reporter-home?name=' + this.data.name,
			})
		}
	}
})
