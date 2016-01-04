import {
    FETCH_APP_LIST
} from '../constants';
import createReducer from '../utils/createReducer';

const initialState = {
    apps: []
};

const actionHandlers = {
    FETCH_APP_LIST: (state, action) => {
        switch (action.type) {
            case FETCH_APP_LIST:
                return Object.assign({}, state, {
                    apps: action.apps
                })
        }
        return state;
    }
};

export default createReducer(initialState, actionHandlers)
