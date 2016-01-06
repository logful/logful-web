import moment from '../assets/plugins/daterangepicker/moment.min';

export function formatNow(pattern) {
    return moment().format(pattern);
}

export function formatUnix(timestamp, pattern) {
    return moment.unix(timestamp).format(pattern);
}
