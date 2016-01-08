import 'whatwg-fetch';
import * as URLHelper from '../helpers/urls';
import { API_URI } from '../constants';
import parseResponse from '../helpers/parseResponse';
import handleActionError from '../helpers/handleActionError';
import {
    UPDATE_APP_LIST,
    UPDATE_APP_ITEM
} from '../constants';

export function fetchApps(options) {
    return dispatch => {
        fetch(URLHelper.formatUrl(API_URI.app))
            .then(parseResponse)
            .then(res => dispatch({
                type: UPDATE_APP_LIST,
                apps: res
            }))
            .catch(error => handleActionError(dispatch, error, UPDATE_APP_LIST))
    };
}

export function fetchApp(option) {
    if (option.id) {
        let url = URLHelper.formatUrl(API_URI.app) + '/' + option.id;
        return dispatch => {
            fetch(url)
                .then(parseResponse)
                .then(res => dispatch({
                    type: UPDATE_APP_ITEM,
                    app: res
                }))
                .catch(error => handleActionError(dispatch, error, UPDATE_APP_ITEM))
        };
    }
}

export function updateApp(option) {
    if (option.id) {
        let url = URLHelper.formatUrl(API_URI.app) + '/' + option.id;
        return dispatch => {
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(option)
            }).then(parseResponse)
                .then(res => dispatch({
                    type: UPDATE_APP_ITEM,
                    app: res
                }))
                .catch(error => handleActionError(dispatch, error, UPDATE_APP_ITEM))
        }
    }
}

export function deleteApp(option, callback) {
    if (option.id) {
        let url = URLHelper.formatUrl(API_URI.app) + '/' + option.id;
        fetch(url, {
            method: 'DELETE'
        }).then(function (response) {
            if (response.status == 204) {
                if (callback) {
                    callback(true);
                }
            }
            else {
                let error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
        }).catch(function (error) {
            if (callback) {
                callback(false, error);
            }
        });
    }
}

export function storeAppData(option) {
    return dispatch => {
        dispatch({type: UPDATE_APP_ITEM, app: option});
    };
}

export function clearApps(option) {
    return dispatch => {
        dispatch({type: UPDATE_APP_LIST, apps: []});
    };
}

export function clearApp(option) {
    return dispatch => {
        dispatch({type: UPDATE_APP_ITEM, app: {}});
    };
}
