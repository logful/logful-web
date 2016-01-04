import React, { Component } from 'react';

export default class CreateApp extends Component {

    constructor(props) {
        super(props);
        this.cancelCreateApp = this.cancelCreateApp.bind(this);
        this.confirmCreateApp = this.confirmCreateApp.bind(this);
        this.state = {
            name: {
                error: false,
                message: null
            }
        };
    }

    cancelCreateApp(event) {
        event.preventDefault();
        this.props.history.pushState({}, '/');
    }

    confirmCreateApp(event) {
        event.preventDefault();
        // TODO
        this.setState({
            name: {
                error: true,
                message: '名称必须填写'
            }
        });
        //this.props.history.pushState({}, '/');
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
                                    <input type="email" className="form-control" id="exampleInputEmail1"
                                           placeholder="输入应用名称"/>
                                    <span className="text-red">{this.state.name.message}</span>
                                </div>
                                <div className="form-group">
                                    <label>应用描述</label>
                                    <textarea className="form-control" rows="3" placeholder="应用描述信息 ..."/>
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
