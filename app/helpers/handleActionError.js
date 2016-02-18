import { UPDATE_NOTIFICATION } from '../constants'

export default function handleActionError(dispatch, error, source) {
    let content = '';
    if (typeof error === 'object') {
        content = JSON.stringify(error);
    }
    else if (typeof error === 'string') {
        content = error;
    }
    return dispatch({
        type: UPDATE_NOTIFICATION,
        message: {
            title: source,
            content: content
        }
    })
}
