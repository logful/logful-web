import {
    UPDATE_CRASH_FILE_LIST,
    UPDATE_CRASH_FILE_ITEM
} from '../constants';
import createReducer from '../utils/createReducer';

const initialState = {
    files: [],
    file: {}
};

const actionHandlers = {
    UPDATE_CRASH_FILE_LIST: (state, action) => {
        return Object.assign({}, state, {
            files: action.files
        })
    },
    UPDATE_CRASH_FILE_ITEM: (state, action) => {
        return Object.assign({}, state, {
            file: action.file
        })
    }
};

export default createReducer(initialState, actionHandlers)
