//index.js
//获取应用实例
//

'use strict';

const requests = require('../../libs/requests.js');
const api = require('../../libs/api.js');


Page({
	data: {
		sliderArticles: [],
		colCardData: [
			{
				id: 1,
				cover: 'https://rabbitzxh.top/static/image/miniprogram_api/bg_cover_compressed/26508266021.jpeg',
				title: '随便看看',
				desc: '随意翻翻北青的文章',
				navUrl: '/pages/collection-random/collection-random',
			}, {
				id: 2,
				cover: 'https://rabbitzxh.top/static/image/miniprogram_api/bg_cover_compressed/26508283011.jpeg',
				title: '热文推荐',
				desc: '看看那些阅读量最高的文章',
				navUrl: '/pages/collection-hot/collection-hot',
			}, {
				id: 3,
				cover: 'https://rabbitzxh.top/static/image/miniprogram_api/bg_cover_compressed/26508251861.jpeg',
				title: '还有更多',
				desc: '主编们正在努力整理 ...',
				navUrl: '',
			},
		],
		descByHot: false,
		touch: {start:{X:0, Y:0}, end:{X:0, Y:0}},
		moveAction: '',
	},
	onLoad() {
		let init = function () {

			/*
			wx.switchTab({
				url: '/pages/retrieve/retrieve',
			});
			 */

			/*
			wx.navigateTo({
				url: '/pages/favorite/favorite',
			});
			 */

			/*
			wx.navigateTo({
				url: '/pages/search-keyword-result/search-keyword-result?keyword=' + '嫁给我',
			});
			 */

			this.get_latest_news();

		}.bind(this);

		api.login().then((res)=>{
			api.getUserInfo().then((res)=>{});
			init();
		});
	},
	get_latest_news() {
		wx.showNavigationBarLoading();
		requests.post('/get_latest_news',{
			count: 8,
		}).then((data)=>{
			this.setData({
				sliderArticles: data.news,
			});
			wx.hideNavigationBarLoading();
		}).catch((data)=>{
			wx.hideNavigationBarLoading();
		});
	},
	get_col_info() {
		requests.get('/get_col_info',).then((data)=>{
			console.log(data);
		});
	},
})

