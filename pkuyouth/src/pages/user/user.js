// pages/user/user.js

const app = getApp();

Page({

	data: {
		userInfo: {},
		hasUserInfo: false,
		canIUse: wx.canIUse('button.open-type.getUserInfo'),
	},
	onLoad: function () {
		if (app.globalData.userInfo) {
			//console.log(app.globalData.userInfo)
			this.setData({
				userInfo: app.globalData.userInfo,
				hasUserInfo: true
			})
		} else if (this.data.canIUse){
			// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
			// 所以此处加入 callback 以防止这种情况
			app.userInfoReadyCallback = (resp) => {
				//console.log(resp.userInfo)
				this.setData({
					userInfo: resp.userInfo,
					hasUserInfo: true
				})
			}
		} else {
			// 在没有 open-type=getUserInfo 版本的兼容处理
			wx.getUserInfo({
				success: (resp) => {
					app.globalData.userInfo = resp.userInfo
					this.setData({
						userInfo: resp.userInfo,
						hasUserInfo: true
					})
				}
			})
		}
	},
	getUserInfo: function(e) {
		//console.log(e)
		app.globalData.userInfo = e.detail.userInfo
		this.setData({
			userInfo: e.detail.userInfo,
			hasUserInfo: true
		});
	},
	logout() {
		this.setData({
			hasUserInfo: false,
		});
	},

})
