import {
    UPDATE_NOTIFICATION
} from '../constants';

export function clearNotification(option) {
    return dispatch => {
        dispatch({type: UPDATE_NOTIFICATION, message: {}});
    };
}