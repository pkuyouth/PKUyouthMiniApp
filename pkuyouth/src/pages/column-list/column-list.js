// pages/column/column.js

'use strict';

const requests = require("../../libs/requests.js");
const btnFuncs = require("../../components/floating-button/page-funcs.js");


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
	/*
	tapBtn_1() {
		btnFuncs.feedback.call(this);
	},
	handleTouchStart(event) {
		btnFuncs.handleTouchStart.call(this, event);
	},
	handleTouchEnd(event) {
		btnFuncs.handleTouchEnd.call(this, event);
	},
	 */
})