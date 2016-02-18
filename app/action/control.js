import 'whatwg-fetch';
import * as URLHelper from '../helpers/urls';
import { API_URI } from '../constants';
import parseResponse from '../helpers/parseResponse';
import handleActionError from '../helpers/handleActionError';
import { defaultHeaders } from '../root';

export function pushData(option, callback) {
    if (option.id) {
        let url = URLHelper.formatUrl(API_URI.push) + '/' + option.id;
        fetch(url, {
            method: 'POST',
            headers: defaultHeaders(),
            body: JSON.stringify(option.data)
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
}
