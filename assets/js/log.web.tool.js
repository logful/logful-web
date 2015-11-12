var LogWebConfig = {
    url: {
        uid: "/proxy/web/uid",
        status: "/proxy/web/status",
        resource: "/proxy/web/resource",
        fetchList: "/proxy/web/log/files",
        fetch: "/api/log/file/download",
        attachment: "/proxy/web/attachment/download",
        decrypt: "/proxy/web/decrypt",
        download: "/proxy/web/download",
        clear: "/proxy/web/clear",
        level: "/proxy/web/level",
        control: "/proxy/web/control"
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

var timeout = 50000;