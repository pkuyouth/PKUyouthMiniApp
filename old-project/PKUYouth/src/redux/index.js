import { combineReducers } from 'redux';
import configureStore from './createStore';
import rootSaga from '../sagas/';

import loginReducer from './login';
import articleReducer from './articles';
import topicReducer from './topics';

function createStore() {
  const rootReducer = combineReducers({
    login: loginReducer,
    articles: articleReducer,
    topics: topicReducer
  });

  return configureStore(rootReducer, rootSaga);
}

export default createStore();
