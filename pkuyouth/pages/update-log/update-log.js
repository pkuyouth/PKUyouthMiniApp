// pages/update-log/update-log.js

'use strict';

const requests = require('../../libs/requests.js');

Page({

	data: {
		logInfo: [],
	},
	onLoad() {
        requests.get("/get_update_log").then((data)=>{
            this.setData({
                logInfo: data.log,
            });
        });
	},

})