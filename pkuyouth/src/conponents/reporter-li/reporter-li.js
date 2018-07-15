// conponents/reporter-li/reporter-li.js
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
		let baseAvatarUrl = "https://rabbitzxh.top/static/image/miniprogram_api/reporter_avatar/";
		let rptInfo = this.data.rptInfo;
		let name = rptInfo.name;
		this.setData({
			name: name.length == 2 ? name.split('').join('　') : name,
			nameSpell: rptInfo.nameSpell,
			like: rptInfo.like,
			avatar: baseAvatarUrl + rptInfo.avatar,
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
