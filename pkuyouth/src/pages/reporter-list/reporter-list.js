// pages/reporter-home/reporter-home.js

'use strict';

const requests = require('../../libs/requests.js');
const btnFuncs = require('../../components/floating-button/page-funcs.js');
const sort = require('../../libs/sort.js');

Page({

	data: {
        page: 1,
        onGetRptList: false,
        entirelyGet: false,
        rptsInfoList: [],
        touch: {start:{X:0, Y:0}, end:{X:0, Y:0}},
        moveAction: '',
        descBySpell: false,
        descBynewsCount: false,
	},

	onLoad() {
        this.get_rpt_list();
	},
     onReachBottom() {
        if (this.data.entirelyGet === true) {
            this.setData({ // 触发
                entirelyGet: true,
            });
        } else {
            this.get_rpt_list();
        };
    },
    get_rpt_list() {
        if (this.data.onGetRptList || this.data.entirelyGet) return;
        this.setData({
            onGetRptList: true,
        });
        wx.showNavigationBarLoading();
        requests.post('/get_reporter_list',{
            page: this.data.page,
            limit: 50,
        }).then((data)=>{
            console.log(data);
            this.setData({
                rptsInfoList: this.data.rptsInfoList.concat(data.reporters),
                page: this.data.page + 1,
                onGetRptList: false,
            });
            wx.hideNavigationBarLoading();
            if (!data.reporters.length) {
                this.setData({
                    entirelyGet: true,
                });
            };
        }).catch((data)=>{
            this.setData({
                onGetRptList: false,
            });
            wx.hideNavigationBarLoading();
        })
    },
    tapBtn_1() {
        btnFuncs.feedback.call(this);
    },
    tapBtn_2() { // 按姓氏拼写
        sort.rptByNameSpell.call(this);
    },
    tapBtn_3() { // 按文章数量
        sort.rptByNewsCount.call(this);
    },
    tapBtn_4() {
        btnFuncs.scrollToUpper.call(this);
    },
    handleTouchStart(event) {
        btnFuncs.handleTouchStart.call(this, event);
    },
    handleTouchEnd(event) {
        btnFuncs.handleTouchEnd.call(this, event);
    },

})