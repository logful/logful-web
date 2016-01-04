import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router'
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/lib/locale-data/en';
import configureStore from './utils/configStore';
import routes from 'routes';

import * as i18n from './i18n';

addLocaleData(en);

const initialState = {};

// Create Redux store
const store = configureStore(initialState);

const defaultLocale = 'en';

const intlData = {
    locale: defaultLocale,
    messages: i18n[defaultLocale]
};

const target = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <IntlProvider key="intl" {...intlData}>
            <ReduxRouter >
                {routes(store)}
            </ReduxRouter>
        </IntlProvider>
    </Provider>,
    target
);
