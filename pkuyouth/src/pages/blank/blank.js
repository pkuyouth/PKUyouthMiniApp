// pages/blank/blank.js

'use strict';

const app = getApp();


Page({

	data:{
		imgOnShow: '',

	},
	move: function(e) {
		console.log(e.touches[0]);
	},
	onLoad(options) {
		this.setData({
			imgOnShow: '',
		});
		this.drawCard();
	},
	tapImg() {
		wx.previewImage({
			current: this.data.imgOnShow,
			urls: [
				this.data.imgOnShow,
				'https://rabbitzxh.top/pkuyouth/miniprogram/api/static/image/bg_cover_compressed/26508283011.jpeg',
			],
		});
	},
	drawCard() {

		const windowWidth = app.globalData.systemInfo.windowWidth,
		      windowHeight = app.globalData.systemInfo.windowHeight,
		      wDef = 375,
		      hDef = 555,
		      wF = windowWidth / wDef,
		      hF = windowHeight / hDef;

		const background = '../../images/Recruit_background.jpg';
		const qr_code = app.globalData.config.qr_code.recruit;

		const ctx = wx.createCanvasContext('recruit-card');
		ctx.setFillStyle('white');
		ctx.fillRect(0, 0, windowWidth, windowHeight);
		ctx.drawImage(background, 0, 0, windowWidth, windowHeight);

		let dx = 130,
			dy = 90;
		ctx.drawImage(qr_code, dx*wF, dy*hF, (wDef-dx*2)*wF, (wDef-dx*2)*wF);

		ctx.draw();

	}
})
