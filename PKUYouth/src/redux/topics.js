/**
 * Created by 兰兆千 on 2017/11/27.
 */
import { createAction, handleActions } from 'redux-actions';
import immutable from 'seamless-immutable';

export const INITIAL_STATE = immutable({
    fetching: false,
    list: []
});

export const REFRESH = 'TOPIC_REFRESH';
export const LOAD = 'TOPIC_LOAD';
export const CLEAR = 'TOPIC_CLEAR';
export const FAILED = 'TOPIC_FAILED';

export const refresh = createAction(REFRESH);
export const load = createAction(LOAD, (topics) => ({topics}));
export const clear = createAction(CLEAR);
export const failed = createAction(FAILED);


export default handleActions({
    [REFRESH]: (state) => state.merge({ fetching: true }),
    [LOAD]: (state, action) => state.merge({fetching: false, list: action.payload.topics})
}, INITIAL_STATE);
