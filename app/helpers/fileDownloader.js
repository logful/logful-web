import 'whatwg-fetch';
import { streamHeaders } from '../root';
import { parseStreamResponse } from '../helpers/parseResponse';
import { logFilename } from '../helpers/common';
import * as URLHelper from '../helpers/urls';
import { API_URI } from '../constants';
const FileSaver = require('../assets/plugins/FileSaver/FileSaver.min');

export function downloadFile(url, saveName, callback) {
    fetch(url, {
        headers: streamHeaders()
    }).then(parseStreamResponse)
        .then(function (data) {
            let blob = new Blob([data], {type: "text/plain;charset=utf-8"});
            FileSaver.saveAs(blob, saveName);
        })
        .catch(function (error) {
            console.log('error', error);
        });
}

export function downloadLogFile(data, callback) {
    const fileName = logFilename(data) + '.log';
    const url = URLHelper.formatUrl(API_URI.logFile) + '/' + data.id;
    downloadFile(url, fileName, callback);
}

export function downloadCrashFile(data, callback) {
    const fileName = data.id + '.log';
    const url = URLHelper.formatUrl(API_URI.crashFile) + '/' + data.id;
    downloadFile(url, fileName, callback);
}
