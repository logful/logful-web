import 'whatwg-fetch';
import * as URLHelper from '../helpers/urls';
import { API_URI } from '../constants';
import parseResponse from '../helpers/parseResponse';
import handleActionError from '../helpers/handleActionError';
import {
    UPDATE_WEEDFS_DIRS,
    UPDATE_WEEDFS_VOLUMES,
    UPDATE_WEEDFS_DISK_STATUS,
    UPDATE_SYSTEM_RESOURCE
} from '../constants';
import { defaultHeaders } from '../root';

export function fetchWeedFSDirs(option) {
    return dispatch => {
        fetch(URLHelper.formatUrl(API_URI.weed.dirStatus), {
            headers: defaultHeaders()
        }).then(parseResponse)
            .then(res => dispatch({
                type: UPDATE_WEEDFS_DIRS,
                dirs: res
            }))
            .catch(error => handleActionError(dispatch, error, UPDATE_WEEDFS_DIRS))
    };
}

export function fetchWeedFSVolumes(option) {
    let url = URLHelper.formatUrl(API_URI.weed.volumeStatus) + '/?node=' + option.address;
    return dispatch => {
        fetch(url, {
            headers: defaultHeaders()
        }).then(parseResponse)
            .then(res => dispatch({
                type: UPDATE_WEEDFS_VOLUMES,
                volumes: res
            }))
            .catch(error => handleActionError(dispatch, error, UPDATE_WEEDFS_VOLUMES))
    };
}

export function fetchWeedFSDiskStatus(option) {
    return dispatch => {
        let url = URLHelper.formatUrl(API_URI.weed.diskStatus) + '/?node=' + option.address;
        fetch(url, {
            headers: defaultHeaders()
        }).then(parseResponse)
            .then(res => dispatch({
                type: UPDATE_WEEDFS_DISK_STATUS,
                diskStatus: res
            }))
            .catch(error => handleActionError(dispatch, error, UPDATE_WEEDFS_DISK_STATUS))
    };
}

export function clearDirDetailData(option) {
    return dispatch => {
        dispatch({type: UPDATE_WEEDFS_VOLUMES, volumes: {}});
        dispatch({type: UPDATE_WEEDFS_DISK_STATUS, diskStatus: {}});
    };
}

export function fetchSystemResource(option) {

}
