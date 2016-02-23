import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../../components/Sidebar';
import PageTitle from '../../components/PageTitle';
import { clearNotification } from '../../action/notification';
import { LOG_OUT } from '../../constants';
import { logout } from '../../action/auth';

var toastr = require('toastr');
var logo = require('../../assets/logo.jpg');

export default class Layout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: true
        };
        this.toggleSidebar = this.toggleSidebar.bind(this);
        this.performSetting = this.performSetting.bind(this);
        this.performLogout = this.performLogout.bind(this);
    }

    componentWillMount() {
        document.body.classList.add('skin-blue', 'sidebar-mini', 'fixed');
    }

    componentDidMount() {
        toastr.options.closeDuration = 300;
        toastr.options.timeOut = 2000;
    }

    componentWillUnmount() {
        this.state.mounted = false;
    }

    performSetting(event) {
        event.preventDefault();
    }

    performLogout(event) {
        event.preventDefault();
        const body = this.state;
        const self = this;
        self.props.dispatch(logout(body, function () {
            self.props.history.pushState({}, '/login');
        }));
    }

    componentWillReceiveProps(nextProps) {
        const { message } = nextProps;
        if (Object.keys(message).length > 0) {
            toastr.error(message.content, message.title);
            this.props.dispatch(clearNotification());
        }
    }

    toggleSidebar(event) {
        let temp = !this.state.expanded;
        this.setState({
            expanded: temp
        });
    }

    render() {
        const toggleContainerStyle = {
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%'
        };
        let toggleIcon = this.state.expanded ? 'fa fa-angle-left' : 'fa fa-angle-right';
        return (
            <div className="wrapper">
                {/* Header */}
                <header className="main-header">
                    <a href="#" className="logo">
                        <span className="logo-mini"><b>L</b>F</span>
                        <span className="logo-lg"><b>Log</b>FUL</span>
                    </a>
                    <nav className="navbar navbar-static-top" role="navigation">
                        <PageTitle data={this.props.page}/>
                        <div className="navbar-custom-menu">
                            <ul className="nav navbar-nav">
                                <li className="dropdown user user-menu">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown"
                                       aria-expanded="false">
                                        <img src={logo} className="user-image"
                                             alt="User Image">
                                            <span className="hidden-xs">Admin</span></img>
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li className="user-header">
                                            <img src={logo} className="img-circle"
                                                 alt="User Image">
                                                <p>
                                                    Admin
                                                    <small>logful</small>
                                                </p>
                                            </img>
                                        </li>
                                        <li className="user-footer">
                                            <div className="pull-left">
                                                <a href="#" className="btn btn-default btn-flat"
                                                   onClick={this.performSetting}>Setting</a>
                                            </div>
                                            <div className="pull-right">
                                                <a href="#" className="btn btn-default btn-flat"
                                                   onClick={this.performLogout}>Sign out</a>
                                            </div>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </header>

                {/* Sidebar */}
                <aside className="main-sidebar">
                    <section className="sidebar">
                        <Sidebar data={this.props.sidebar}/>
                    </section>
                    <div style={toggleContainerStyle}>
                        <a href="#"
                           className="logful-sidebar-toggle"
                           onClick={this.toggleSidebar}
                           data-toggle="offcanvas"
                           role="button">
                            <i className={toggleIcon}/>
                        </a>
                    </div>
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
    page: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { sidebar, page } = state.layout;
    const { message } = state.notification;
    return {sidebar, page, message};
}

export default connect(mapStateToProps)(Layout)
