var baseUrl = "http://127.0.0.1:9600";

var LogWebConfig = {
    url: {
        uid: baseUrl + "/web/uid",
        status: baseUrl + "/web/status",
        resource: baseUrl + "/web/resource",
        fetchList: baseUrl + "/web/log/files",
        fetch: baseUrl + "/web/log/fetch",
        attachment: baseUrl + "/web/attachment/download",
        decrypt: baseUrl + "/web/decrypt",
        download: baseUrl + "/web/download",
        clear: baseUrl + "/web/clear",
        level: baseUrl + "/web/level",
        error: baseUrl + "/web/errors",
        control: baseUrl + "/web/control"
    }
};

var levelString = function (level) {
    switch (level) {
        case 1:
            return 'verbose';
        case 2:
            return 'debug';
        case 3:
            return 'info';
        case 4:
            return 'warn';
        case 5:
            return 'error';
        case 6:
            return 'exception';
        case 7:
            return 'fatal';
    }
    return 'verbose';
};