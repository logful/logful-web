import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../../components/Sidebar';
import PageTitle from '../../components/PageTitle';
import { clearNotification } from '../../action/notification';
var toastr = require('toastr');

import '../../assets/bootstrap/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'ionicons/css/ionicons.min.css';
import 'react-toggle/style.css';
import 'toastr/build/toastr.min.css';
import '../../assets/css/animate.css';
import '../../assets/plugins/datatables/dataTables.bootstrap.css';
import '../../assets/plugins/daterangepicker/daterangepicker.css'
import '../../assets/admin-lte/css/skins/_all-skins.min.css';
import '../../assets/plugins/iCheck/all.css';
import '../../assets/plugins/timepicker/bootstrap-timepicker.min.css';
import '../../assets/plugins/select2/select2.min.css';
import '../../assets/plugins/ionslider/ion.rangeSlider.css';
import '../../assets/plugins/ionslider/ion.rangeSlider.skinNice.css';
import '../../assets/admin-lte/css/AdminLTE.min.css';
import '../../assets/css/logful-style.css';

import '../../assets/plugins/jQuery/jQuery-2.1.4.min';
import '../../assets/bootstrap/js/bootstrap.min';

import '../../assets/plugins/datatables/jquery.dataTables.min';
import '../../assets/plugins/datatables/dataTables.bootstrap.min';
import '../../assets/plugins/slimScroll/jquery.slimscroll.min';

import '../../assets/plugins/select2/select2.min';
import '../../assets/plugins/iCheck/icheck.min';
import '../../assets/plugins/daterangepicker/moment.min';
import '../../assets/plugins/daterangepicker/daterangepicker';

import '../../assets/admin-lte/js/app.min';
import '../../assets/plugins/ionslider/ion.rangeSlider.min';
import 'bootstrap-tagsinput/dist/bootstrap-tagsinput.min';

export default class Layout extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        document.body.classList.add('hold-transition', 'skin-blue', 'sidebar-mini');
    }

    componentDidMount() {
        toastr.options.closeDuration = 300;
        toastr.options.timeOut = 2000;
    }

    componentWillUnmount() {
        this.state.mounted = false;
    }

    componentWillReceiveProps(nextProps) {
        const { message } = nextProps;
        if (Object.keys(message).length > 0) {
            toastr.error(message.content, message.title);
            this.props.dispatch(clearNotification());
        }
    }

    render() {
        return (
            <div className="wrapper">
                {/* Header */}
                <header className="main-header">
                    <a href="#" className="logo">
                        <span className="logo-mini"><b>L</b>F</span>
                        <span className="logo-lg"><b>Log</b>FUL</span>
                    </a>
                    <nav className="navbar navbar-static-top" role="navigation">
                        {/*
                         <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
                         <span className="sr-only">Toggle navigation</span>
                         </a>
                         */}
                        <PageTitle titleText={'应用管理'}/>
                        <div className="navbar-custom-menu">
                        </div>
                    </nav>
                </header>

                {/* Sidebar */}
                <aside className="main-sidebar">
                    <section className="sidebar">
                        <Sidebar data={this.props.sidebar}/>
                    </section>
                </aside>

                {/* Content */}
                <div className="content-wrapper">
                    <section className="content">
                        {this.props.children}
                    </section>
                </div>

                {/* Footer */}
                <footer className="main-footer">
                    <div className="pull-right hidden-xs">
                        <b>Version</b> 0.3.0
                    </div>
                    <strong>Copyright &copy; 2015-2016 Logful.</strong>
                </footer>
            </div>
        );
    }
}

Layout.propTypes = {
    sidebar: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { sidebar } = state.layout;
    const { message } = state.notification;
    return {sidebar, message};
}

export default connect(mapStateToProps)(Layout)
