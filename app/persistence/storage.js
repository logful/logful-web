export function put(key, value) {
    window.localStorage.setItem(key, value);
    var date = new Date();
    date.setTime(date.getTime() + (360 * 24 * 3600000));
    var expires = 'expires=' + date.toUTCString();
    document.cookie = 'access-token=' + value + '; ' + expires;
}

export function get(key) {
    return window.localStorage.getItem(key)
}

export function remove(key) {
    return window.localStorage.removeItem(key)
}

export function clear() {
    window.localStorage.clear()
}
