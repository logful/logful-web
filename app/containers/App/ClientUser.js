import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { appSidebar } from '../../action/layout';
import { fetchUsers, clearUsers } from '../../action/clientUser';

export const InputField = {
    uid: 'uid',
    alias: 'alias',
    model: 'model',
    imei: 'imei',
    macAddress: 'macAddress',
    osVersion: 'osVersion',
    appId: 'appId',
    version: 'version',
    versionString: 'versionString'
};

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
        const option = this.state.filter;
        this.props.dispatch(fetchUsers(option));
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

    platformIcon(platform) {
        switch (platform) {
            case 1:
                return <i className="fa fa-android"/>;
            case 2:
                return <i className="fa fa-apple"/>;
            default:
                return <i/>
        }
    }

    render() {
        const { users } = this.props;
        const userDetail = this.showUserDetail;
        let modalContent;
        const { user } = this.state;
        if (Object.keys(user).length != 0) {
            modalContent = <div>
                <ul className="nav nav-stacked">
                    {this.detailElement('平台', this.platformIcon(user.platform))}
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
                                            <label>平台</label>
                                            <select name="platform" className="form-control select2"
                                                    style={{width: '100%'}}>
                                                <option value="0">ALL</option>
                                                <option value="1">Android</option>
                                                <option value="2">iOS</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>UID</label>
                                            <input type="text"
                                                   onChange={this.handleInputValueChange.bind(this, InputField.uid)}
                                                   className="form-control"
                                                   placeholder="输入 UID"/>
                                        </div>
                                        <div className="form-group">
                                            <label>用户别名</label>
                                            <input type="text"
                                                   onChange={this.handleInputValueChange.bind(this, InputField.alias)}
                                                   className="form-control"
                                                   placeholder="输入用户别名"/>
                                        </div>
                                        <div className="form-group">
                                            <label>设备型号</label>
                                            <input type="text"
                                                   onChange={this.handleInputValueChange.bind(this, InputField.model)}
                                                   className="form-control"
                                                   placeholder="输入设备型号"/>
                                        </div>
                                        <div className="form-group">
                                            <label>IMEI</label>
                                            <input type="text"
                                                   onChange={this.handleInputValueChange.bind(this, InputField.imei)}
                                                   className="form-control"
                                                   placeholder="输入 IMEI"/>
                                        </div>

                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>MAC 地址</label>
                                            <input type="text"
                                                   onChange={this.handleInputValueChange.bind(this, InputField.macAddress)}
                                                   className="form-control"
                                                   placeholder="输入 MAC 地址"/>
                                        </div>
                                        <div className="form-group">
                                            <label>系统版本</label>
                                            <input type="text"
                                                   onChange={this.handleInputValueChange.bind(this, InputField.osVersion)}
                                                   className="form-control"
                                                   placeholder="输入系统版本"/>
                                        </div>
                                        <div className="form-group">
                                            <label>应用 ID</label>
                                            <input type="text"
                                                   onChange={this.handleInputValueChange.bind(this, InputField.appId)}
                                                   className="form-control"
                                                   placeholder="输入应用 ID"/>
                                        </div>
                                        <div className="form-group">
                                            <label>应用版本号</label>
                                            <input type="text"
                                                   onChange={this.handleInputValueChange.bind(this, InputField.version)}
                                                   className="form-control"
                                                   placeholder="输入应用版本号"/>
                                        </div>
                                        <div className="form-group">
                                            <label>应用版本信息</label>
                                            <input type="text"
                                                   onChange={this.handleInputValueChange.bind(this, InputField.versionString)}
                                                   className="form-control"
                                                   placeholder="输入应用版本信息"/>
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
    users: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { users } = state.clientUser;
    return {users};
}

export default connect(mapStateToProps)(ClientUser)
