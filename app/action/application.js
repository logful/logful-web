import 'whatwg-fetch';
import * as URLHelper from '../helpers/urls';
import { API_URI } from '../constants';
import parseResponse from '../helpers/parseResponse';
import handleActionError from '../helpers/handleActionError';
import {
    UPDATE_APP_LIST,
    UPDATE_APP_ITEM,
    UPDATE_APP_STATISTIC
} from '../constants';
import { defaultHeaders } from '../root';

export function fetchApps(options) {
    return dispatch => {
        fetch(URLHelper.formatUrl(API_URI.app), {
            headers: defaultHeaders()
        }).then(parseResponse)
            .then(res => dispatch({
                type: UPDATE_APP_LIST,
                apps: res
            }))
            .catch(error => handleActionError(dispatch, error, UPDATE_APP_LIST))
    };
}

export function fetchApp(option, callback) {
    if (option.id) {
        let url = URLHelper.formatUrl(API_URI.app) + '/' + option.id;
        return dispatch => {
            fetch(url, {
                headers: defaultHeaders()
            }).then(parseResponse)
                .then(function (data) {
                    dispatch({
                        type: UPDATE_APP_ITEM,
                        app: data
                    });
                    if (callback) {
                        callback(data);
                    }
                }).catch(error => handleActionError(dispatch, error, UPDATE_APP_ITEM))
        };
    }
}

export function fetchAppStatistic(option) {
    if (option.id) {
        let url = URLHelper.formatUrl(API_URI.appStatistic) + '/' + option.id;
        return dispatch => {
            fetch(url, {
                headers: defaultHeaders()
            }).then(parseResponse)
                .then(function (data) {
                    dispatch({
                        type: UPDATE_APP_STATISTIC,
                        statistic: data
                    });
                }).catch(error => handleActionError(dispatch, error, UPDATE_APP_STATISTIC))
        };
    }
}

export function createApp(option, callback) {
    fetch(URLHelper.formatUrl(API_URI.app), {
        method: 'POST',
        headers: defaultHeaders(),
        body: JSON.stringify(option)
    }).then(function (response) {
        if (response.status == 201) {
            if (callback) {
                callback(true, null);
            }
            self.props.history.pushState({}, '/');
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

export function updateApp(option, callback) {
    if (option.id) {
        let url = URLHelper.formatUrl(API_URI.app) + '/' + option.id;
        return dispatch => {
            fetch(url, {
                method: 'PUT',
                headers: defaultHeaders(),
                body: JSON.stringify(option)
            }).then(parseResponse)
                .then(function (data) {
                    dispatch({
                        type: UPDATE_APP_ITEM,
                        app: data
                    });
                    if (callback) {
                        callback(data);
                    }
                }).catch(error => handleActionError(dispatch, error, UPDATE_APP_ITEM))
        }
    }
}

export function deleteApp(option, callback) {
    if (option.id) {
        let url = URLHelper.formatUrl(API_URI.app) + '/' + option.id;
        fetch(url, {
            method: 'DELETE',
            headers: defaultHeaders()
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

export function clearStatistic(option) {
    return dispatch => {
        dispatch({type: UPDATE_APP_STATISTIC, statistic: {}});
    };
}
