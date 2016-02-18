import {
    UPDATE_APP_LIST,
    UPDATE_APP_ITEM,
    UPDATE_APP_STATISTIC
} from '../constants';
import createReducer from '../utils/createReducer';

const initialState = {
    apps: [],
    app: {},
    statistic: {}
};

const actionHandlers = {
    UPDATE_APP_LIST: (state, action) => {
        return Object.assign({}, state, {
            apps: action.apps
        })
    },
    UPDATE_APP_ITEM: (state, action) => {
        return Object.assign({}, state, {
            app: action.app
        })
    },
    UPDATE_APP_STATISTIC: (state, action) => {
        return Object.assign({}, state, {
            statistic: action.statistic
        })
    }
};

export default createReducer(initialState, actionHandlers)
