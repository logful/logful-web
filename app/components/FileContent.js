import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { clearFile } from '../action/logFile';
import { formatUnix } from '../helpers/datetime';
import { levelToString } from '../helpers/common';

export default class FileContent extends Component {

    constructor(props) {
        super(props);
        this.closeContentView = this.closeContentView.bind(this);
        this.dataTable = null;
    }

    componentDidMount() {

    }

    componentDidUpdate() {
        let table = jQuery('#file-content-table').DataTable({
            responsive: true,
            lengthChange: false,
            info: false,
            paging: true,
            iDisplayLength: 25
        });
        jQuery('#file-content-table-search').keyup(function () {
            table.search(this.value).draw();
        });
        this.dataTable = table;
    }

    componentWillUnmount() {
        if (this.dataTable) {
            this.dataTable.destroy();
        }
    }

    closeContentView(event) {
        event.preventDefault();
        if (this.dataTable) {
            this.dataTable.destroy();
        }
        this.props.dispatch(clearFile());
        console.log(this.dataTable);
    }

    filename(meta) {
        return meta.loggerName + '-'
            + formatUnix(meta.date / 1000, 'YYYYMMDD') + '-'
            + levelToString(meta.level) + '-'
            + meta.fragment;
    }

    render() {
        const { file } = this.props;
        if (Object.keys(file.meta).length == 0) {
            return (
                <div>
                </div>
            );
        }
        else {
            return (
                <div className="row">
                    <div className="col-xs-12">
                        <div className="box box-info">
                            <div className="box-header">
                                <h3 className="box-title">{this.filename(file.meta)}</h3>
                                <div className="box-tools">
                                    <div className="input-group" style={{width: '220px'}}>
                                        <input type="text" id="file-content-table-search"
                                               className="form-control input-sm pull-right"
                                               placeholder="Search"/>
                                        <div className="input-group-btn">
                                            <button className="btn btn-sm btn-default"><i className="fa fa-search"/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="box-body no-padding">
                                <table id="file-content-table"
                                       style={{marginTop: '0px !important', marginBottom:'0px !important'}}
                                       className="table table-striped table-bordered table-hover table-condensed">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>时间</th>
                                        <th>Tag</th>
                                        <th>Message</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        file.lines.map(function (item, index) {
                                            let order = index + 1;
                                            return (
                                                <tr key={order}>
                                                    <td>{order}</td>
                                                    <td>{item.date}</td>
                                                    <td>{item.tag}</td>
                                                    <td>{item.msg}</td>
                                                </tr>
                                            );
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                            <div className="box-footer no-border">
                                <button type="submit"
                                        className="btn btn-sm btn-default"
                                        onClick={this.closeContentView}>
                                    关闭
                                </button>
                                <ul className="pagination pagination-sm no-margin pull-right">
                                    <li><a href="#">&laquo;</a></li>
                                    <li><a href="#">1</a></li>
                                    <li><a href="#">2</a></li>
                                    <li><a href="#">3</a></li>
                                    <li><a href="#">&raquo;</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

FileContent.propTypes = {
    file: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

export default connect()(FileContent)
