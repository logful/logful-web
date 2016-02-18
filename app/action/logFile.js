import 'whatwg-fetch';
import * as URLHelper from '../helpers/urls';
import { API_URI } from '../constants';
import parseResponse, { parseStreamResponse } from '../helpers/parseResponse';
import handleActionError from '../helpers/handleActionError';
import {
    UPDATE_LOG_FILE_LIST,
    UPDATE_LOG_FILE_ITEM
} from '../constants';
import { logFilename } from '../helpers/common';
import { defaultHeaders, streamHeaders } from '../root';

export function fetchFiles(option) {
    let url = URLHelper.formatUrl(API_URI.logFile, option);
    return dispatch => {
        fetch(url, {
            headers: defaultHeaders()
        }).then(parseResponse)
            .then(res => dispatch({
                type: UPDATE_LOG_FILE_LIST,
                files: res
            }))
            .catch(error => handleActionError(dispatch, error, UPDATE_LOG_FILE_LIST))
    };
}

export function fetchFile(option) {
    if (option.id) {
        let url = URLHelper.formatUrl(API_URI.logFile) + '/' + option.id;
        return dispatch => {
            fetch(url, {
                headers: streamHeaders()
            }).then(parseStreamResponse)
                .then(res => dispatch({
                    type: UPDATE_LOG_FILE_ITEM,
                    file: {
                        title: '日志文件查看',
                        lines: res
                    }
                }))
                .catch(error => handleActionError(dispatch, error, UPDATE_LOG_FILE_ITEM))
        };
    }
}

export function fetchAttachment(option, callback) {
    if (option.id) {
        let url = URLHelper.formatUrl(API_URI.attachment) + '/' + option.id + '.jpg';
        fetch(url, {
            headers: streamHeaders()
        }).then(parseStreamResponse)
            .then(function (data) {
                if (callback) {
                    callback(data);
                }
            })
            .catch(function (error) {
                console.log('error', error);
            });
    }
}

export function clearFiles(option) {
    return dispatch => {
        dispatch({type: UPDATE_LOG_FILE_LIST, files: []});
    };
}

export function clearFile(option) {
    let file = {
        title: '',
        lines: ''
    };
    return dispatch => {
        dispatch({type: UPDATE_LOG_FILE_ITEM, file: file});
    };
}
