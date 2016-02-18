import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchApp, fetchAppStatistic, updateApp, deleteApp, clearApp, clearStatistic } from  '../../action/application';
import { appSidebar, refreshPage } from '../../action/layout';
import { InputField } from '../../constants';

export default class AppInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            form: {}
        };
        this.showDeleteAppModal = this.showDeleteAppModal.bind(this);
        this.handleInputValueChange = this.handleInputValueChange.bind(this);
        this.performUpdate = this.performUpdate.bind(this);
        this.updateCallback = this.updateCallback.bind(this);
    }

    componentDidMount() {
        const params = this.props.params;
        this.props.dispatch(appSidebar({
            id: params.id,
            active: 0
        }));
        this.props.dispatch(fetchApp({id: params.id}, this.updateCallback));
        this.props.dispatch(fetchAppStatistic({id: params.id}));
    }

    componentWillUnmount() {
        this.props.dispatch(clearApp());
        this.props.dispatch(clearStatistic());
    }

    showDeleteAppModal(event) {
        event.preventDefault();
        jQuery('#confirm-delete-modal').modal('show');
    }

    handleInputValueChange(field, event) {
        event.preventDefault();
        this.state.form[field] = event.target.value;
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
    }

    performUpdate(event) {
        event.preventDefault();
        this.props.dispatch(updateApp(this.state.form, this.updateCallback));
    }

    updateCallback(data) {
        this.state.form = data;
        this.props.dispatch(refreshPage({
            title: data.name
        }));
    }

    render() {
        const { app, statistic } = this.props;
        if (Object.keys(app).length == 0) {
            return (
                <div></div>
            );
        }
        let statisticView;
        if (Object.keys(statistic).length > 0) {
            statisticView = (
                <table className="table">
                    <tbody>
                    <tr>
                        <th>用户数</th>
                        <td>{statistic.user.count}</td>
                    </tr>
                    <tr>
                        <th>日志文件数</th>
                        <td>{statistic.log.count}</td>
                    </tr>
                    <tr>
                        <th>崩溃次数</th>
                        <td>{statistic.crash.count}</td>
                    </tr>
                    </tbody>
                </table>
            );
        }
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
                                                <input defaultValue={app.name}
                                                       onChange={this.handleInputValueChange.bind(this, InputField.name)}
                                                       type="text" className="form-control"
                                                       placeholder="输入应用名称"/>
                                            </div>
                                            <div className="form-group">
                                                <label>应用描述</label>
                                                    <textarea defaultValue={app.description}
                                                              onChange={this.handleInputValueChange.bind(this, InputField.description)}
                                                              className="form-control"
                                                              rows="3"
                                                              placeholder="应用描述信息 ..."/>
                                            </div>
                                            <div className="form-group">
                                                <label>Android 应用标识</label>
                                                <input defaultValue={app.packageName}
                                                       onChange={this.handleInputValueChange.bind(this, InputField.packageName)}
                                                       type="text"
                                                       className="form-control"
                                                       placeholder="com.android.example"/>
                                            </div>
                                            <div className="form-group">
                                                <label>iOS 应用标识</label>
                                                <input defaultValue={app.bundleId}
                                                       onChange={this.handleInputValueChange.bind(this, InputField.bundleId)}
                                                       type="text"
                                                       className="form-control"
                                                       placeholder="com.ios.Example"/>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>个推 AppID</label>
                                                <input defaultValue={app.getuiAppId}
                                                       onChange={this.handleInputValueChange.bind(this, InputField.getuiAppId)}
                                                       type="text"
                                                       className="form-control"
                                                       placeholder="输入个推 AppID"/>
                                            </div>
                                            <div className="form-group">
                                                <label>个推 AppKey</label>
                                                <input defaultValue={app.getuiAppKey}
                                                       onChange={this.handleInputValueChange.bind(this, InputField.getuiAppKey)}
                                                       type="text"
                                                       className="form-control"
                                                       placeholder="输入个推 AppKey"/>
                                            </div>
                                            <div className="form-group">
                                                <label>个推 MasterSecret</label>
                                                <input defaultValue={app.getuiMasterSecret}
                                                       onChange={this.handleInputValueChange.bind(this, InputField.getuiMasterSecret)}
                                                       type="text"
                                                       className="form-control"
                                                       placeholder="输入个推 MasterSecret"/>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="box-footer">
                                <button type="submit"
                                        onClick={this.performUpdate}
                                        className="btn btn-primary">更新
                                </button>
                                <button type="submit" className="btn btn-danger pull-right"
                                        onClick={this.showDeleteAppModal}>
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
                                        <th>App ID</th>
                                        <td>{app.id}</td>
                                        <td/>
                                    </tr>
                                    <tr>
                                        <th>App Key</th>
                                        <td>{app.clientId}</td>
                                        <td style={{textAlign: 'right'}}>
                                            <button className="btn btn-box-tool">
                                                <i className="fa fa-copy"/>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Secret Key</th>
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
                            <div className="box-body no-padding">
                                {statisticView}
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

AppInfo.propTypes = {
    app: PropTypes.object.isRequired,
    statistic: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { app, statistic } = state.application;
    return {app, statistic};
}

export default connect(mapStateToProps)(AppInfo)
