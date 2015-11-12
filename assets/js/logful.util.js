var table, fetchForm, attachmentForm, decryptForm;
var fetchFormValid = false;
var decryptFormValid = false;

var spanForLevel = function (level) {
    var labelClass = 'label-default';
    switch (level) {
        case 1:
            labelClass = 'label-default';
            break;
        case 2:
            labelClass = 'label-primary';
            break;
        case 3:
            labelClass = 'label-success';
            break;
        case 4:
            labelClass = 'label-info';
            break;
        case 5:
            labelClass = 'label-warning';
            break;
        case 6:
            labelClass = 'label-danger';
            break;
        case 7:
            labelClass = 'label-danger';
            break;
    }
    return "<span class='label " + labelClass + "'>" + levelString(level) + "</span>";
};

var operationCol = function (entry) {
    var uri = '?fid=' + entry.fid + '&filename=' + entry.filename;
    var downUrl = LogWebConfig.url.util.log.download + uri;
    var viewUrl = 'log/viewer.html' + uri;
    return "<a href='" + downUrl + "' >" + "<i class='fa fa-download fa-fw'></i>" + " Down</a>"
        + "  <a href='" + viewUrl + "' target='_blank' >" + "<i class='fa fa-eye fa-fw'></i>" + " View</a>";
};

$(document).ready(function () {
    var link = $(".log-tl-btn-dl-attachment");

    table = $('#log-tl-table-log-file-list').DataTable({
        responsive: true
    });

    fetchForm = $(".log-tl-form-fetch");
    fetchForm.validator();
    fetchForm.on('validated.bs.validator', function () {
        var validator = fetchForm.data('bs.validator');
        fetchFormValid = !validator.hasErrors();
    });

    attachmentForm = $(".log-tl-form-attachment");
    attachmentForm.validator();

    decryptForm = $(".log-tl-form-decrypt");
    decryptForm.validator();
    decryptForm.on('validated.bs.validator', function () {
        var validator = decryptForm.data('bs.validator');
        decryptFormValid = !validator.hasErrors();
    });

    var input = $(".log-tl-form-attachment-id");
    input.bind('input', function () {
        var value = input.val();
        if (value.match("[a-fA-F0-9]{32}")) {
            link.attr('href', LogWebConfig.url.util.attachment.download + '/' + value);
            link.removeClass('disabled');
        }
        else {
            link.removeAttr('href');
            link.addClass('disabled')
        }
    });
});

$(".log-tl-btn-fetch").click(function () {
    if (fetchForm) {
        fetchForm.validator('validate');
        if (fetchFormValid) {
            if (table) {
                table.clear();
            }

            $("#log-tl-dlg-log-list").modal("show");

            var values = {};
            $.each(fetchForm.serializeArray(), function (item, field) {
                if (field.name == "date") {
                    values[field.name] = field.value.replace(/\//g, "");
                }
                else {
                    values[field.name] = field.value;
                }
            });

            $.ajax({
                beforeSend: function (xhrObj) {
                    xhrObj.setRequestHeader("Content-Type", "application/json");
                    xhrObj.setRequestHeader("Accept", "application/json");
                },
                url: LogWebConfig.url.util.log.list,
                data: JSON.stringify(values),
                timeout: timeout,
                type: "POST",
                dataType: "json",
                success: function (data) {
                    var list = [];
                    $.each(data, function () {
                        list.push(this);
                    });

                    list.sort(function (l, r) {
                        return l.level - r.level;
                    });

                    var index = 1;
                    list.forEach(function (entry) {
                        if (table) {
                            table.row.add([index + '',
                                entry.filename + '',
                                filesize(entry.size) + '',
                                spanForLevel(entry.level),
                                operationCol(entry)
                            ]);
                        }
                        index++;
                    });

                    if (table) {
                        table.draw();
                    }
                }
            });
        }
    }
});

$(".log-tl-btn-decrypt").click(function () {
    if (decryptForm) {
        decryptForm.validator('validate');
        if (decryptFormValid) {
            $("#log-tl-dlg-log-decrypt").modal("show");

            var progress = $('.log-tl-pgb .progress-bar');
            progress.attr('data-transitiongoal', 100);
            progress.progressbar();

            var button = $('.log-tl-a-download');
            button.attr("href", "#");
            button.hide();

            var failedView = $('.log-tl-em-decrypt-failed');
            failedView.hide();

            var formData = new FormData();
            formData.append('appId', $('input[name="d-appId"]').val());
            formData.append('logFile', $('input[name="d-logFile"]')[0].files[0]);

            $.ajax({
                url: LogWebConfig.url.util.decrypt.upload,
                type: "POST",
                timeout: timeout,
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                success: function (data) {
                    var url = LogWebConfig.url.util.decrypt.download + "/" + data.uri;
                    button.attr("href", url);

                    setTimeout(function () {
                        button.show();
                    }, 300);
                },
                error: function () {
                    setTimeout(function () {
                        failedView.show();
                    }, 300);
                }
            });
        }
    }
});

$(".log-tl-btn-clear").click(function () {
    var progress = $('.progress .progress-bar');
    progress.attr('data-transitiongoal', 100);
    progress.progressbar();

    var em = $(".log-tl-em-clear-result");
    em.empty();

    $.ajax({
        url: LogWebConfig.url.util.clear,
        timeout: timeout,
        type: "GET",
        dataType: "json",
        success: function (data) {
            var valueString = data.result ? "successful" : "failed";
            setTimeout(function () {
                em.html(valueString);
                progress.attr('data-transitiongoal', 0).progressbar();
            }, 1000);
        },
        error: function () {
            setTimeout(function () {
                em.html("failed");
                progress.attr('data-transitiongoal', 0).progressbar();
            }, 1000);
        }
    });
});
