import * as storage from '../persistence/storage';
import {
    UPDATE_NOTIFICATION
} from '../constants';
import createReducer from '../utils/createReducer';

const initialState = {
    message: {}
};

const actionHandlers = {
    UPDATE_NOTIFICATION: (state, action) => {
        return Object.assign({}, state, {
            message: action.message
        })
    }
};

export default createReducer(initialState, actionHandlers)
