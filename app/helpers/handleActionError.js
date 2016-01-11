import { UPDATE_NOTIFICATION } from '../constants'

export default function handleActionError(dispatch, error, source) {
    return dispatch({
        type: UPDATE_NOTIFICATION,
        message: {
            title: source,
            content: error
        }
    })
}
