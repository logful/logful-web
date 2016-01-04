import React, { Component, PropTypes } from 'react';
import Sidebar from '../../components/Sidebar';
import PageTitle from '../../components/PageTitle';

import '../../assets/bootstrap/css/bootstrap.css';
import '../../assets/font-awesome/css/font-awesome.css';
import '../../assets/ionicons/css/ionicons.css';
import '../../assets/admin-lte/css/AdminLTE.css';
import '../../assets/admin-lte/css/skins/_all-skins.css';

import 'jquery';
import '../../assets/bootstrap/js/bootstrap';
import '../../assets/admin-lte/js/app';
import '../../assets/plugins/slimScroll/jquery.slimscroll';

export default class Layout extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        document.body.classList.add('hold-transition', 'skin-blue', 'sidebar-mini');
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
                        <Sidebar test={['3423412342']}/>
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
                        <b>Version</b> 2.3.0
                    </div>
                    <strong>Copyright &copy; 2014-2015 <a href="http://almsaeedstudio.com">Almsaeed Studio</a>.</strong>
                    All rights reserved.
                </footer>
            </div>
        );
    }
}