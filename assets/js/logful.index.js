$(window).load(function () {
    $.ajax({
        url: LogWebConfig.url.dashboard.status,
        timeout: timeout,
        type: "GET",
        dataType: "json",
        error: function () {

        },
        success: function (data) {
            var text;

            text = data.status == 0 ? "ok" : "error";
            $('.log-tl-em-status').html(text);

            text = data.graylog_connectedd ? "yes" : "no";
            $('.log-tl-em-graylog-connected').html(text);

            text = data.weed_fs_connected ? "yes" : "no";
            $('.log-tl-em-weed-fs-connected').html(text);

            $('.log-tl-em-version').html(data.version);
        }
    });

    $.ajax({
        url: LogWebConfig.url.dashboard.resource,
        timeout: timeout,
        type: "GET",
        dataType: "json",
        success: function (data) {
            var mem = $('.log-tl-status-mem .progress-bar');
            var pool = $('.log-tl-status-pool .progress-bar');
            var queue = $('.log-tl-status-queue .progress-bar');

            mem.attr('aria-valuemax', data.total);
            mem.attr('data-transitiongoal', data.total - data.free);

            pool.attr('aria-valuemax', data.maxPoolSize);
            pool.attr('data-transitiongoal', data.poolSize);

            queue.attr('aria-valuemax', data.capacity);
            queue.attr('data-transitiongoal', data.active);

            mem.progressbar({
                display_text: 'center',
                use_percentage: false,
                amount_format: function (p, t) {
                    return filesize(p) + ' of ' + filesize(t);
                }
            });
            pool.progressbar({
                display_text: 'center',
                use_percentage: false,
                amount_format: function (p, t) {
                    return p + ' of ' + t;
                }
            });
            queue.progressbar({
                display_text: 'center',
                use_percentage: false,
                amount_format: function (p, t) {
                    return p + ' of ' + t;
                }
            });
        }
    });
});