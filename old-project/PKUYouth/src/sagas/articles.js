import wx from 'labrador';
import { getStore } from 'labrador-redux';
import { put } from 'redux-saga/effects';
import request from 'al-request';
import { load, failed } from '../redux/articles';
import { checkOrLoginSega } from './login.js';
import { URL_ARTICLE_REFRESH } from '../config/urls';

// 请求登录
export default function* articleSaga(action) {
  try {
    let from = action.payload.from;
    yield checkOrLoginSega();
    let loginState = getStore().getState().login;
    let data = yield request.get(URL_ARTICLE_REFRESH, {
      code: loginState.accessToken
    });
    yield put(load(from, data.articleVOs.map((v)=>{
      return {
        id: v.id,
        title: v.title,
        image: v.pic_url,
        content: v.desc,
        navurl: "/articles/show?article=" + v.id
      };
    })));
  } catch (error) {
    console.log('login error', error);
    yield put(failed());
  }
}
