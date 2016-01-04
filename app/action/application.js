import 'whatwg-fetch';
import * as URLHelper from '../helpers/urls';
import { API_URI } from '../constants';
import parseResponse from '../helpers/parseResponse';
import handleActionError from '../helpers/handleActionError';
import {
    FETCH_APP_LIST
} from '../constants';

export function list(options) {
    return dispatch => {
        fetch(URLHelper.formatUrl(API_URI.app))
            .then(parseResponse)
            .then(res => dispatch({
                type: FETCH_APP_LIST,
                apps: res
            }))
            .catch(error => handleActionError(dispatch, error, FETCH_APP_LIST))
    };
}