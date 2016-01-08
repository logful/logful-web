import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import FileViewer from '../../components/FileViewer';
import { appSidebar } from '../../action/layout';
import { fetchApp } from '../../action/application';
import { fetchFiles, fetchFile, clearFiles, clearFile } from '../../action/logFile';
import { Select } from 'react-select';
import { formatNow, formatUnix } from '../../helpers/datetime';
import { levelToString, levelSpanClass, fileSize, platformIcon } from '../../helpers/common';
import { InputField } from '../../constants';

export default class LogFile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isViewerOpen: false,
            filter: {
                level: 0,
                startDate: formatNow('YYYY/MM/DD'),
                endDate: formatNow('YYYY/MM/DD')
            }
        };
        this.handleInputValueChange = this.handleInputValueChange.bind(this);
        this.performSearch = this.performSearch.bind(this);
        this.viewFileContent = this.viewFileContent.bind(this);
        this.downloadFile = this.downloadFile.bind(this);
        this.closeFileViewer = this.closeFileViewer.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(appSidebar({
            id: this.props.params.id,
            active: 2
        }));
        const self = this;
        jQuery('.select2').select2().on('change', function (e) {
            self.state.filter['level'] = e.target.value;
        });
        jQuery('input[name="daterange"]').daterangepicker({
            locale: {
                format: 'YYYY/MM/DD'
            }
        }).on('apply.daterangepicker', function (event, picker) {
            self.state.filter['startDate'] = picker.startDate.format('YYYY/MM/DD');
            self.state.filter['endDate'] = picker.endDate.format('YYYY/MM/DD');
        });
        if (Object.keys(this.props.app).length == 0) {
            this.props.dispatch(fetchApp({
                id: self.props.params.id
            }));
        }
    }

    componentWillUnmount() {
        this.props.dispatch(clearFiles());
        this.props.dispatch(clearFile());
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
            this.props.dispatch(fetchFiles(option));
        }
    }

    viewFileContent(params) {
        this.setState({
            isViewerOpen: true
        });
        this.props.dispatch(fetchFile(params));
    }

    downloadFile(param) {
        // TODO
    }

    closeFileViewer() {
        this.setState({
            isViewerOpen: false
        });
        this.props.dispatch(clearFile());
    }

    render() {
        const { files, file } = this.props;
        const viewFile = this.viewFileContent;
        const downloadFile = this.downloadFile;
        return (
            <div>
                <FileViewer isOpen={this.state.isViewerOpen} file={file} onRequestClose={this.closeFileViewer}>
                </FileViewer>
                <div className="box box-primary">
                    <div className="box-header with-border">
                        <h3 className="box-title">检索日志文件</h3>
                    </div>
                    <div className="box-body">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <div className="input-group">
                                        <span className="input-group-addon">UID</span>
                                        <input type="text"
                                               onChange={this.handleInputValueChange.bind(this, InputField.uid)}
                                               className="form-control"
                                               placeholder="输入用户 UID"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <span className="input-group-addon">应用 ID</span>
                                        <input type="text"
                                               onChange={this.handleInputValueChange.bind(this, InputField.appId)}
                                               className="form-control"
                                               placeholder="输入应用 ID"/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-group-addon">
                                            <i className="fa fa-calendar"/>&nbsp;日期
                                        </div>
                                        <input type="text" className="form-control pull-right" name="daterange"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <span className="input-group-addon">级别</span>
                                        <select name="level" className="form-control select2"
                                                style={{width: '100%', display:'none'}}>
                                            <option value="0">ALL</option>
                                            <option value="1">VERBOSE</option>
                                            <option value="2">DEBUG</option>
                                            <option value="3">INFO</option>
                                            <option value="4">WARN</option>
                                            <option value="5">ERROR</option>
                                            <option value="6">EXCEPTION</option>
                                            <option value="7">FATAL</option>
                                        </select>
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
                                        <th>日期</th>
                                        <th>大小</th>
                                        <th>级别</th>
                                        <th>操作</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        files.map(function (item, index) {
                                            let order = index + 1;
                                            let dateString = formatUnix(item.date / 1000, 'YYYY/MM/DD');
                                            let levelString = levelToString(item.level).toUpperCase();
                                            let levelClass = 'label ' + levelSpanClass(item.level);
                                            let sizeString = fileSize(item.size);
                                            return (
                                                <tr key={index}>
                                                    <td>{order}</td>
                                                    <td>{platformIcon(item.platform)}</td>
                                                    <td>{item.uid}</td>
                                                    <td>{item.appId}</td>
                                                    <td>{dateString}</td>
                                                    <td>{sizeString}</td>
                                                    <td>
                                                        <span className={levelClass}>{levelString}</span>
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-primary btn-xs"
                                                                onClick={viewFile.bind(this, item)}
                                                                style={{width: '50px', marginRight: '10px'}}>
                                                            <i className="fa fa-eye"/>&nbsp;查看
                                                        </button>
                                                        <button className="btn btn-success btn-xs"
                                                                onClick={downloadFile.bind(this, item)}
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
        );
    }
}

LogFile.propTypes = {
    app: PropTypes.object.isRequired,
    files: PropTypes.array.isRequired,
    file: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { app } = state.application;
    const { files, file } = state.logFile;
    return {app, files, file};
}

export default connect(mapStateToProps)(LogFile)
