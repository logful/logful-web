import {
    REFRESH_LAYOUT,
    ADMIN_MENU_DATA
} from '../constants';
import createReducer from '../utils/createReducer';

const initialState = {
    sidebar: {
        data: ADMIN_MENU_DATA,
        active: 0
    }
};

const actionHandlers = {
    REFRESH_LAYOUT: (state, action) => {
        return Object.assign({}, state, {
            sidebar: action.sidebar
        })
    }
};

export default createReducer(initialState, actionHandlers)
