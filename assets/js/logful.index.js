$(document).ready(function () {
    $.ajax({
        url: LogWebConfig.url.dashboard.status,
        timeout: timeout,
        type: "GET",
        dataType: "json",
        error: function () {

        },
        success: function (data) {
            var text;

            text = data.graylogConnected ? "true" : "false";
            $('.log-tl-em-graylog-connected').html(text);

            text = data.weedFSConnected ? "true" : "false";
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

    $(".lf-show-vol-dt-btn").click(function () {
        $("#lf-dashboard-vol-dt-dlg").modal("show");

        var tbodyDiskStats = $(".lf-dashboard-disk-stats-tbody");
        var tbodyVolumes = $(".lf-dashboard-volumes-tbody");

        tbodyDiskStats.empty();
        tbodyVolumes.empty();

        var value = $(this).parent().parent().find("td").eq(2).html();
        if (value) {
            $.ajax({
                url: LogWebConfig.url.dashboard.weed.volume.stats.disk,
                timeout: timeout,
                type: "GET",
                dataType: "json",
                data: {address: value},
                success: function (data) {
                    $.each(data.DiskStatuses, function () {
                        var row = '<tr>'
                            + '<td>' + this.Dir + '</td>'
                            + '<td>' + filesize(this.All) + '</td>'
                            + '<td>' + filesize(this.Used) + '</td>'
                            + '<td>' + filesize(this.Free) + '</td>'
                            + '</tr>';
                        tbodyDiskStats.append(row);
                    });
                }
            });

            $.ajax({
                url: LogWebConfig.url.dashboard.weed.volume.status,
                timeout: timeout,
                type: "GET",
                dataType: "json",
                data: {address: value},
                success: function (data) {
                    $.each(data.Volumes, function () {
                        var row = '<tr>'
                            + '<td>' + this.Id + '</td>'
                            + '<td>' + filesize(this.Size) + '</td>'
                            + '<td>' + this.FileCount + '</td>'
                            + '<td>' + this.DeleteCount + ' / ' + filesize(this.DeletedByteCount) + '</td>'
                            + '</tr>';
                        tbodyVolumes.append(row);
                    });
                }
            });
        }
    });
});