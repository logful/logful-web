import {
    REFRESH_LAYOUT,
    SIDEBAR_TYPE_MENU_ADMIN,
    SIDEBAR_TYPE_MENU_APP,
    ADMIN_MENU_DATA,
    APP_MENU_DATA
} from '../constants';

export function adminSidebar(option) {
    let sidebar = {};
    sidebar.active = option.active;
    sidebar.data = ADMIN_MENU_DATA;
    return dispatch => {
        dispatch({type: REFRESH_LAYOUT, sidebar: sidebar});
    };
}

export function appSidebar(option) {
    let sidebar = {};
    sidebar.active = option.active;
    sidebar.data = APP_MENU_DATA;
    return dispatch => {
        dispatch({type: REFRESH_LAYOUT, sidebar: sidebar});
    };
}
