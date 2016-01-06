var fileSizeLib = require('filesize');

export function levelToString(level) {
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
        default:
            return 'verbose';
    }
}

export function levelSpanClass(level) {
    switch (level) {
        case 1:
            return 'label-default';
        case 2:
            return 'label-primary';
        case 3:
            return 'label-success';
        case 4:
            return 'label-info';
        case 5:
            return 'label-warning';
        case 6:
            return 'label-danger';
        case 7:
            return 'label-danger';
        default:
            return 'label-default';
    }
}

export function fileSize(size) {
    return fileSizeLib(size);
}
