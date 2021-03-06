import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { appSidebar } from '../../action/layout';
import { fetchApp } from '../../action/application';
import { fetchUsers, clearUsers } from '../../action/clientUser';
import { platformIcon } from '../../helpers/common';
import { InputField } from '../../constants';

export default class ClientUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            filter: {
                platform: 0
            }
        };
        this.performSearch = this.performSearch.bind(this);
        this.handleInputValueChange = this.handleInputValueChange.bind(this);
        this.showUserDetail = this.showUserDetail.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(appSidebar({
            id: this.props.params.id,
            active: 1
        }));
        const self = this;
        jQuery('.select2').select2().on('change', function (e) {
            self.setState({
                filter: {
                    platform: e.target.value
                }
            });
        });
        if (Object.keys(this.props.app).length == 0) {
            this.props.dispatch(fetchApp({
                id: self.props.params.id
            }));
        }
    }

    componentWillUnmount() {
        this.props.dispatch(clearUsers());
    }

    handleInputValueChange(field, event) {
        event.preventDefault();
        this.state.filter[field] = event.target.value;
    }

    performSearch(event) {
        event.preventDefault();
        if (Object.keys(this.props.app).length != 0) {
            this.state.filter['clientId'] = this.props.app.clientId;
            const option = this.state.filter;
            this.props.dispatch(fetchUsers(option));
        }
    }

    showUserDetail(data) {
        event.preventDefault();
        this.setState({
            user: data
        });
        const self = this;
        var modal = jQuery('#show-user-detail-modal');
        modal.on('hidden.bs.modal', function () {
            self.setState({
                user: {}
            });
        });
        modal.modal('show');
    }

    detailElement(name, value) {
        return (
            <li>
                <div style={{padding: '5px 5px'}}>
                    <b>{name}</b>
                    <span className="pull-right">{value}</span>
                </div>
            </li>
        );
    }

    render() {
        const { users } = this.props;
        const userDetail = this.showUserDetail;
        let modalContent;
        const { user } = this.state;
        if (Object.keys(user).length != 0) {
            modalContent = <div>
                <ul className="nav nav-stacked">
                    {this.detailElement('平台', platformIcon(user.platform))}
                    {this.detailElement('UID', user.uid)}
                    {this.detailElement('用户别名', user.alias)}
                    {this.detailElement('设备型号', user.model)}
                    {this.detailElement('IMEI', user.imei)}
                    {this.detailElement('MAC 地址', user.macAddress)}
                    {this.detailElement('系统版本', user.osVersion)}
                    {this.detailElement('应用 ID', user.appId)}
                    {this.detailElement('应用版本号', user.version)}
                    {this.detailElement('应用版本信息', user.versionString)}
                    {this.detailElement('日志打开状态', user.recordOn.toString())}
                </ul>
            </div>
        }
        return (
            <div>
                <div id="show-user-detail-modal" className="modal modal-info" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal"
                                        aria-label="Close"><span
                                    aria-hidden="true">×</span></button>
                                <h4 className="modal-title">用户详细信息</h4>
                            </div>
                            <div className="modal-body">{modalContent}</div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-outline" data-dismiss="modal">关闭</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="box box-primary">
                            <div className="box-header with-border">
                                <h3 className="box-title">检索用户</h3>
                            </div>
                            <div className="box-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <div className="input-group">
                                                <span className="input-group-addon">平台</span>
                                                <select name="platform" className="form-control select2"
                                                        style={{width: '100%', display: 'none'}}>
                                                    <option value="0">ALL</option>
                                                    <option value="1">Android</option>
                                                    <option value="2">iOS</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group">
                                                <span className="input-group-addon">UID</span>
                                                <input type="text"
                                                       onChange={this.handleInputValueChange.bind(this, InputField.uid)}
                                                       className="form-control"
                                                       placeholder="输入 UID"/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group">
                                                <span className="input-group-addon">用户别名</span>
                                                <input type="text"
                                                       onChange={this.handleInputValueChange.bind(this, InputField.alias)}
                                                       className="form-control"
                                                       placeholder="输入用户别名"/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group">
                                                <span className="input-group-addon">设备型号</span>
                                                <input type="text"
                                                       onChange={this.handleInputValueChange.bind(this, InputField.model)}
                                                       className="form-control"
                                                       placeholder="输入设备型号"/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group">
                                                <span className="input-group-addon">IMEI</span>
                                                <input type="text"
                                                       onChange={this.handleInputValueChange.bind(this, InputField.imei)}
                                                       className="form-control"
                                                       placeholder="输入 IMEI"/>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <div className="input-group">
                                                <span className="input-group-addon">MAC</span>
                                                <input type="text"
                                                       onChange={this.handleInputValueChange.bind(this, InputField.macAddress)}
                                                       className="form-control"
                                                       placeholder="输入 MAC 地址"/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group">
                                                <span className="input-group-addon">系统版本</span>
                                                <input type="text"
                                                       onChange={this.handleInputValueChange.bind(this, InputField.osVersion)}
                                                       className="form-control"
                                                       placeholder="输入系统版本"/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group">
                                                <span className="input-group-addon">应用</span>
                                                <input type="text"
                                                       onChange={this.handleInputValueChange.bind(this, InputField.appId)}
                                                       className="form-control"
                                                       placeholder="输入应用 ID"/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group">
                                                <span className="input-group-addon">版本号</span>
                                                <input type="text"
                                                       onChange={this.handleInputValueChange.bind(this, InputField.version)}
                                                       className="form-control"
                                                       placeholder="输入应用版本号"/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group">
                                                <span className="input-group-addon">版本信息</span>
                                                <input type="text"
                                                       onChange={this.handleInputValueChange.bind(this, InputField.versionString)}
                                                       className="form-control"
                                                       placeholder="输入应用版本信息"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 text-center" style={{marginBottom: '15px'}}>
                                        <button type="submit" className="btn btn-primary"
                                                onClick={this.performSearch}
                                                style={{width: '180px'}}>
                                            <i className="fa fa-search"/>&nbsp;&nbsp;&nbsp;&nbsp;检索
                                        </button>
                                    </div>
                                    <div className="col-md-12">
                                        <table className="table table-bordered table-hover">
                                            <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>平台</th>
                                                <th>UID</th>
                                                <th>AppID</th>
                                                <th>应用版本号</th>
                                                <th>应用版本信息</th>
                                                <th>操作</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                users.map(function (item, index) {
                                                    let order = index + 1;
                                                    return (
                                                        <tr key={index}>
                                                            <td>{order}</td>
                                                            <td>{platformIcon(item.platform)}</td>
                                                            <td>{item.uid}</td>
                                                            <td>{item.appId}</td>
                                                            <td>{item.version}</td>
                                                            <td>{item.versionString}</td>
                                                            <td>
                                                                <button className="btn btn-success btn-xs"
                                                                        onClick={userDetail.bind(this, item)}
                                                                        style={{width: '50px'}}>
                                                                    <i className="fa fa-info-circle"/>&nbsp;详细
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ClientUser.propTypes = {
    app: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { app } = state.application;
    const { users } = state.clientUser;
    return {app, users};
}

export default connect(mapStateToProps)(ClientUser)
