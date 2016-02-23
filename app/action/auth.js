import 'whatwg-fetch';
import * as URLHelper from '../helpers/urls';
import { API_URI } from '../constants';
import parseResponse from '../helpers/parseResponse';
import handleActionError from '../helpers/handleActionError';
import {
    LOGGED_IN,
    LOG_OUT
} from '../constants';

export function login(option, redirect) {
    return dispatch => {
        fetch(URLHelper.formatUrl(API_URI.authenticate), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(option)
        }).then(parseResponse)
            .then(function (data) {
                dispatch({
                    type: LOGGED_IN,
                    token: data.token
                });
                if (redirect) {
                    redirect();
                }
            }).catch(error => handleActionError(dispatch, error, LOGGED_IN))
    };
}

export function logout(option, redirect) {
    //todo
    return dispatch => {
        dispatch({
            type: LOG_OUT,
            token: ""
        });
        if (redirect) {
            redirect();
        }
    };
}