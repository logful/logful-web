import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { reduxReactRouter, routerStateReducer } from 'redux-router';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { createHistory } from 'history';
import persistenceStore from '../persistence/store';
import * as reducers from '../reducers'

const logger = createLogger();

let combinedCreateStore;

const storeEnhancers = [
    persistenceStore,
    reduxReactRouter({createHistory})
];

combinedCreateStore = compose(...storeEnhancers)(createStore);
const finalCreateStore = applyMiddleware(thunk, logger)(combinedCreateStore);
const combinedReducer = combineReducers(Object.assign({
    router: routerStateReducer
}, reducers));

export default function configureStore(initialState) {

    const store = finalCreateStore(combinedReducer, initialState);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers/index');
            store.replaceReducer(nextRootReducer)
        });
    }

    return store;
}
