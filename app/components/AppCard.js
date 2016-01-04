import React, { Component, PropTypes } from 'react';
import { ActionType } from '../containers/App/ListApp';

export default class AppCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            deleteMode: false
        };
    }

    clickAction(type, event) {
        event.preventDefault();
        if (type == ActionType.remove) {
            this.setState({deleteMode: true});
        }
        else {
            if (this.props.handleAppCardEvent) {
                this.props.handleAppCardEvent({
                    type: type,
                    data: {}
                }, event);
            }
        }
    }

    cancelDelete(event) {
        event.preventDefault();
        this.setState({deleteMode: false});
    }

    confirmDelete(event) {
        event.preventDefault();
        // TODO
    }

    render() {
        const dividerStyle = {
            borderRight: '1px solid #f4f4f4'
        };
        const overlayStyle = this.state.deleteMode ? null : {display: 'none'};
        const overlayContentStyle = {
            position: 'absolute',
            top: '50%',
            width: '100%',
            bottom: '50%'
        };
        const data = this.props.appData;
        return (
            <div className="col-md-4">
                <div className="box">
                    <div className="box-header with-border">
                        <h3 className="box-title">{data.name}</h3>
                        <div className="box-tools pull-right">
                            <button className="btn btn-box-tool"
                                    onClick={this.clickAction.bind(this, ActionType.remove)}>
                                <i className="fa fa-trash"/>
                            </button>
                            <button className="btn btn-box-tool"
                                    onClick={this.clickAction.bind(this, ActionType.edit)}>
                                <i className="fa fa-gear"/>
                            </button>
                        </div>
                    </div>
                    <div className="box-body">
                        应用信息
                    </div>
                    <div className="box-footer">
                        <div className="row">
                            <div className="col-xs-3 text-center" style={dividerStyle}>
                                <button className="btn btn-box-tool"
                                        onClick={this.clickAction.bind(this, ActionType.info)}>
                                    基本信息
                                </button>
                            </div>
                            <div className="col-xs-3 text-center" style={dividerStyle}>
                                <button className="btn btn-box-tool"
                                        onClick={this.clickAction.bind(this, ActionType.user)}>
                                    用户管理
                                </button>
                            </div>
                            <div className="col-xs-3 text-center" style={dividerStyle}>
                                <button className="btn btn-box-tool"
                                        onClick={this.clickAction.bind(this, ActionType.file)}>
                                    文件查看
                                </button>
                            </div>
                            <div className="col-xs-3 text-center" style={dividerStyle}>
                                <button className="btn btn-box-tool"
                                        onClick={this.clickAction.bind(this, ActionType.control)}>
                                    应用控制
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="overlay" style={overlayStyle}>
                        <div style={overlayContentStyle}>
                            <div className="col-xs-6 text-center">
                                <button className="btn btn-default" style={{width: '60%'}}
                                        onClick={this.cancelDelete.bind(this)}>
                                    取消
                                </button>
                            </div>
                            <div className="col-xs-6 text-center">
                                <button className="btn btn-danger" style={{width: '60%'}}
                                        onClick={this.confirmDelete.bind(this)}>
                                    确认
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AppCard.propTypes = {
    appData: PropTypes.object.isRequired
};
