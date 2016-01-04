import {
    FETCH_APP_LIST
} from '../constants';
import createReducer from '../utils/createReducer';

const initialState = {
    apps: []
};

const actionHandlers = {
    FETCH_APP_LIST: (state, action) => {
        console.log('re-state', state);
        console.log('re-action', action);
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
