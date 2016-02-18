import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { login } from '../../action/auth';
import { LOGGED_IN } from '../../constants';

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
        const self = this;
        if (this.state.username && this.state.password) {
            const body = this.state;
            self.props.dispatch(login(body, function () {
                self.props.history.pushState({}, '/');
            }));
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

Login.propTypes = {
    dispatch: PropTypes.func.isRequired
};

export default connect()(Login)
