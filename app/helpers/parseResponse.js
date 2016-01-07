var String = require('string');

export default function parseResponse(response) {
    let isOk = response.ok;
    return response.text()
        .then(body => {
            try {
                body = JSON.parse(body);
            }
            catch (error) {
                if (isOk) isOk = false;
            }

            console.log(body, response);
            if (isOk) {
                return body;
            }

            throw {...body, statusCode: response.status}
        });
}

export function parseLogFileResponse(response) {
    let isOk = response.ok;
    return response.text()
        .then(body => {
            /*
            const result = '[' + String(body.trim()).replaceAll('\n', ',').s + ']';
            try {
                body = JSON.parse(result);
            }
            catch (error) {
                if (isOk) isOk = false;
            }
            */

            if (isOk) {
                return body;
            }

            throw {...body, statusCode: response.status}
        });
}
