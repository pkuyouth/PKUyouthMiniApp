'use strict';

// const utils = require('utilfuncs.js');
const b = require('../vendors/s.js').b_.c_; // hmac_sha224


function _updateSessionId(resp) { // 带cookie请求，才能保持session连接
	let cookie = resp.header["Set-Cookie"];
	if (cookie !== undefined) {
		wx.setStorageSync('cookie',cookie);
	};
};


function requests(method="GET") {
	return function(path, data={}) {
		let ApiUrl = "https://rabbitzxh.top/pkuyouth/miniprogram/api";
		let url = ApiUrl + path; // utils.urlJoin(ApiUrl, path);
		let cookie = wx.getStorageSync('cookie');
		data.a = parseInt(new Date().getTime(),10).toString(16); // timestamp 变成 16进制
		data.b = wx.getStorageSync('b'); // token
		data.c = b(data.b, Object.entries(data).sort().join(',').toLowerCase()); // signature
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

