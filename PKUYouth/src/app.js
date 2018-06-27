import request from 'al-request';
import { setStore } from 'labrador-redux';
import { sleep } from './utils/utils';
import store from './redux';
import { login } from './redux/login';

if (__DEV__) {
  console.log('当前为开发环境');
}

// 向labrador-redux注册store
setStore(store);

export default class {
  async onLaunch() {
  }

  async timer() {
    while (true) {
      console.log('hello');
      await sleep(10000);
    }
  }
}
