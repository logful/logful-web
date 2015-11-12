$(document).ready(function () {
    var slider;
    var levelTips = $('.log-tl-control-level-tips');

    var sliderStopListener = function () {
        var value = slider.getValue();
        $.ajax({
            url: LogWebConfig.url.level,
            type: "POST",
            timeout: timeout,
            data: {'level': value},
            success: function (data) {

            }
        });
    };

    var sliderListener = function () {
        levelTips.html(slider.getValue());
    };

    $.ajax({
        url: LogWebConfig.url.level,
        timeout: timeout,
        type: "GET",
        dataType: "json",
        error: function () {
            levelTips.html('0');
            slider = $("#log-tl-level-slider").slider({
                step: 1,
                min: 0,
                max: 100,
                value: 0,
                formatter: function (value) {
                    return value + '%';
                }
            }).on('slideStop', sliderStopListener).on('slide', sliderListener).data('slider');
        },
        success: function (data) {
            levelTips.html(data.level);
            slider = $("#log-tl-level-slider").slider({
                step: 1,
                min: 0,
                max: 100,
                value: data.level,
                formatter: function (value) {
                    return value + '%';
                }
            }).on('slideStop', sliderStopListener).on('slide', sliderListener).data('slider');
        }
    });

    $(".select-picker").selectpicker();

    // Add new control item
    $(".lf-detail-control-add").click(function () {
        displayEditCol(true);
    });

    // Cancel add new control item
    $(".lf-edit-control-param-cancel").click(function () {
        displayEditCol(false);
    });

    var uploadSwitch = $(".lf-control-item-switch").bootstrapSwitch();
    uploadSwitch.on("switchChange.bootstrapSwitch", function (event, state) {
        var extraForm = $(".lf-control-extra-param");
        if (state) {
            extraForm.show();
        }
        else {
            extraForm.hide();
        }
    });

    // Change schedule type
    $(".lf-control-item-schedule-type").change(function () {
        if (this.value == 1) {
            $(".lf-control-schedule-time-list").show();
            $(".lf-control-item-button-add").show();
            $(".lf-control-item-with-date-check").show();
            $(".lf-control-item-unit").hide();
            var checked = ( $(".lf-control-item-with-date").is(':checked') ) ? 1 : 0;
            if (checked) {
                $(".datetime-picker").datetimepicker({
                    format: "MM/DD HH:mm"
                });
            }
            else {
                $(".datetime-picker").datetimepicker({
                    format: "HH:mm"
                });
            }
        }
        else if (this.value == 2) {
            $(".lf-control-schedule-time-list").hide();
            $(".lf-control-item-button-add").hide();
            $(".lf-control-item-with-date-check").hide();
            $(".lf-control-item-unit").show();
            var datetimeInput = $(".datetime-picker");
            datetimeInput.data("DateTimePicker").destroy();
            datetimeInput.val("86400");
        }
    });

    var addButton = $(".lf-control-item-button-add");
    addButton.click(function () {
        var value = $(".datetime-picker").val();
        if (value) {
            var tbody = $(".lf-control-schedule-time-tbody");
            var count = $(".lf-control-schedule-time-tbody > tr").length;
            var index = count + 1;
            var row = "<tr>"
                + "<td>" + index + "</td>"
                + "<td>" + value + "</td>"
                + "<td>" + "<a class='lf-control-schedule-td' style='cursor: pointer;'> " +
                "<i class='fa fa-trash-o fa-fw'></i>删除</a>" + "</td>"
                + "</tr>";
            tbody.append(row);

            $(".lf-control-schedule-td").click(function () {
                $(this).parent().parent().remove();
            });
        }
    });

    $(".datetime-picker").datetimepicker({
        format: "HH:mm"
    });
    $(".lf-control-item-with-date").change(function () {
        if (this.checked) {
            $(".datetime-picker").data("DateTimePicker").options({
                format: "MM/DD HH:mm"
            });
        }
        else {
            $(".datetime-picker").data("DateTimePicker").options({
                format: "HH:mm"
            });
        }
    });

    $(".lf-detail-control-clear").click(function () {
        // TODO
    });

    $(".lf-edit-control-confirm").click(function () {
        var name = $("input[name=lf-control-name]").val();
        if (name) {
            var platform = $("select[name=lf-control-platform]").val();
            var uid = $("input[name=lf-control-uid]").val();
            var alias = $("input[name=lf-control-alias]").val();
            var appId = $("input[name=lf-control-app-id]").val();

            var shouldUpload = ( $("input[name=lf-control-should-upload]").is(':checked') ) ? true : false;

            var data = {
                name: name,
                platform: parseInt(platform),
                uid: uid,
                alias: alias,
                appId: appId,
                shouldUpload: shouldUpload
            };

            if (shouldUpload) {
                var scheduleType = $(".lf-control-item-schedule-type").val();
                data.scheduleType = parseInt(scheduleType);

                if (scheduleType == 1) {
                    var scheduleArray = [];
                    $(".lf-control-schedule-time-tbody > tr").each(function () {
                        scheduleArray.push({
                            timeString: $(this).find("td:eq(1)").html()
                        });
                    });

                    if (scheduleArray.length > 0) {
                        data.scheduleArray = scheduleArray;
                        uploadRawData(data);
                    }
                }
                else if (scheduleType == 2) {
                    var scheduleTime = $("input[name=lf-control-schedule-value]").val();
                    data.scheduleTime = parseInt(scheduleTime);
                    uploadRawData(data);
                }
            }
            else {
                uploadRawData(data);
            }
        }
    });

    $(".lf-control-item-with-date-check").tooltip({
        selector: "[data-toggle=tooltip]",
        container: "body"
    });

    addButton.tooltip({
        selector: "[data-toggle=tooltip]",
        container: "body"
    });

    listAllControlProfiles();
});

