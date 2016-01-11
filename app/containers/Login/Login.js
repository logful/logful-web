import React, { Component } from 'react';

import 'ionicons/css/ionicons.min.css';
import 'font-awesome/css/font-awesome.min.css';
import '../../assets/bootstrap/css/bootstrap.css';
import '../../assets/admin-lte/css/AdminLTE.css';
import '../../assets/plugins/iCheck/square/blue.css';

import '../../assets/plugins/jQuery/jQuery-2.1.4.min';
import '../../assets/bootstrap/js/bootstrap';
import '../../assets/plugins/iCheck/icheck';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            remember: false
        };
        this.handleInputValueChange = this.handleInputValueChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        let elem = jQuery('input');
        const self = this;
        elem.iCheck({
            checkboxClass: 'icheckbox_square-blue',
            radioClass: 'iradio_square-blue',
            increaseArea: '20%'
        });
        elem.on('ifChecked', function (event) {
            self.state.remember = true;
        });
        elem.on('ifUnchecked', function (event) {
            self.state.remember = false;
        });
    }

    componentWillMount() {
        document.body.classList.add('hold-transition', 'login-page');
    }

    handleInputValueChange(field, event) {
        event.preventDefault();
        this.state[field] = event.target.value;
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.username && this.state.password) {
            console.log(this.state);
        }
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
                            <input type="text"
                                   onChange={this.handleInputValueChange.bind(this, 'username')}
                                   className="form-control" placeholder="Username"/>
                            <span className="glyphicon glyphicon-envelope form-control-feedback"/>
                        </div>
                        <div className="form-group has-feedback">
                            <input type="password"
                                   onChange={this.handleInputValueChange.bind(this, 'password')}
                                   className="form-control" placeholder="Password"/>
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