// conponents/column-li/column-li.js
Component({

	properties: {
		columnInfo: Object,
	},
	data: {
		id: 0,
		title: "",
		cover: "",
	},
	ready() {
		let columnInfo = this.data.columnInfo;
		this.setData({
			id: columnInfo.id,
			title: columnInfo.title,
			cover: columnInfo.cover,
		});
	},
	methods: {

	}
})
