import React, { Component, PropTypes } from 'react';

export default class DirDetail extends Component {

    constructor(props) {
        super(props);
    }

    closeAction(event) {
        event.preventDefault();
        this.props.onViewClose();
    }

    render() {
        const { disk, volume } = this.props;
        if (Object.keys(disk).length == 0 || Object.keys(volume).length == 0) {
            return (
                <div>
                </div>
            );
        }
        else {
            return (
                <div>
                    <div className="col-xs-12">
                        <div className="box box-success">
                            <div className="box-header with-border">
                                <h3 className="box-title">卷详细信息</h3>
                                <div className="box-tools pull-right">
                                    <button className="btn btn-box-tool" onClick={this.closeAction.bind(this)}>
                                        <i className="fa fa-close"/>
                                    </button>
                                </div>
                            </div>
                            <div className="box-body">
                                <h5>Disk Stats</h5>
                                <table className="table table-bordered table-hover">
                                    <thead>
                                    <tr>
                                        <th>Dir</th>
                                        <th>All</th>
                                        <th>Used</th>
                                        <th>Free</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        disk.DiskStatuses.map(function (item, index) {
                                            return (
                                                <tr key={index}>
                                                    <td>{item.Dir}</td>
                                                    <td>{item.All}</td>
                                                    <td>{item.Used}</td>
                                                    <td>{item.Free}</td>
                                                </tr>
                                            );
                                        })
                                    }
                                    </tbody>
                                </table>
                                <h5>Volumes</h5>
                                <table className="table table-bordered table-hover">
                                    <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Size</th>
                                        <th>Files</th>
                                        <th>Trash</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        volume.Volumes.map(function (item, index) {
                                            return (
                                                <tr key={index}>
                                                    <td>{item.Id}</td>
                                                    <td>{item.Size}</td>
                                                    <td>{item.FileCount}</td>
                                                    <td>{item.DeleteCount}</td>
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
            );
        }
    }

}

DirDetail.propTypes = {
    disk: PropTypes.object.isRequired,
    volume: PropTypes.object.isRequired,
    onViewClose: PropTypes.func.isRequired
};
