// components/news-slide-item/news-slide-item.js

'use strict';

const utils = require('../../libs/utilfuncs.js');
const cardFuncs = require('../news-li/page-funcs.js');


Component({

	properties: {
		newsInfo: Object,
	},

	data: {
		newsID: '',
		title: '',
		digest: '',
		time: '',
		cover_url: '',
        sn: '',
	},
	ready() {
		let newsInfo = this.data.newsInfo;
		this.setData({
			newsID: newsInfo.newsID,
			title: newsInfo.title,
			digest: this.fmtDigest(newsInfo.digest),
			time: this.fmtTime(newsInfo.time),
			cover_url: newsInfo.cover_url,
			sn: newsInfo.sn,
		});
	},
	methods: {
        fmtTime(time) {
            let [year, month, day] = time.split("-");
            return year+'年'+month+'月'+day+'日'
        },
        fmtDigest(digest) {
        	if (digest.length < 44) { // (750 - 40 * 2) / 28
        		return digest;
        	} else {
        		return digest.substring(0, 44) + '……';
        	}
        },
        tapNavigate() {
            cardFuncs.handleTapNavigate.call(this);
        },
	}
})
