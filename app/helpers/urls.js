import { API_BASE_URL } from '../constants';

export function formatUrl(uri, params) {
    if (!params) {
        return API_BASE_URL + uri;
    }
    else {
        if (Object.keys(params).length == 0) {
            return API_BASE_URL + uri;
        }
        else {
            return API_BASE_URL + uri + '?' + jQuery.param(params);
        }
    }
}