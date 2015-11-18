var config = {
    security: {
        username: 'admin',
        // sha-256
        password: '5915f48799dd8c384e0bfe60d0770928c703fc30423a17d7301969a51c8eb9e1'
    },
    locale: 'zh-CN',
    logfulApi: 'http://127.0.0.1:9600',
    weedMaster: 'http://127.0.0.1:9333',
    weedApi: {
        master: {
            dirStatus: '/dir/status',
            volStatus: '/vol/status',
            statsCounter: '/stats/counter',
            statsMemory: '/stats/memory'
        },
        volume: {
            status: '/status',
            statsCounter: '/stats/counter',
            statsMemory: '/stats/memory',
            statsDisk: '/stats/disk'
        }
    }
};

module.exports = config;