import {
    REFRESH_SIDEBAR,
    SIDEBAR_TYPE_MENU_ADMIN,
    SIDEBAR_TYPE_MENU_APP,
    REFRESH_PAGE,
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
            }, {
                name: '用户管理',
                icon: 'fa-user',
                route: '/app/' + id + '/user'
            }, {
                name: '日志文件',
                icon: 'fa-file',
                route: '/app/' + id + '/log'
            }, {
                name: '崩溃分析',
                icon: 'fa-bug',
                route: '/app/' + id + '/crash'
            }, {
                name: '应用控制',
                icon: 'fa-cloud',
                route: '/app/' + id + '/control'
            }, {
                name: '返回',
                icon: 'fa-angle-double-left',
                route: '/'
            }
        ]
    };
}

export function adminSidebar(option) {
    let sidebar = {};
    sidebar.active = option.active;
    sidebar.data = ADMIN_MENU_DATA;
    return dispatch => {
        dispatch({type: REFRESH_SIDEBAR, sidebar: sidebar});
    };
}

export function appSidebar(option) {
    let sidebar = {};
    sidebar.active = option.active;
    sidebar.data = appMenuData(option.id);
    return dispatch => {
        dispatch({type: REFRESH_SIDEBAR, sidebar: sidebar});
    };
}

export function refreshPage(option) {
    return dispatch => {
        dispatch({
            type: REFRESH_PAGE,
            page: {
                title: option.title
            }
        });
    };
}
