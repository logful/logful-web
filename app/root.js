import configureStore from './utils/configStore';

const initialState = {};

// Create Redux store
export const store = configureStore(initialState);

export function getToken() {
    let token;
    if (store) {
        const state = store.getState();
        token = state.auth.token;
    }
    if (token) {
        return token;
    }
    return '';
}

export function defaultHeaders() {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-token': getToken()
    };
}

export function streamHeaders() {
    return {
        'Accept': 'application/octet-stream',
        'Content-Type': 'application/json',
        'Access-token': getToken()
    };
}
