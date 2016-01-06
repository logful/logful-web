import {
    UPDATE_WEEDFS_DIRS,
    UPDATE_WEEDFS_VOLUMES,
    UPDATE_WEEDFS_DISK_STATUS,
    UPDATE_SYSTEM_RESOURCE
} from '../constants';
import createReducer from '../utils/createReducer';

const initialState = {
    resource: {},
    dirs: {},
    volumes: {},
    diskStatus: {}
};

const actionHandlers = {
    UPDATE_WEEDFS_DIRS: (state, action) => {
        return Object.assign({}, state, {
            dirs: action.dirs
        })
    },
    UPDATE_WEEDFS_VOLUMES: (state, action) => {
        return Object.assign({}, state, {
            volumes: action.volumes
        })
    },
    UPDATE_WEEDFS_DISK_STATUS: (state, action) => {
        return Object.assign({}, state, {
            diskStatus: action.diskStatus
        })
    },
    UPDATE_SYSTEM_RESOURCE: (state, action) => {
        return Object.assign({}, state, {
            resource: action.resource
        })
    }
};

export default createReducer(initialState, actionHandlers)
