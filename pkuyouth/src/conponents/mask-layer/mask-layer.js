// conponents/mask-layer/mask-layer.js
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
	},
	methods: {
		shield() {
			console.log('shield !');
		},
	}
})
