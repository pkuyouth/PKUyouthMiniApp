import { Provider } from './vendors/weapp-redux.js';
import { sizeof } from './libs/utils.js';
import './libs/request.js';

import { store } from './redux/store.js';

let appConfig = {
    onLaunch: function() {
        this.refreshSession();
    },
    onShow: function () {

    },
    onHide: function() {
        let state = store.getState(),
            cacheEntities = {};

        // 体积大于2M，直接清空
        if (sizeof(state.entities) <= 2 * 1024 * 1024) {
            cacheEntities = state.entities;
        }

        wx.setStorageSync('entities', cacheEntities);
    },
    globalData: {
        access_token: "",
        wx_code: ""
    },
    refreshSession: function(){
        var app = this;
        var loginProc = function() {
            wx.login({
                success: function(res) {
                    if (res.code) {
                        //发起网络请求
                        wx.request({
                            url: 'https://www.pkuyouth.top/pkuyouth/login',
                            method: "POST",
                            data: JSON.stringify({
                                code: res.code
                            }),
                            success: function(data) {
                                console.log("we are good");
                                app.globalData.access_token = data.access_token;
                                app.globalData.wx_code = res.code;
                            }
                        })
                    } else {
                        console.log('获取用户登录态失败！' + res.errMsg)
                    }
                }
            });
        };
        if (app.globalData.access_token == "" || app.globalData.wx_code == "") {
            loginProc();
        }
        else {
            wx.checkSession({
                success: function(){
                },
                fail: function(){
                    loginProc();
                }
            });
        }
    }
};

App(Provider(store)(appConfig));
