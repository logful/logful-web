import * as constants from '../constants'
import * as storage from './storage'

export default function persistenceHandler(next) {
    return (reducer, initialState) => {
        const store = next(reducer, initialState);
        return Object.assign({}, store, {
            dispatch (action) {
                store.dispatch(action);

                if (action.type === constants.LOGGED_IN) {
                    storage.put('token', action.token);
                }

                if (action.type === constants.LOG_OUT) {
                    storage.remove('token');
                }

                return action;
            }
        })
    }
}
