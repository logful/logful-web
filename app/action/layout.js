import {
    REFRESH_LAYOUT,
    SIDEBAR_TYPE_MENU_ADMIN,
    SIDEBAR_TYPE_MENU_APP,
    ADMIN_MENU_DATA
} from '../constants';

export function appMenuData(id) {
    return {
        header: {name: '应用管理页'},
        menus: [
            {
                name: '应用信息',
                icon: 'fa-info-circle',
                route: '/app/' + id + '/info'
            },
            {
                name: '用户管理',
                icon: 'fa-user',
                route: '/app/' + id + '/user'
            },
            {
                name: '文件查看',
                icon: 'fa-book',
                route: '/app/' + id + '/file'
            },
            {
                name: '应用控制',
                icon: 'fa-cloud',
                route: '/app/' + id + '/control'
            }
        ]
    };
}

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
    sidebar.data = appMenuData(option.id);
    return dispatch => {
        dispatch({type: REFRESH_LAYOUT, sidebar: sidebar});
    };
}
