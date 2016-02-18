import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router'
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/lib/locale-data/en';

import routes from 'routes';
import * as i18n from './i18n';
import { store } from 'root';

import 'assets/bootstrap/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'ionicons/css/ionicons.min.css';
import 'react-toggle/style.css';
import 'toastr/build/toastr.min.css';
import 'assets/css/animate.css';
import 'assets/plugins/datatables/dataTables.bootstrap.css';
import 'assets/plugins/daterangepicker/daterangepicker.css'
import 'assets/admin-lte/css/skins/_all-skins.min.css';
import 'assets/plugins/iCheck/all.css';
import 'assets/plugins/timepicker/bootstrap-timepicker.min.css';
import 'assets/plugins/select2/select2.min.css';
import 'assets/plugins/ionslider/ion.rangeSlider.css';
import 'assets/plugins/ionslider/ion.rangeSlider.skinNice.css';
import 'assets/admin-lte/css/AdminLTE.min.css';
import 'assets/css/logful-style.css';

import 'assets/plugins/jQuery/jQuery-2.1.4.min';
import 'assets/bootstrap/js/bootstrap.min';

import 'assets/plugins/datatables/jquery.dataTables.min';
import 'assets/plugins/datatables/dataTables.bootstrap.min';
import 'assets/plugins/slimScroll/jquery.slimscroll';
import 'assets/plugins/fastclick/fastclick.min';

import 'assets/plugins/select2/select2.min';
import 'assets/plugins/iCheck/icheck.min';
import 'assets/plugins/daterangepicker/moment.min';
import 'assets/plugins/daterangepicker/daterangepicker';

import 'assets/plugins/ionslider/ion.rangeSlider.min';
import 'bootstrap-tagsinput/dist/bootstrap-tagsinput.min';
import 'assets/admin-lte/js/app';

addLocaleData(en);

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
