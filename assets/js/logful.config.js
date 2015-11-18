var LogWebConfig = {
    url: {
        dashboard: {
            status: "/proxy/web/dashboard/status",
            resource: "/proxy/web/dashboard/resource",
            weed: {
                volume: {
                    stats: {
                        disk: '/api/weed/volume/stats/disk'
                    },
                    status: '/api/weed/volume/status'
                }
            }
        },
        uid: {
            list: "/proxy/web/uid/list",
            view: "/proxy/web/uid/view"
        },
        util: {
            log: {
                list: "/proxy/web/util/log/file/list",
                download: "/api/log/file/download"
            },
            attachment: {
                view: "/proxy/web/util/attachment"
            },
            decrypt: {
                upload: "/proxy/web/util/decrypt/upload",
                download: "/proxy/web/util/decrypt/download"
            },
            clear: "/proxy/web/util/clear"
        },
        control: {
            level: "/proxy/web/control/level",
            profile: {
                list: "/proxy/web/control/profile/list",
                view: "/proxy/web/control/profile/view",
                edit: "/proxy/web/control/profile/edit"
            }
        }
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