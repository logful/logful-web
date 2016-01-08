import 'whatwg-fetch';
import * as URLHelper from '../helpers/urls';
import { API_URI } from '../constants';
import parseResponse from '../helpers/parseResponse';
import handleActionError from '../helpers/handleActionError';

export function pushData(option, callback) {
    fetch(URLHelper.formatUrl(API_URI.push), {
        method: 'POST',
        body: JSON.stringify(option)
    }).then(function (response) {
            if (response.ok) {
                if (callback) {
                    callback(true);
                }
            }
            else {
                let error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
        })
        .catch(function (error) {
            if (callback) {
                callback(false, error);
            }
        });
}
