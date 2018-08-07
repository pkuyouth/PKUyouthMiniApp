// pages/column/column.js

'use strict';

const requests = require("../../libs/requests.js");

Page({
	data: {
		columnsInfo: [],
		touch: {start:{X:0, Y:0}, end:{X:0, Y:0}},
		moveAction: '',
	},
	onLoad() {
		requests.get("/get_column_list").then((data)=>{
			this.setData({
				columnsInfo: data.columns,
			})
		});
	},
})