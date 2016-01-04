import React, { Component } from 'react';

import '../../assets/bootstrap/css/bootstrap.css';
import '../../assets/font-awesome/css/font-awesome.css';
import '../../assets/ionicons/css/ionicons.css';
import '../../assets/admin-lte/css/AdminLTE.css';
import '../../assets/plugins/iCheck/square/blue.css';

import 'jquery';
import '../../assets/bootstrap/js/bootstrap';
import '../../assets/plugins/iCheck/icheck';

export default class Login extends Component {

    componentDidMount() {
        $(function () {
            $('input').iCheck({
                checkboxClass: 'icheckbox_square-blue',
                radioClass: 'iradio_square-blue',
                increaseArea: '20%'
            });
        });
    }

    componentWillMount() {
        document.body.classList.add('hold-transition', 'login-page');
    }

    handleSubmit(event) {
        // TODO
        console.log(event);
        event.preventDefault();
    }

    render() {
        return (
            <div className="login-box">
                <div className="login-logo">
                    <a href="#"><b>Log</b>FUL</a>
                </div>
                {/* Login box */}
                <div className="login-box-body">
                    <p className="login-box-msg">Sign in to start your session</p>
                    <form action="" method="post" onSubmit={this.handleSubmit}>
                        <div className="form-group has-feedback">
                            <input type="email" className="form-control" placeholder="Username"/>
                            <span className="glyphicon glyphicon-envelope form-control-feedback"/>
                        </div>
                        <div className="form-group has-feedback">
                            <input type="password" className="form-control" placeholder="Password"/>
                            <span className="glyphicon glyphicon-lock form-control-feedback"/>
                        </div>
                        <div className="row">
                            <div className="col-xs-8">
                                <div className="checkbox icheck">
                                    <label>
                                        <input type="checkbox"/>&nbsp; Remember Me
                                    </label>
                                </div>
                            </div>
                            <div className="col-xs-4">
                                <button type="submit" className="btn btn-primary btn-block btn-flat">Sign In</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}