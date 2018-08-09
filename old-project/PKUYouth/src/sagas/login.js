import wx from 'labrador';
import { getStore } from 'labrador-redux';
import { put } from 'redux-saga/effects';
import request from 'al-request';
import { loginSuccess, loginFailure } from '../redux/login';
import { URL_LOGIN } from '../config/urls.js';

// 请求登录
export default function* loginSaga() {
  try {
    let res = yield wx.login();
    let user = yield request.post(URL_LOGIN, {
      code: res.code,
    });
    yield put(loginSuccess({wxCode: res.code, accessToken: user.access_token}));
  } catch (error) {
    console.log('login error', error);
    yield put(loginFailure(error));
  }
}


export function* checkOrLoginSega() {
  let loginState = getStore().getState().login;
  if (loginState.error == null && loginState.wxCode && loginState.accessToken) {

  }
  else {
    yield loginSaga();
    console.log(getStore().getState().login)
  }
}
