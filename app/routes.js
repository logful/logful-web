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
    CrashAnalyze,
    NotFound
} from 'containers';

export default function routes(store) {
    const requireAuth = (nextState, replaceState) => {
        const state = store.getState();
        const isLoggedIn = Boolean(state.auth.token);
        if (!isLoggedIn) {
            replaceState({
                nextPathname: nextState.location.pathname
            }, '/login');
        }
    };

    return (
        <Route>
            <Route path="/login" component={Login}/>
            <Route component={Layout} onEnter={requireAuth}>
                <Route path="/" component={ListApp}/>
                <Route path="/system" component={System}/>
                <Route path="/app/create" component={CreateApp}/>
                <Route path="/app/:id/info" component={AppInfo}/>
                <Route path="/app/:id/user" component={ClientUser}/>
                <Route path="/app/:id/crash" component={CrashAnalyze}/>
                <Route path="/app/:id/log" component={LogFile}/>
                <Route path="/app/:id/control" component={Control}/>
                <Route path="*" component={NotFound}/>
            </Route>
        </Route>
    );
};
