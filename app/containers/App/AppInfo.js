import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchApp, updateApp, deleteApp } from  '../../action/application';
import { appSidebar } from '../../action/layout';

export default class AppInfo extends Component {

    constructor(props) {
        super(props);
        this.modalHideCallback = this.modalHideCallback.bind(this);
        this.updateApp = this.updateApp.bind(this);
    }

    componentDidMount() {
        const params = this.props.params;
        this.props.dispatch(appSidebar({
            id: params.id,
            active: 0
        }));
        this.props.dispatch(fetchApp({
            id: params.id
        }));
    }

    showDeleteAppModal(event) {
        event.preventDefault();
        jQuery('#confirm-delete-modal').modal('show');
    }

    updateApp(event) {
        event.preventDefault();
        // TODO
    }

    confirmDeleteApp(event) {
        event.preventDefault();
        const self = this;
        let modal = jQuery('#confirm-delete-modal');
        if (Object.keys(this.props.app).length != 0) {
            deleteApp({
                id: this.props.app.id
            }, function (success, error) {
                if (success) {
                    modal.modal('hide');
                    self.props.history.pushState({}, '/');
                }
            });
        }
        //var modal = jQuery('#confirm-delete-modal');
        //modal.on('hidden.bs.modal', this.modalHideCallback);
        //modal.modal('hide');
    }

    modalHideCallback() {
        this.props.history.pushState({}, '/');
    }

    render() {
        const app = this.props.app;
        if (!app.id) {
            return (
                <div></div>
            );
        }
        else {
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
                                                    <input defaultValue={app.name} type="text" className="form-control"
                                                           placeholder="输入应用名称"/>
                                                </div>
                                                <div className="form-group">
                                                    <label>应用描述</label>
                                                    <textarea className="form-control" rows="3"
                                                              placeholder="应用描述信息 ..."/>
                                                </div>
                                                <div className="form-group">
                                                    <label>Android 应用标识</label>
                                                    <input type="text" className="form-control"
                                                           placeholder="com.android.example"/>
                                                </div>
                                                <div className="form-group">
                                                    <label>iOS 应用标识</label>
                                                    <input type="text" className="form-control"
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
                                            <td>{app.id}</td>
                                            <td/>
                                        </tr>
                                        <tr>
                                            <td>App Key</td>
                                            <td>{app.clientId}</td>
                                            <td style={{textAlign: 'right'}}>
                                                <button className="btn btn-box-tool">
                                                    <i className="fa fa-copy"/>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Master Key</td>
                                            <td>{app.clientSecret}</td>
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
                    <div id="confirm-delete-modal" className="modal modal-danger" role="dialog">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal"
                                            aria-label="Close"><span
                                        aria-hidden="true">×</span></button>
                                    <h4 className="modal-title">删除应用</h4>
                                </div>
                                <div className="modal-body">
                                    <p>确定要删除应用吗?</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-outline pull-left" data-dismiss="modal">
                                        取消
                                    </button>
                                    <button type="button" className="btn btn-outline"
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
}

AppInfo.propTypes = {
    app: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const {app} = state.application;
    if (app) {
        return {app};
    }
    return {};
}

export default connect(mapStateToProps)(AppInfo)
