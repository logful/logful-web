import 'whatwg-fetch';
import React, { Component } from 'react';
import { createApp } from '../../action/application';
import { InputField } from '../../constants';

export default class CreateApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: {
                error: false,
                message: null
            },
            form: {}
        };
        this.cancelCreateApp = this.cancelCreateApp.bind(this);
        this.confirmCreateApp = this.confirmCreateApp.bind(this);
        this.handleInputValueChange = this.handleInputValueChange.bind(this);
    }

    cancelCreateApp(event) {
        event.preventDefault();
        this.props.history.pushState({}, '/');
    }

    handleInputValueChange(field, event) {
        event.preventDefault();
        if (this.state.name.error) {
            this.setState({
                name: {
                    error: false,
                    message: null
                }
            });
        }
        this.state.form[field] = event.target.value;
    }

    confirmCreateApp(event) {
        event.preventDefault();
        const self = this;
        if (!this.state.form.name) {
            this.setState({
                name: {
                    error: true,
                    message: '名称必须填写'
                }
            });
        }
        else {
            createApp(self.state.form, function (success, error) {
                if (success) {
                    self.props.history.pushState({}, '/');
                }
            });
        }
    }

    formGroupClassName(error) {
        return error ? 'form-group has-error' : 'form-group'
    }

    render() {
        return (
            <div className="row">
                <div className="col-xs-12">
                    <div className="box box-primary">
                        <div className="box-header with-border">
                            <h3 className="box-title">创建应用</h3>
                        </div>
                        <form role="form">
                            <div className="box-body">
                                <div className={this.formGroupClassName(this.state.name.error)}>
                                    <label>新应用名称</label>
                                    <input type="text" className="form-control"
                                           onChange={this.handleInputValueChange.bind(this, InputField.name)}
                                           placeholder="输入应用名称"/>
                                    <span className="text-red">{this.state.name.message}</span>
                                </div>
                                <div className="form-group">
                                    <label>应用描述</label>
                                    <textarea className="form-control" rows="3"
                                              onChange={this.handleInputValueChange.bind(this, InputField.description)}
                                              placeholder="应用描述信息 ..."/>
                                </div>
                            </div>
                            <div className="box-footer">
                                <button type="submit" onClick={this.cancelCreateApp} className="btn btn-default">取消
                                </button>
                                <button type="submit" onClick={this.confirmCreateApp}
                                        className="btn btn-info pull-right">创建
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
