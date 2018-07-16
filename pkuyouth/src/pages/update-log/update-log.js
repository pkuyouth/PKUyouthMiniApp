// pages/update-log/update-log.js

'use strict';

const requests = require('../../libs/requests.js');

Page({

	data: {
		log: [],
	},
	onLoad() {
        requests.get("/get_update_log").then((data)=>{
            this.setData({
                log: data.log,
            });
        });
	},

})