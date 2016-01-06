import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import FileContent from '../../components/FileContent';
import { appSidebar } from '../../action/layout';
import { fetchFiles, fetchFile, clearFiles, clearFile } from '../../action/logFile';
import { Select } from 'react-select';
import { formatNow, formatUnix } from '../../helpers/datetime';
import { levelToString, levelSpanClass, fileSize } from '../../helpers/common';

export default class LogFile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            level: 0,
            startDate: formatNow('YYYY/MM/DD'),
            endDate: formatNow('YYYY/MM/DD')
        };
        this.performSearch = this.performSearch.bind(this);
        this.handleUidChange = this.handleUidChange.bind(this);
        this.handleAppIdChange = this.handleAppIdChange.bind(this);
        this.viewFileContent = this.viewFileContent.bind(this);
        this.downloadFile = this.downloadFile.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(appSidebar({
            id: this.props.params.id,
            active: 2
        }));
        const self = this;
        jQuery('.select2').select2().on('change', function (e) {
            self.setState({
                level: e.target.value
            });
        });
        jQuery('input[name="daterange"]').daterangepicker({
            locale: {
                format: 'YYYY/MM/DD'
            }
        }).on('apply.daterangepicker', function (event, picker) {
            self.setState({
                startDate: picker.startDate.format('YYYY/MM/DD'),
                endDate: picker.endDate.format('YYYY/MM/DD')
            });
        });
    }

    componentWillUnmount() {
        this.props.dispatch(clearFiles());
        this.props.dispatch(clearFile());
    }

    handleUidChange(event) {
        this.setState({
            uid: event.target.value
        });
    }

    handleAppIdChange(event) {
        this.setState({
            appId: event.target.value
        });
    }

    performSearch(event) {
        event.preventDefault();
        const option = this.state;
        this.props.dispatch(fetchFiles(option));
    }

    viewFileContent(params) {
        this.props.dispatch(fetchFile(params));
    }

    downloadFile(param) {
        // TODO
    }

    render() {
        const { files, file } = this.props;
        const viewFile = this.viewFileContent;
        const downloadFile = this.downloadFile;
        return (
            <div>
                <div className="box box-primary">
                    <div className="box-header with-border">
                        <h3 className="box-title">日志文件检索</h3>
                    </div>
                    <div className="box-body">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>UID</label>
                                    <input type="text" onChange={this.handleUidChange} className="form-control"
                                           placeholder="输入用户 UID"/>
                                </div>
                                <div className="form-group">
                                    <label>应用 ID</label>
                                    <input type="text" onChange={this.handleAppIdChange} className="form-control"
                                           placeholder="输入应用 ID"/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>日期</label>
                                    <div className="input-group">
                                        <div className="input-group-addon">
                                            <i className="fa fa-calendar"/>
                                        </div>
                                        <input type="text" className="form-control pull-right" name="daterange"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>级别</label>
                                    <select name="level" className="form-control select2" style={{width: '100%'}}>
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
                <FileContent file={file}/>
            </div>
        );
    }
}

LogFile.propTypes = {
    files: PropTypes.array.isRequired,
    file: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const files = state.logFile.files;
    const file = state.logFile.file;
    if (files && file) {
        return {files, file};
    }
    return {};
}

export default connect(mapStateToProps)(LogFile)
