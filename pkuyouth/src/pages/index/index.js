//index.js
//获取应用实例
//

const requests = require('../../libs/requests.js');
const api = require('../../libs/api.js');

const app = getApp();

Page({
	data: {
		articlesList: [],
		touch: {start:{X:0, Y:0}, end:{X:0, Y:0}},
		moveAction: '',
	},
	onLoad() {
		let init = function () {
			/*
			wx.switchTab({
				url: '/pages/user/user',
			});
			 */		
			/*
			wx.navigateTo({
				url: '/pages/favorite/favorite',
			});
			 */
			/*
			wx.navigateTo({
				url: '/pages/search-result/search-result?keyword=' + '嫁给我',
			});			
			 */

			this.get_random();
		
		}.bind(this);

		api.login().then((res)=>{
			api.getUserInfo().then((res)=>{});
			init();
		});

	},
	onReachBottom() {
		this.get_random();
	},
	get_random() {
		wx.showNavigationBarLoading();
		requests.post('/get_random',{
			count: 5,
		}).then((data)=>{
			this.setData({
				articlesList: this.data.articlesList.concat(data.news)
			});
			wx.hideNavigationBarLoading();
		}).catch((data)=>{
			wx.hideNavigationBarLoading();
		})
	},
	tapBtn_1() {
		wx.navigateTo({
			url: '/pages/feedback/feedback',
		});
	},
	tapBtn_2() {
		this.get_random();
	},
	tapBtn_3() {
		wx.pageScrollTo({
			scrollTop: 0,
			duration: 500,
		});
	},
	handleTouchStart(event) {
		this.setData({
			'touch.start.X': event.changedTouches[0].pageX,
			'touch.start.Y': event.changedTouches[0].pageY,				
		});
	},
	handleTouchEnd(event) {
		this.setData({
			'touch.end.X': event.changedTouches[0].pageX,
			'touch.end.Y': event.changedTouches[0].pageY,		
		});	
		let dx = this.data.touch.end.X - this.data.touch.start.X;
		let dy = this.data.touch.end.Y - this.data.touch.start.Y;
		if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
			this.setData({ // 至少滑动 50 px 。如果是 tap 则 dx == dy == 0
				moveAction: dx > 0 ? 'right' : 'left'
			});
		} else {
			this.setData({
				moveAction: ''
			});
		}
	}
})
