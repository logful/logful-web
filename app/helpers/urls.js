import {API_HOST, API_PORT} from '../constants';

export function formatUrl(uri, params) {
    if (!params) {
        return 'http://' + API_HOST + ':' + API_PORT + uri;
    }
    else {
        if (Object.keys(params).length == 0) {
            return 'http://' + API_HOST + ':' + API_PORT + uri;
        }
        else {
            return 'http://' + API_HOST + ':' + API_PORT + uri + '?' + jQuery.param(params);
        }
    }
}