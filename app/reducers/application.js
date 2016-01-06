import {
    UPDATE_APP_LIST,
    UPDATE_APP_ITEM
} from '../constants';
import createReducer from '../utils/createReducer';

const initialState = {
    apps: [],
    app: {},
    editApp: {}
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
    }
};

export default createReducer(initialState, actionHandlers)
