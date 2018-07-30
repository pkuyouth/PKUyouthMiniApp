// pages/about/about.js

'use strict';

Page({

	data: {
        name: '',
        version: '',
    },

    onReady() {
        this.setData(getApp().globalData.config.app_info);
    }

})