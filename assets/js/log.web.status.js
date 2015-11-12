$(window).load(function () {
    $.ajax({
        url: LogWebConfig.url.status,
        timeout: timeout,
        type: "GET",
        dataType: "json",
        error: function () {

        },
        success: function (data) {
            var status = data.status;
            var connected = data.graylog_connected;
            var version = data.version;

            if (status == 0) {
                $('.log-tl-em-status').html('ok');
            }
            else {
                $('.log-tl-em-status').html('error');
            }

            if (connected == true) {
                $('.log-tl-em-connected').html('connected');
            }
            else {
                $('.log-tl-em-connected').html('not connected');
            }

            $('.log-tl-em-version').html(version);
        }
    });

    $.ajax({
        url: LogWebConfig.url.resource,
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