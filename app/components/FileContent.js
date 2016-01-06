import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { clearFile } from '../action/logFile';

export default class FileContent extends Component {

    constructor(props) {
        super(props);
        this.closeContentView = this.closeContentView.bind(this);
    }

    componentDidMount() {
        let dataTable = jQuery('#file-content-table').DataTable({
            responsive: true,
            lengthChange: false,
            info: false,
            paging: false
        });
        jQuery('#file-content-table-search').keyup(function () {
            dataTable.search(this.value).draw();
        });
    }

    closeContentView(event) {
        event.preventDefault();
        this.props.dispatch(clearFile());
    }

    render() {
        const file = this.props.file;
        if (file.meta && file.lines) {
            return (
                <div className="row">
                    <div className="col-xs-12">
                        <div className="box box-info">
                            <div className="box-header">
                                <h3 className="box-title">{file.meta.filename}</h3>
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
                                       className="table table-striped table-bordered table-hover">
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
                                                    <td>{item.timestamp}</td>
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
        else {
            return (
                <div></div>
            );
        }
    }
}

FileContent.propTypes = {
    file: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

export default connect()(FileContent)
