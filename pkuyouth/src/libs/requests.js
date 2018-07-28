'use strict';

const tools = require('utilfuncs.js');
const sha224 = require('../vendors/js-sha256.min.js').sha224;


function _updateSessionId(resp) { // 带cookie请求，才能保持session连接
	let cookie = resp.header["Set-Cookie"];
	if (cookie !== undefined) {
		wx.setStorageSync('cookie',cookie);
	};
};


function requests(method="GET") {
	return function(path, data={}) {
		let ApiUrl = "https://rabbitzxh.top/pkuyouth/miniprogram/api";
		var url = tools.urlJoin(ApiUrl, path);
		var cookie = wx.getStorageSync('cookie');
		data.timestamp = new Date().getTime();
		data.token = wx.getStorageSync('token');
		data.signature = sha224(Object.entries(data).sort().join(',').toLowerCase());
		return new Promise( function(resolve, reject) {
			wx.request({
				url: url,
				data: data,
				method: method,
				header: {
					'Content-Type': 'application/json',
					'Cookie': cookie,
				},
				success: (resp) => {
					if (resp.statusCode !== 200) {
						console.error(resp.statusCode);
						reject('XHR error');
					} else if (resp.data.errcode !== 0) {
						console.error('XHR error');
						console.log(resp.data);
						reject(resp.data);
					} else {
						_updateSessionId(resp);
						resolve(resp.data);
					};
				},
				fail: (err) => {
					throw new Error(err);
					reject('XHR error');
				},
			});
		});
	};
};


module.exports = {
	get: requests("GET"),
	post: requests("POST"),
};

