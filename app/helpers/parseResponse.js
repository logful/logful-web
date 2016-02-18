var String = require('string');

export default function parseResponse(response) {
    let isOk = response.ok;
    return response.text()
        .then(body => {
            if (body) {
                try {
                    body = JSON.parse(body);
                }
                catch (error) {
                    if (isOk) {
                        isOk = false;
                    }
                }
            }
            console.log(body, response);
            if (isOk) {
                return body;
            }
            throw {...body, statusCode: response.status}
        });
}

export function parseStreamResponse(response) {
    let isOk = response.ok;
    return response.text()
        .then(body => {
            if (isOk) {
                return body;
            }
            throw {...body, statusCode: response.status}
        });
}
