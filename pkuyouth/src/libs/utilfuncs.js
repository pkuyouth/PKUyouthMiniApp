'use strict';


String.prototype.trim = function (char, type) {
	if (char) {
		if (type == 'left') {
			return this.replace(new RegExp('^\\'+char+'+', 'g'), '');
		} else if (type == 'right') {
			return this.replace(new RegExp('\\'+char+'+$', 'g'), '');
		}
		return this.replace(new RegExp('^\\'+char+'+|\\'+char+'+$', 'g'), '');
	}
	return this.replace(/^\s+|\s+$/g, '');
};


function urlJoin() {

	var urlArray = [];
	var queryArray = [];

	for (let i = 0; i < arguments.length; i++) {
		let arg = arguments[i];
		if (typeof arg == "string") {
			urlArray.push(arg.trim('/'));
		} else if (typeof arg == "object") {
			for (var name in arg) {
				queryArray.push(name + "=" + arg[name]);
			}
		} else {
			continue
		}
	};

	if (!queryArray.length) {
		return urlArray.join('/')
	} else {
		return urlArray.join('/') + "?" + queryArray.join("&")
	}
};


function parseQuery(url) {

	var querys = {};

	let args = url.match(/[^&=?]+=[^&]*/g);

	for (let i = 0; i < args.length; i++) {
		let arg = args[i].split("#",1)[0]; // 去掉重定向;
		let name = arg.substring(0, arg.indexOf("="));
		let query = arg.substring(arg.indexOf("=")+1);
		querys[name] = query;
	}

	return querys
};


function alertNoInput() {
	wx.showToast({
		title: "输入内容不得为空",
		icon: 'none',
		duration: 1000,
	});
};


module.exports = {
	urlJoin: urlJoin,
	//parseQuery: parseQuery,
	alertNoInput: alertNoInput,
};