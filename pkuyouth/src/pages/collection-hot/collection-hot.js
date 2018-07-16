// pages/collection-hot/collection-hot.js

'use strict';

const requests = require('../../libs/requests.js');
const btnFuncs = require('../../components/floating-button/page-funcs.js');

Page({
	data: {
        page: 1,
        onGetHot: false,
		articlesList: [],
	},
	onLoad(options) {
        this.get_hot();
	},
    get_hot() {
        if (this.data.onGetHot) return;
        this.setData({
            onGetHot: true,
        });
        wx.showNavigationBarLoading();
        requests.post('/get_col_hot',{
            page: this.data.page,
            limit: 5,
        }).then((data)=>{
            this.setData({
                articlesList: this.data.articlesList.concat(data.news),
                page: this.data.page + 1,
                onGetHot: false,
            });
            wx.hideNavigationBarLoading();
        }).catch((data)=>{
            this.setData({
                onSearch: false,
            });
            wx.hideNavigationBarLoading();
        });
    },
    onReachBottom() {
        this.get_hot();
    },
    tapBtn_1() {
        btnFuncs.feedback.call(this);
    },
    tapBtn_2() {
        btnFuncs.scrollToUpper.call(this);
    },
    handleTouchStart(event) {
        btnFuncs.handleTouchStart.call(this, event);
    },
    handleTouchEnd(event) {
        btnFuncs.handleTouchEnd.call(this, event);
    },
})