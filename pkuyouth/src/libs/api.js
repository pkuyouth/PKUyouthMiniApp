'use strict';

const requests = require('requests.js');

const app = getApp();


function setStorage(key, value, async=true) { // wx.setStorage | wx.setStorageSync
	if (async) {
		return new Promise((resolve,reject)=>{
			wx.setStorage({
				key: key,
				data: value,
				success: function(res) {
					resolve(res);
				},
				fail: function(res) {
					reject(res);
				},
			});
		});
	} else {
		try {
			wx.setStorageSync(key, value);
		} catch(e) {
			throw new Error(e);
		};
	};
};

function getStorage(key, async=false) { // wx.getStorage | wx.getStorageSync
	if (async) {
		return new Promise((resolve,reject)=>{
			wx.getStorage({
				key: key,
				success: (res) => {
					resolve(res.data);
				},
				fail: (res) => {
					reject(res);
				},
			});
		});
	} else {
		try {
			let value = wx.getStorageSync(key);
			return value;
		} catch(e) {
			throw new Error(e);
			return null;
		};
	};
};

function login() {
	return new Promise((resolve,reject)=>{
		wx.login({
			success: (resp)=>{
				if (resp.code) {
					requests.post('/login',{
						js_code: resp.code,
					}).then((data)=>{
						setStorage("token", data.token, false);
						app.globalData.config = data.config;
						resolve();
					});
				} else {
					console.log('登录失败！' + resp.errMsg);
					reject();
				};
			}
		});
	});
	/*
	return new Promise((resolve, reject)=>{
		wx.checkSession({
			success: (res) => {
				resolve();
			},
			fail: (res) => {
				// ...
			}
		});
	});
	 */
};


function getUserInfo() {
	return new Promise((resolve,reject)=>{
		wx.getSetting({
			success: (res) => {
				if (res.authSetting['scope.userInfo']) {
					// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
					wx.getUserInfo({
						success: (res) => {
							// 可以将 res 发送给后台解码出 unionId
							app.globalData.userInfo = res.userInfo

							// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
							// 所以此处加入 callback 以防止这种情况
							if (app.userInfoReadyCallback) {
								app.userInfoReadyCallback(res)
							};
							resolve(res);
						},
						fail: (res) => {
							reject(res);
						}
					});
				} else {
					resolve(res);
				};
			},
			fail: (res) => {
				reject(res);
			}
		});
	});
}


module.exports = {
	setStorage: setStorage,
	getStorage: getStorage,
	login: login,
	getUserInfo: getUserInfo,
}