var listAllControlProfiles = function () {
    $.ajax({
        url: LogWebConfig.url.control,
        type: "GET",
        timeout: timeout,
        dataType: "json",
        success: function (data) {
            var tbody = $(".lf-control-detail-tbody");
            $.each(data, function () {
                var row = profileRow(this);
                tbody.append(row);
            });
            bindProfileRowEvent();
        }
    });
};

var deleteControlProfile = function (id) {
    $.ajax({
        url: LogWebConfig.url.control + "/" + id,
        type: "DELETE",
        timeout: timeout,
        success: function () {
            // TODO
        }
    });
};

var displayEditCol = function (visibility) {
    var tableCol = $("#lf-control-list-col");
    if (visibility) {
        tableCol.removeClass("col-lg-12").addClass("col-lg-6");
        $("#lf-edit-control-param-col").show();
    }
    else {
        tableCol.removeClass("col-lg-6").addClass("col-lg-12");
        $("#lf-edit-control-param-col").hide();
    }
};

var bindProfileRowEvent = function () {
    $(".lf-control-detail-delete").click(function () {
        var id = $(this).parents("tr").find("input[type='hidden']").val();
        if (id) {
            deleteControlProfile(id);
        }
        $(this).parent().parent().remove();
    });
    $(".lf-control-detail-edit").click(function () {
        // TODO
    });
};

var uploadRawData = function (rawData) {
    displayEditCol(false);
    clearEditCol();

    rawData.updateTime = Date.now();
    console.log(rawData);

    $.ajax({
        url: LogWebConfig.url.control,
        type: "POST",
        timeout: timeout,
        data: JSON.stringify(rawData),
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            var tbody = $(".lf-control-detail-tbody");
            var row = profileRow(data);
            tbody.append(row);
            bindProfileRowEvent();
        }
        // TODO
    });
};

var profileRow = function (data) {
    var count = $(".lf-control-detail-tbody > tr").length;
    var index = count + 1;
    var editCell = "<a class='lf-control-detail-delete' style='cursor: pointer;'>" +
        "<i class='fa fa-trash-o fa-fw'></i>删除</a>" +
        "&nbsp&nbsp" +
        "<a class='lf-control-detail-edit' style='cursor: pointer;'>" +
        "<i class='fa fa-edit fa-fw'></i>编辑</a>";
    if (data.id) {
        editCell += "<input type='hidden' value='" + data.id + "'>";
    }
    return "<tr>"
        + "<td>" + index + "</td>"
        + "<td>" + data.name + "</td>"
        + "<td>" + dateString(data.updateTime) + "</td>"
        + "<td>" + editCell + "</td>"
        + "</tr>";
};

var clearEditCol = function () {
    $("input[name=lf-control-name]").val('');
    $("select[name=lf-control-platform]").val('1');
    $("input[name=lf-control-uid]").val('');
    $("input[name=lf-control-alias]").val('');
    $("input[name=lf-control-app-id]").val('');
    $("input[name=lf-control-should-upload]").bootstrapSwitch('state', false);
    $("input[name=lf-control-schedule-value]").val('');
    $(".lf-control-schedule-time-tbody").empty();
    $(".lf-control-item-schedule-type").val(1).trigger('change');
};

var dateString = function (timestamp) {
    return moment(timestamp).format("YYYY/MM/DD HH:mm:ss");
};