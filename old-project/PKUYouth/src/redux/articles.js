/**
 * Created by 兰兆千 on 2017/11/27.
 */
import { createAction, handleActions } from 'redux-actions';
import immutable from 'seamless-immutable';

export const FROM_RECOMMADATION = 'recommadation';
export const FROM_SEARCH = 'search';
export const FROM_FAVORITE = 'favorite';

export const INITIAL_STATE = immutable({
    fetching: false,
    from: null,
    list: {
        [FROM_RECOMMADATION]: [],
        [FROM_SEARCH]: [],
        [FROM_FAVORITE]: [],
    }
});

export const REFRESH = 'ARTICLE_REFRESH';
export const LOAD = 'ARTICLE_LOAD';
export const CLEAR = 'ARTICLE_CLEAR';
export const FAILED = 'ARTICLE_FAILED';

export const refresh = createAction(REFRESH, (from) => ({from}));
export const load = createAction(LOAD, (from, article) => ({from, article}));
export const clear = createAction(CLEAR);
export const failed = createAction(FAILED);


export default handleActions({
    [REFRESH]: (state, action) => state.merge({ fetching: true, from: action.payload.from }),
    [LOAD]: (state, action) => state.merge({fetching: false, from: null}).setIn(['list', action.payload.from], action.payload.article)
}, INITIAL_STATE);
