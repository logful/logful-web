var queryForm;
var queryFormValid = false;

$(document).ready(function () {
    queryForm = $(".log-tl-form-query");
    queryForm.validator();
    queryForm.on('validated.bs.validator', function () {
        var validator = queryForm.data('bs.validator');
        queryFormValid = !validator.hasErrors();
    });
});

$(".log-tl-btn-search").click(function () {
    $("#log-tl-dlg-uid-list").modal("show");

    var values = {};
    $.each($(".log-tl-form-search").serializeArray(), function (item, field) {
        if (field.value != null && field.value.length > 0) {
            values[field.name] = field.value;
        }
    });

    var tbody = $(".log-tl-tbd-uid-list");
    tbody.empty();

    $.ajax({
        url: LogWebConfig.url.uid.list,
        data: values,
        timeout: timeout,
        type: "GET",
        dataType: "json",
        success: function (data) {
            var index = 1;
            $.each(data, function () {
                var valueString = btoa(JSON.stringify(this));
                var row = "<tr>"
                    + "<td>" + index + "</td>"
                    + "<td>" + this.uid + "</td>"
                    + "<td>" + this.appId + "</td>"
                    + "<td>" + this.version + "</td>"
                    + "<td>" + this.versionString + "</td>"
                    + "<td>" + "<a style='cursor:pointer' onclick=showDetail(" + '"' + valueString + '"' + ") >"
                    + "<i class='fa fa-info-circle fa-fw'></i>" + " View Detail</a>"
                    + "</td>"
                    + "</tr>";

                tbody.append(row);
                index++;
            });
        }
    });
});

$(".log-tl-btn-query").click(function () {
    if (queryForm) {
        queryForm.validator('validate');
        if (queryFormValid) {
            var eUid = $('.log-tl-user-info-detail-uid');
            var ePlatform = $('.log-tl-user-info-detail-platform');
            var eAlias = $('.log-tl-user-info-detail-alias');
            var eModel = $('.log-tl-user-info-detail-model');
            var eImei = $('.log-tl-user-info-detail-imei');
            var eMacAddress = $('.log-tl-user-info-detail-mac-address');
            var eOsVersion = $('.log-tl-user-info-detail-os-version');

            eUid.html('');
            ePlatform.html('');
            eAlias.html('');
            eModel.html('');
            eImei.html('');
            eMacAddress.html('');
            eOsVersion.html('');

            var tbody = $(".log-tl-user-info-app-list");
            tbody.empty();

            $('#log-tl-dlg-user-info-detail').modal('show');

            var values = {};
            $.each($(".log-tl-form-query").serializeArray(), function (item, field) {
                if (field.value != null && field.value.length > 0) {
                    values[field.name] = field.value;
                }
            });

            var url = LogWebConfig.url.uid.view + '/' + values.platform + '/' + values.uid;
            $.ajax({
                url: url,
                type: "GET",
                timeout: timeout,
                dataType: "json",
                success: function (data) {
                    if (data.platform) {
                        eUid.html(data.uid);
                        ePlatform.html(data.platform);
                        eAlias.html(data.alias);
                        eModel.html(data.model);
                        eImei.html(data.imei);
                        eMacAddress.html(data.macAddress);
                        eOsVersion.html(data.osVersion);

                        var index = 1;
                        $.each(data.app, function () {
                            var row = "<tr>"
                                + "<td>" + index + "</td>"
                                + "<td>" + this.appId + "</td>"
                                + "<td>" + this.version + "</td>"
                                + "<td>" + this.versionString + "</td>"
                                + "</tr>";
                            tbody.append(row);
                            index++;
                        });
                    }
                }
            });
        }
    }
});

var showDetail = function (value) {
    var object = JSON.parse(atob(value));
    $("#log-tl-dlg-detail").modal("show");

    var group = $(".log-tl-dlg-detail-list");
    group.empty();

    $.each(object, function (key, value) {
        var row = "<li class='list-group-item'>"
            + key
            + "<span class='pull-right text-muted small'>"
            + "<em class='log-tl-em-status'>"
            + value
            + "</em></span></li>";
        group.append(row);
    });
};