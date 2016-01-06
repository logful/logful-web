import 'whatwg-fetch';
import * as URLHelper from '../helpers/urls';
import { API_URI } from '../constants';
import parseResponse from '../helpers/parseResponse';
import handleActionError from '../helpers/handleActionError';
import {
    UPDATE_CLIENT_USER_LIST
} from '../constants';

export function fetchUsers(option) {
    let url = URLHelper.formatUrl(API_URI.clientUser, option);
    return dispatch => {
        fetch(url)
            .then(parseResponse)
            .then(res => dispatch({
                type: UPDATE_CLIENT_USER_LIST,
                users: res
            }))
            .catch(error => handleActionError(dispatch, error, UPDATE_CLIENT_USER_LIST))
    };
}

export function fetchUser(option) {

}

export function clearUsers(option) {
    return dispatch => {
        dispatch({type: UPDATE_CLIENT_USER_LIST, users: []});
    };
}
