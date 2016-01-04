import * as storage from '../persistence/storage';
import {
    LOGGED_IN ,
    LOG_OUT
} from '../constants';
import createReducer from '../utils/createReducer';

const initialState = {
    error: null,
    token: storage.get('token')
};

const actionHandlers = {
    LOGGED_IN: (state, action) => {
        return state;
    },
    LOG_OUT: (state, action) => {
        return state;
    }
};

export default createReducer(initialState, actionHandlers)
