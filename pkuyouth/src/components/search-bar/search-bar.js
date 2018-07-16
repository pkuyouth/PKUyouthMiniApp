// components/search-layer/search-layer.js

'use strict';

Component({
	properties: {
		show: {
			type: Boolean,
			value: true,
		},
		range: { // 搜索范围
			type: String,
			value: 'all',
		},
		placeholder: { // 搜索栏的提示语
			type: String,
			value: "搜索题目｜作者｜内容",
		},
		notFound: { // 无搜索结果的标语
			type: String,
			value: "你好像发现了北青未涉及的领地～",
		},
	},
	data: {
		keyword: "",
	},
	methods: {
		keywordInput(event) {
			this.setData({
				keyword: event.detail.value,
			});
		},
		tapConfirm(event) {
			this.searchSubmit();
		},
		searchSubmit() {
			let [keyword, range, notFound] = Array.from(
				[this.data.keyword, this.data.range, this.data.notFound], x => encodeURIComponent(x));
			wx.navigateTo({
				url: `/pages/search-result/search-result?keyword=${keyword}&range=${range}&notfound=${notFound}`,
			});
		}
	}
})