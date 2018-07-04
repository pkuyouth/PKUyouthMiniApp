// conponents/search-layer/search-layer.js

Component({
	properties: {
		show: {
			type: Boolean,
			value: true,
			observer(newVal) {
				this.setData({
					display: newVal,
				});
			},
		},
	},
	data: {
		display: true,
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
			let keyword = encodeURIComponent(this.data.keyword);
			wx.navigateTo({
				url: '/pages/search-result/search-result?keyword=' + keyword,
			});
		}
	}
})