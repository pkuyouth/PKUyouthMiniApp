// components/news-li/news-li.js

'use strict';

const tools = require("../../libs/utilfuncs.js");
const cardFuncs = require('../news-li/page-funcs.js');


Component({
	properties: {
        newsInfo: Object,
	},
	data: {
        newsID: '',
        title: '',
        time: '',
        read_num: -1,
        like_num: -1,
        star: false,
        starTime: -1,
        rank: -1,
        weight: -1,
        cover_url: '',
        sn: '',
        in_use: false,
	},
    ready() { // created 在获得属性之前，如果用 created 则 props 均为 null !
        let newsInfo = this.data.newsInfo;
        this.setData({
            newsID: newsInfo.newsID,
            title: newsInfo.title,
            time: this.fmtTime(newsInfo.time),
            read_num: newsInfo.read_num,
            like_num: newsInfo.like_num,
            rank: newsInfo.rank === undefined ? -1 : newsInfo.rank, // 默认值 -1
            star: newsInfo.star,
            starTime: newsInfo.starTime === undefined ? -1 : newsInfo.starTime,
            weight: newsInfo.weight === undefined ? -1 : newsInfo.weight,
            cover_url: newsInfo.cover_url,
            sn: newsInfo.sn,
            in_use: newsInfo.in_use,
        });
    },
	methods: {
        fmtTime(time) {
            //let [year, month, day] = time.split("-");
            //return year+'年'+month+'月'+day+'日'
            return time.split("-").join(" / ")
        },
        tapStar() {
            cardFuncs.handleTapStar.call(this);
        },
        tapRecommend() {
            cardFuncs.handleTapRecommend.call(this);
        },
        tapNavigate() {
            cardFuncs.handleTapNavigate.call(this);
        },
	}
})
