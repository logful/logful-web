import React, { Component } from 'react';
import 'jquery';

export default class AppInfo extends Component {

    constructor(props) {
        super(props);
        this.modalHideCallback = this.modalHideCallback.bind(this);
    }

    showDeleteAppModal(event) {
        event.preventDefault();
        $('#confirm-delete-modal').modal('show');
    }

    confirmDeleteApp(event) {
        event.preventDefault();
        var modal = $('#confirm-delete-modal');
        modal.on('hidden.bs.modal', this.modalHideCallback);
        modal.modal('hide');
    }

    modalHideCallback() {
        this.props.history.pushState({}, '/');
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="box box-primary">
                            <div className="box-header with-border">
                                <h3 className="box-title">基本信息</h3>
                            </div>
                            <div className="box-body">
                                <form role="form">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>应用名称</label>
                                                <input type="email" className="form-control" id="exampleInputEmail1"
                                                       placeholder="输入应用名称"/>
                                            </div>
                                            <div className="form-group">
                                                <label>应用描述</label>
                                                <textarea className="form-control" rows="3" placeholder="应用描述信息 ..."/>
                                            </div>
                                            <div className="form-group">
                                                <label>Android 应用标识</label>
                                                <input type="email" className="form-control" id="exampleInputEmail1"
                                                       placeholder="com.android.example"/>
                                            </div>
                                            <div className="form-group">
                                                <label>iOS 应用标识</label>
                                                <input type="email" className="form-control" id="exampleInputEmail1"
                                                       placeholder="com.ios.Example"/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">

                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="box-footer">
                                <button type="submit" className="btn btn-primary">更新</button>
                                <button type="submit" className="btn btn-danger pull-right"
                                        onClick={this.showDeleteAppModal.bind(this)}>
                                    <i className="fa fa-warning"/>&nbsp;&nbsp;删除应用
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="box box-success">
                            <div className="box-header with-border">
                                <h3 className="box-title">应用接入</h3>
                            </div>
                            <div className="box-body no-padding">
                                <table className="table">
                                    <tbody>
                                    <tr>
                                        <td>App ID</td>
                                        <td>HrbhvLYAnbsFLXyHxhJ5g15p-gzGzoHsz</td>
                                        <td/>
                                    </tr>
                                    <tr>
                                        <td>App Key</td>
                                        <td>a2LLxvtRShj0xtEfqy30BtWa</td>
                                        <td style={{textAlign: 'right'}}>
                                            <button className="btn btn-box-tool">
                                                <i className="fa fa-copy"/>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Master Key</td>
                                        <td>9Ga77fhv6UqGeqQSQhrkvXBB</td>
                                        <td style={{textAlign: 'right'}}>
                                            <button className="btn btn-box-tool">
                                                <i className="fa fa-refresh"/>
                                            </button>
                                            <button className="btn btn-box-tool">
                                                <i className="fa fa-copy"/>
                                            </button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="box box-info">
                            <div className="box-header with-border">
                                <h3 className="box-title">统计信息</h3>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Confirm delete app dialog */}
                <div id="confirm-delete-modal" className="modal fade">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal"
                                        aria-label="Close"><span
                                    aria-hidden="true">×</span></button>
                                <h4 className="modal-title">删除应用</h4>
                            </div>
                            <div className="modal-body">
                                <p>One fine body…</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default pull-left" data-dismiss="modal">
                                    取消
                                </button>
                                <button type="button" className="btn btn-primary"
                                        onClick={this.confirmDeleteApp.bind(this)}>确认
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
