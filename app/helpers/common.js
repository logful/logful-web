var fileSizeLib = require('filesize');

export function levelToString(level) {
    switch (level) {
        case 1:
            return 'VERBOSE';
        case 2:
            return 'DEBUG';
        case 3:
            return 'INFO';
        case 4:
            return 'WARN';
        case 5:
            return 'ERROR';
        case 6:
            return 'EXCEPTION';
        case 7:
            return 'FATAL';
        default:
            return 'VERBOSE';
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
