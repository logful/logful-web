import 'whatwg-fetch';
import * as URLHelper from '../helpers/urls';
import { API_URI } from '../constants';
import parseResponse, { parseLogFileResponse } from '../helpers/parseResponse';
import handleActionError from '../helpers/handleActionError';
import {
    UPDATE_CRASH_FILE_LIST,
    UPDATE_CRASH_FILE_ITEM
} from '../constants';

export function fetchCrashFiles(option) {
    let url = URLHelper.formatUrl(API_URI.crashFile, option);
    return dispatch => {
        fetch(url)
            .then(parseResponse)
            .then(res => dispatch({
                type: UPDATE_CRASH_FILE_LIST,
                files: res
            }))
            .catch(error => handleActionError(dispatch, error, UPDATE_CRASH_FILE_LIST))
    };
}

export function fetchCrashFile(option) {

}

export function clearCrashFiles(option) {

}

export function clearCrashFile(option) {

}
