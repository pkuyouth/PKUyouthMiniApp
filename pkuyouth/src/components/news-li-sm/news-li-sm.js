// components/news-li-sm/news-li-sm.js

'use strict';

const utils = require("../../libs/utilfuncs.js");
const cardFuncs = require('../news-li/page-funcs.js');

const app = getApp();

Component({

	properties: {
        newsInfo: Object,
	},

	data: {
        newsID: '',
        title: '',
        time: '',
        star: false,
        starTime: -1,
        rank: -1,
        weight: -1,
        cover_url: '',
        cover_url_sm: '',
        sn: '',
        in_use: false,
	},
    ready() { // created 在获得属性之前，如果用 created 则 props 均为 null !
        let newsInfo = this.data.newsInfo;
        this.setData({
            newsID: newsInfo.newsID,
            title: newsInfo.title,
            time: newsInfo.time,
            rank: newsInfo.rank === undefined ? -1 : newsInfo.rank, // 默认值 -1
            star: newsInfo.star,
            starTime: newsInfo.starTime === undefined ? -1 : newsInfo.starTime,
            weight: newsInfo.weight === undefined ? -1 : newsInfo.weight,
            cover_url: newsInfo.cover_url,
            cover_url_sm: app.globalData.config.prefix.sm_cover + newsInfo.newsID + '.jpeg',
            sn: newsInfo.sn,
            in_use: newsInfo.in_use,
        });
    },
	methods: {
        tapStar() {
            cardFuncs.handleTapStar.call(this);
        },
        tapRecommend() {
            cardFuncs.handleTapRecommend.call(this);
        },
        tapNavigate() {
        	cardFuncs.handleTapNavigate.call(this);
        }
	}
})
