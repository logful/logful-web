export const LOGGED_IN = 'LOGGED_IN';
export const LOG_OUT = 'LOG_OUT';

export const SHOW_ERROR = 'SHOW_ERROR';
export const HIDE_ERROR = 'HIDE_ERROR';

export const REFRESH_LAYOUT = 'REFRESH_LAYOUT';
export const SIDEBAR_TYPE_MENU_ADMIN = 1;
export const SIDEBAR_TYPE_MENU_APP = 2;

export const UPDATE_WEEDFS_DIRS = 'UPDATE_WEEDFS_DIRS';
export const UPDATE_WEEDFS_VOLUMES = 'UPDATE_WEEDFS_VOLUMES';
export const UPDATE_WEEDFS_DISK_STATUS = 'UPDATE_WEEDFS_DISK_STATUS';
export const UPDATE_SYSTEM_RESOURCE = 'UPDATE_SYSTEM_RESOURCE';

export const UPDATE_APP_LIST = 'UPDATE_APP_LIST';
export const UPDATE_APP_ITEM = 'UPDATE_APP_ITEM';

export const UPDATE_LOG_FILE_LIST = 'UPDATE_LOG_FILE_LIST';
export const UPDATE_LOG_FILE_ITEM = 'UPDATE_LOG_FILE_ITEM';

export const UPDATE_CLIENT_USER_LIST = 'UPDATE_CLIENT_USER_LIST';

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

export const API_HOST = '127.0.0.1';
export const API_PORT = '8100';
export const API_URI = {
    app: '/api/app',
    logFile: '/api/log/file',
    clientUser: '/api/user',
    weed: {
        dirStatus: '/api/weed/dir/status',
        volumeStatus: '/api/weed/volume/status',
        diskStatus: '/api/weed/volume/stats/disk'
    }
};
