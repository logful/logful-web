import React from 'react';
import { IndexRoute, Route } from 'react-router';
import {
    Layout,
    System,
    Login,
    ListApp,
    CreateApp,
    AppInfo,
    ClientUser,
    LogFile,
    Control,
    NotFound
} from 'containers';

export default function routes(store) {
    const requireAuth = (nextState, replaceState) => {
        // TODO
        const state = store.getState();
        const isLoggedIn = Boolean(state.application.token);
        if (!isLoggedIn) {
            replaceState({
                nextPathname: nextState.location.pathname
            }, '/login');
        }
    };

    return (
        <Route>
            <Route path="/login" component={Login}/>
            <Route component={Layout}>
                <Route path="/" component={ListApp}/>
                <Route path="/system" component={System}/>
                <Route path="/app/create" component={CreateApp}/>
                <Route path="/app/info" component={AppInfo}/>
                <Route path="/app/user" component={ClientUser}/>
                <Route path="/app/file" component={LogFile}/>
                <Route path="/app/control" component={Control}/>
                <Route path="*" component={NotFound}/>
            </Route>
        </Route>
    );
};
