import {
    REFRESH_SIDEBAR,
    REFRESH_PAGE,
    ADMIN_MENU_DATA
} from '../constants';
import createReducer from '../utils/createReducer';

const initialState = {
    sidebar: {
        data: ADMIN_MENU_DATA,
        active: 0
    },
    page: {
        title: ''
    }
};

const actionHandlers = {
    REFRESH_SIDEBAR: (state, action) => {
        return Object.assign({}, state, {
            sidebar: action.sidebar
        })
    },
    REFRESH_PAGE: (state, action) => {
        return Object.assign({}, state, {
            page: action.page
        })
    }
};

export default createReducer(initialState, actionHandlers)
