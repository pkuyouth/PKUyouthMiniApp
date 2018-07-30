// components/alert-layer/alert-layer.js

'use strict';

Component({

	properties: {
		image: String,
		text: String,
		show: {
			type: Boolean,
			value: false,
			observer(newVal) {
				if (newVal === true) {
					setTimeout(function() {
						this.setData({
							show: false,
						});
					}.bind(this),2000);
				}; // 2s 后自动隐藏
			}
		}
	},

})
