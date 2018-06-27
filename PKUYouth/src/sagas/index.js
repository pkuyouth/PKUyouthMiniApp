import { takeLatest, takeEvery } from 'redux-saga';
import { STARTUP } from '../redux/startup';
import { LOGIN } from '../redux/login';
import { REFRESH as REFRESH_ARTICLE } from '../redux/articles';
import { REFRESH as REFRESH_TOPIC } from '../redux/topics';
import startup from './startup';
import login from './login';
import article from './articles';
import topic from './topics';

// 当action触发时，执行特定saga
export default function* root() {
  yield [
    takeLatest(STARTUP, startup),
    takeLatest(LOGIN, login),
    takeEvery(REFRESH_ARTICLE, article),
    takeLatest(REFRESH_TOPIC, topic)
  ];
}
