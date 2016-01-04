export const LOGGED_IN = 'LOGGED_IN';
export const LOG_OUT = 'LOG_OUT';

export const FETCH_APP_LIST = 'FETCH_APP_LIST';

export const SHOW_ERROR = 'SHOW_ERROR';
export const HIDE_ERROR = 'HIDE_ERROR';

export const REFRESH_LAYOUT = 'REFRESH_LAYOUT';
export const SIDEBAR_TYPE_MENU_ADMIN = 1;
export const SIDEBAR_TYPE_MENU_APP = 2;

export const ADMIN_MENU_DATA = {
    header: {name: '系统管理页'},
    menus: [
        {
            name: '应用管理',
            icon: 'fa-cubes',
            route: '/'
        },
        {
            name: '系统状态',
            icon: 'fa-dashboard',
            route: '/system'
        }
    ]
};

export const APP_MENU_DATA = [];

export const API_HOST = '127.0.0.1';
export const API_PORT = '8100';
export const API_URI = {
    app: '/api/app'
};