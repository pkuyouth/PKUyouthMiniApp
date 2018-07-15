//index.js
//获取应用实例
//

const requests = require('../../libs/requests.js');
const api = require('../../libs/api.js');
const btnFuncs = require('../../conponents/floating-button/page-funcs.js');
const sort = require('../../libs/sort.js');


Page({
	data: {
		sliderArticles: [],
		colCardData: [
			{
				id: 1,
				cover: 'http://mmbiz.qpic.cn/mmbiz/l9iadYXd83Z5OV4NVbHzf2J9mJkbmsNRGPQSomQIjiabHsTMxhsNdicAnbqgElOxibunfxMMZkykUU8VSNJanMYYzw/0',
				title: '随便看看',
				desc: '随机来一些文章噢',
				navUrl: '/pages/collection-random/collection-random',
			}, {
				id: 2,
				cover: 'http://mmbiz.qpic.cn/mmbiz_jpg/l9iadYXd83Z6JsLCgGD2zhOPcXibzsf2p4mOElxIllPm2paDBg4FG8vFiabyUGKg4qiaXbxtXkSyr72Y2tKSVjmB3Q/0?wx_fmt=jpeg',
				title: '热门推荐',
				desc: '按阅读量排序的文章噢',
				navUrl: '/pages/collection-hot/collection-hot',
			}, {
				id: 3,
				cover: 'http://mmbiz.qpic.cn/mmbiz_jpg/l9iadYXd83Z4XUjqCtXonTcyXL1Qb8SgRo5TPiakMCCKg3MFAAW5Qfc0JoFofxIHO5Gicj8qs5iatHxHfaRRlzIYjQ/0?wx_fmt=jpeg',
				title: '还有更多',
				desc: '还可以做其他的文集',
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
				url: '/pages/reporter-list/reporter-list',
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
			console.log(data);
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
	/*
	tapBtn_1() {
		btnFuncs.feedback.call(this);
	},
	tapBtn_2() {
		sort.newsByReadNum.call(this);
	},
	tapBtn_3() {
		btnFuncs.scrollToUpper.call(this);
	},
	handleTouchStart(event) {
		btnFuncs.handleTouchStart.call(this, event);
	},
	handleTouchEnd(event) {
		btnFuncs.handleTouchEnd.call(this, event);
	}
	 */
})

