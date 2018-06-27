import wx from 'labrador';
import { getStore } from 'labrador-redux';
import { put } from 'redux-saga/effects';
import request from 'al-request';
import { load, failed } from '../redux/topics';
import { checkOrLoginSega } from './login.js';
import { URL_TOPIC_REFRESH } from '../config/urls';

// 请求登录
export default function* topicSaga(action) {
  try {
    yield checkOrLoginSega();
    let loginState = getStore().getState().login;
    let data = yield request.get(URL_TOPIC_REFRESH, {
      code: loginState.accessToken
    });
    yield put(load(data.map((v)=>{
      return {
        id: v.name,
        title: v.name,
        image: v.img,
        content: '',
        'navurl': '/pages/search/index?mode=subject&subject='+v.name
      };
    })));
  } catch (error) {
    console.log('login error', error);
    yield put(failed());
  }
}
