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
    if (option.id) {
        let url = URLHelper.formatUrl(API_URI.crashFile) + '/' + option.id;
        return dispatch => {
            fetch(url)
                .then(parseLogFileResponse)
                .then(res => dispatch({
                    type: UPDATE_CRASH_FILE_ITEM,
                    file: {
                        title: '崩溃日志文件查看',
                        lines: res
                    }
                }))
                .catch(error => handleActionError(dispatch, error, UPDATE_CRASH_FILE_ITEM))
        };
    }
}

export function clearCrashFiles(option) {
    return dispatch => {
        dispatch({type: UPDATE_CRASH_FILE_LIST, files: []});
    };
}

export function clearCrashFile(option) {
    let file = {
        title: '',
        lines: ''
    };
    return dispatch => {
        dispatch({type: UPDATE_CRASH_FILE_ITEM, file: file});
    };
}
