import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { appSidebar } from '../../action/layout';
import { fetchApp } from '../../action/application';
import FileViewer from '../../components/FileViewer';
import { fileSize, platformIcon } from '../../helpers/common';
import { formatUnix } from '../../helpers/datetime';
import { fetchCrashFiles, fetchCrashFile, clearCrashFiles, clearCrashFile } from '../../action/crashFile';
import { InputField } from '../../constants';

export default class CrashAnalyze extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isViewerOpen: false,
            filter: {
                platform: 0
            }
        };
        this.handleInputValueChange = this.handleInputValueChange.bind(this);
        this.performSearch = this.performSearch.bind(this);
        this.viewFileContent = this.viewFileContent.bind(this);
        this.closeFileViewer = this.closeFileViewer.bind(this);
    }

    componentDidMount() {
        const params = this.props.params;
        this.props.dispatch(appSidebar({
            id: params.id,
            active: 3
        }));
        const self = this;
        jQuery('.select2').select2().on('change', function (e) {
            self.setState({
                filter: {
                    platform: e.target.value
                }
            });
        });
        jQuery('input[name="daterange"]').daterangepicker({
            autoUpdateInput: false,
            locale: {
                format: 'YYYY/MM/DD'
            }
        }).on('apply.daterangepicker', function (event, picker) {
            const startDate = picker.startDate.format('YYYY/MM/DD');
            const endDate = picker.endDate.format('YYYY/MM/DD');
            jQuery(this).val(startDate + ' - ' + endDate);
            self.state.filter['startDate'] = startDate;
            self.state.filter['endDate'] = endDate;
        });
        if (Object.keys(this.props.app).length == 0) {
            this.props.dispatch(fetchApp({
                id: self.props.params.id
            }));
        }
    }

    componentWillUnmount() {
        this.props.dispatch(clearCrashFiles());
        this.props.dispatch(clearCrashFile());
    }

    handleInputValueChange(field, event) {
        event.preventDefault();
        this.state.filter[field] = event.target.value;
    }

    viewFileContent(params) {
        this.setState({
            isViewerOpen: true
        });
        this.props.dispatch(fetchCrashFile(params));
    }

    closeFileViewer() {
        this.setState({
            isViewerOpen: false
        });
        this.props.dispatch(clearCrashFile());
    }

    performSearch(event) {
        event.preventDefault();
        if (Object.keys(this.props.app).length != 0) {
            this.state.filter['clientId'] = this.props.app.clientId;
            const option = this.state.filter;
            this.props.dispatch(fetchCrashFiles(option));
        }
    }

    render() {
        const { files, file } = this.props;
        const viewFile = this.viewFileContent;
        return (
            <div>
                <FileViewer isOpen={this.state.isViewerOpen} file={file} onRequestClose={this.closeFileViewer}/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="box box-primary">
                            <div className="box-header with-border">
                                <h3 className="box-title">检索崩溃日志文件</h3>
                            </div>
                            <div className="box-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <div className="input-group">
                                                <div className="input-group-addon">
                                                    平台
                                                </div>
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
                                                <span className="input-group-addon">ID</span>
                                                <input type="text"
                                                       onChange={this.handleInputValueChange.bind(this, InputField.id)}
                                                       className="form-control"
                                                       placeholder="输入文件 ID"/>
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
                                                <span className="input-group-addon">别名</span>
                                                <input type="text"
                                                       onChange={this.handleInputValueChange.bind(this, InputField.alias)}
                                                       className="form-control"
                                                       placeholder="输入用户别名"/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group">
                                                <span className="input-group-addon">型号</span>
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
                                        <div className="form-group">
                                            <div className="input-group">
                                                <div className="input-group-addon">
                                                    <i className="fa fa-calendar"/>&nbsp;日期
                                                </div>
                                                <input type="text" className="form-control pull-right"
                                                       name="daterange"/>
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
                                                <th>时间</th>
                                                <th>UID</th>
                                                <th>AppID</th>
                                                <th>应用版本号</th>
                                                <th>应用版本信息</th>
                                                <th>操作</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                files.map(function (item, index) {
                                                    let order = index + 1;
                                                    let dateString = formatUnix(item.date / 1000, 'YYYY/MM/DD HH:mm:ss.SSS');
                                                    return (
                                                        <tr key={index}>
                                                            <td>{order}</td>
                                                            <td>{platformIcon(item.platform)}</td>
                                                            <td>{dateString}</td>
                                                            <td>{item.uid}</td>
                                                            <td>{item.appId}</td>
                                                            <td>{item.version}</td>
                                                            <td>{item.versionString}</td>
                                                            <td>
                                                                <button className="btn btn-primary btn-xs"
                                                                        onClick={viewFile.bind(this, item)}
                                                                        style={{width: '50px', marginRight: '10px'}}>
                                                                    <i className="fa fa-eye"/>&nbsp;查看
                                                                </button>
                                                                <button className="btn btn-success btn-xs"
                                                                        style={{width: '50px'}}>
                                                                    <i className="fa fa-download"/>&nbsp;下载
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
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

CrashAnalyze.propTypes = {
    app: PropTypes.object.isRequired,
    files: PropTypes.array.isRequired,
    file: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { app } = state.application;
    const { files, file } = state.crashFile;
    return {app, files, file};
}

export default connect(mapStateToProps)(CrashAnalyze)
