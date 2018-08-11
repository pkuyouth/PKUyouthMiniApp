// pages/recruit/recruit.js

'use strict';

const app = getApp();

var screenWidth = app.globalData.systemInfo.screenWidth,
	screenHeight = app.globalData.systemInfo.screenHeight,//.windowHeight,
	wDef = 375,
	hDef = 667,///555,
	wF = screenWidth / wDef,
	hF = screenHeight / hDef,
	qrcodeX = 125 * wF,
	qrcodeY = 120 * hF,
	qrcodeW = screenWidth - qrcodeX * 2,
	qrcodeH = qrcodeW,
	wordX = 100 * wF,
	wordY = 55 * hF;

Page({

	data:{
		drawDone: false,
		backgroundImg: '../../images/Recruit_background.png',
		backgroundWord: '../../images/Recruit_word.png',
		qrcodeTemp: '',
	},
	onLoad() {
		wx.downloadFile({
			url: app.globalData.config.qr_code.recruit,
			success: function(res) {
				this.setData({
					qrcodeTemp: res.tempFilePath,
				});
				wx.getImageInfo({
					src: this.data.backgroundImg,
					success: function(res) {
						if (qrcodeY + qrcodeH + screenWidth / res.width * res.height <= screenHeight) {
							var bgW = screenWidth,
							  	bgH = screenWidth / res.width * res.height,
							  	bgX = 0,
							  	bgY = screenHeight - bgH;
						} else {
							var bgH = screenHeight - qrcodeY - qrcodeH,
								bgW = bgH / res.height * res.width,
								bgX = (screenWidth - bgW) / 2,
								bgY = qrcodeY + qrcodeH;
						};
						wx.getImageInfo({
							src: this.data.backgroundWord,
							success: function(res) {
								var wordW = screenWidth - wordX * 2,
									wordH = wordW / res.width * res.height;

								const ctx = wx.createCanvasContext('recruit-card');

								ctx.setFillStyle('white');
								ctx.fillRect(0, 0, screenWidth, screenHeight);

								ctx.drawImage(this.data.backgroundImg, bgX, bgY, bgW, bgH);
								ctx.drawImage(this.data.qrcodeTemp, qrcodeX, qrcodeY, qrcodeW, qrcodeH);
								ctx.drawImage(this.data.backgroundWord, wordX, wordY, wordW, wordH);

								ctx.draw();

								setTimeout(function() {
									this.setData({
										drawDone: true,
									});
								}.bind(this), 500);

							}.bind(this)
						});
					}.bind(this)
				});
			}.bind(this)
		});
	},
	/*handleTouchmove: function(e) {
		console.log(e.touches[0]);
	},*/
	previewQRcode(e) {
		let x = e.touches[0].pageX,
			y = e.touches[0].pageY;

		if (qrcodeX <= x && x <= qrcodeX + qrcodeW &&
			qrcodeY <= y && y <= qrcodeY + qrcodeH) {
			wx.previewImage({
				current: this.data.qrcodeTemp,
				urls: [
					this.data.qrcodeTemp,
				],
			});
		};
	}
})
