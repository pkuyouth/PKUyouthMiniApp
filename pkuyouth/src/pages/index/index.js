//index.js
//获取应用实例
//

'use strict';

const requests = require('../../libs/requests.js');
const api = require('../../libs/api.js');


Page({
	data: {
		sliderArticles: [],
		colCardData: [],
	},
	onLoad(options) {
		api.login().then((res)=>{
			api.getUserInfo().then((res)=>{});
			this.init_page();
		});
	},
	init_page() {
		wx.showNavigationBarLoading();
		const get_latest_news = requests.post('/get_latest_news',{
			count: 8,
		}).then((data)=>{
			this.setData({
				sliderArticles: data.news,
			});
		});
		const get_col_desc = requests.get('/get_col_desc').then((data)=>{
			this.setData({
				colCardData: data.col_desc, // ?????
			});
		});
		Promise.all([get_latest_news, get_col_desc]).then(()=>{
			wx.hideNavigationBarLoading();
		}).catch(()=>{
			wx.hideNavigationBarLoading();
		});
	},
	init_page_test() {
		/*
		wx.switchTab({
			url: '/pages/column-list/column-list',
		});
		 */

		/*
		wx.navigateTo({
			url: '/pages/blank/blank',
		});
		 */


		/*
		wx.navigateTo({
			url: '/pages/search-keyword-result/search-keyword-result?keyword=' + '嫁给我',
		});
		*/
	}
})

