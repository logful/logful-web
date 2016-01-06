import {
    UPDATE_CLIENT_USER_LIST
} from '../constants';
import createReducer from '../utils/createReducer';

const initialState = {
    users: [],
    user: {}
};

const actionHandlers = {
    UPDATE_CLIENT_USER_LIST: (state, action) => {
        return Object.assign({}, state, {
            users: action.users
        })
    }
};

export default createReducer(initialState, actionHandlers)
