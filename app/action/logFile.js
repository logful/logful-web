import 'whatwg-fetch';
import * as URLHelper from '../helpers/urls';
import { API_URI } from '../constants';
import parseResponse from '../helpers/parseResponse';
import handleActionError from '../helpers/handleActionError';
import {
    UPDATE_LOG_FILE_LIST,
    UPDATE_LOG_FILE_ITEM
} from '../constants';

export function fetchFiles(option) {
    let url = URLHelper.formatUrl(API_URI.logFile, option);
    return dispatch => {
        fetch(url)
            .then(parseResponse)
            .then(res => dispatch({
                type: UPDATE_LOG_FILE_LIST,
                files: res
            }))
            .catch(error => handleActionError(dispatch, error, UPDATE_LOG_FILE_LIST))
    };
}

export function fetchFile(option) {

}

export function clearFiles(option) {
    return dispatch => {
        dispatch({type: UPDATE_LOG_FILE_LIST, files: []});
    };
}

export function clearFile(option) {
    let file = {
        meta: {},
        lines: []
    };
    return dispatch => {
        dispatch({type: UPDATE_LOG_FILE_ITEM, file: file});
    };
}
