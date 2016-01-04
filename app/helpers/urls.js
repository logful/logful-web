import {API_HOST, API_PORT} from '../constants';

export function formatUrl(uri) {
    return 'http://' + API_HOST + ':' + API_PORT + uri;
}