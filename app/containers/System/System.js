import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { adminSidebar } from '../../action/layout';
import { fetchWeedFSDirs, fetchWeedFSVolumes, fetchWeedFSDiskStatus, clearDirDetailData } from '../../action/system';
import DirDetail from '../../components/DirDetail';

export default class System extends Component {

    constructor(props) {
        super(props);
        this.weedDirDetailClick = this.weedDirDetailClick.bind(this);
        this.closeWeedDirDetailView = this.closeWeedDirDetailView.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(adminSidebar({
            active: 1
        }));
        this.props.dispatch(fetchWeedFSDirs());
    }

    weedDirDetailClick(param, event) {
        event.preventDefault();
        this.props.dispatch(fetchWeedFSVolumes({
            address: param
        }));
        this.props.dispatch(fetchWeedFSDiskStatus({
            address: param
        }));
    }

    closeWeedDirDetailView() {
        this.props.dispatch(clearDirDetailData());
    }

    render() {
        let nodes = [];
        const { Topology } = this.props.dirs;
        const nodeClick = this.weedDirDetailClick;
        if (Topology) {
            Topology.DataCenters.forEach(function (dataCenter) {
                dataCenter.Racks.forEach(function (rack) {
                    rack.DataNodes.forEach(function (dataNode) {
                        var node = {
                            dataCenter: dataCenter.Id,
                            rack: rack.Id,
                            remoteAddr: dataNode.Url,
                            volumes: dataNode.Volumes,
                            max: dataNode.Max
                        };
                        nodes.push(node);
                    });
                });
            });
        }
        return (
            <div className="row">
                <DirDetail disk={this.props.diskStatus} volume={this.props.volumes}
                           onViewClose={this.closeWeedDirDetailView}/>
                <div className="col-xs-12">
                    <div className="box box-info">
                        <div className="box-header with-border">
                            <h3 className="box-title">WeedFS 状态</h3>
                        </div>
                        <div className="box-body">
                            <table className="table table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th>Data Center</th>
                                    <th>Rack</th>
                                    <th>Remote Address</th>
                                    <th>Volumes</th>
                                    <th>Max Volumes</th>
                                    <th>Detail</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    nodes.map(function (item, index) {
                                        const param = item.remoteAddr;
                                        return (
                                            <tr key={index}>
                                                <td>{item.dataCenter}</td>
                                                <td>{item.rack}</td>
                                                <td>{item.remoteAddr}</td>
                                                <td>{item.volumes}</td>
                                                <td>{item.max}</td>
                                                <td>
                                                    <button className="btn btn-info btn-xs"
                                                            onClick={nodeClick.bind(this, param)}
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
                <div className="col-xs-12">
                    <div className="box box-primary">
                        <div className="box-header with-border">
                            <h3 className="box-title">系统资源状态</h3>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

System.propTypes = {
    diskStatus: PropTypes.object.isRequired,
    volumes: PropTypes.object.isRequired,
    dirs: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { dirs, diskStatus, volumes } = state.system;
    return {dirs, diskStatus, volumes};
}

export default connect(mapStateToProps)(System)
