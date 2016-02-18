import React, { Component, PropTypes } from 'react';
import { pushState } from 'redux-router';
import { connect } from 'react-redux';
import AppCard from '../../components/AppCard';
import { fetchApps, storeAppData, deleteApp } from '../../action/application';
import { adminSidebar, refreshPage } from '../../action/layout';

export const ActionType = {
    remove: 'remove',
    edit: 'edit',
    info: 'info',
    user: 'user',
    log: 'log',
    crash: 'crash',
    control: 'control'
};

export default class ListApp extends Component {

    constructor(props) {
        super(props);
        this.createApp = this.createApp.bind(this);
        this.handleAppCardEvent = this.handleAppCardEvent.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(adminSidebar({
            active: 0
        }));
        this.props.dispatch(fetchApps());
        this.props.dispatch(refreshPage({
            title: ''
        }));
    }

    createApp(event) {
        event.preventDefault();
        this.props.history.pushState({}, '/app/create');
    }

    handleAppCardEvent(action) {
        const self = this;
        if (action && action.type && action.data) {
            this.props.dispatch(storeAppData(action.data));
            if (action.type == ActionType.edit || action.type == ActionType.info) {
                this.props.history.pushState({}, '/app/' + action.data.id + '/info');
            }
            if (action.type == ActionType.user) {
                this.props.history.pushState({}, '/app/' + action.data.id + '/user');
            }
            if (action.type == ActionType.log) {
                this.props.history.pushState({}, '/app/' + action.data.id + '/log');
            }
            if (action.type == ActionType.control) {
                this.props.history.pushState({}, '/app/' + action.data.id + '/control');
            }
            if (action.type == ActionType.remove) {
                deleteApp({
                    id: action.data.id
                }, function (success, error) {
                    if (success) {
                        self.props.dispatch(fetchApps());
                    }
                });
            }
        }
    }

    render() {
        const appCardHandler = this.handleAppCardEvent;
        return (
            <div className="row">
                <div className="col-xs-12">
                    <div className="box box-solid">
                        <div className="box-body">
                            <div className="input-group">
                                <input type="text" name="table_search" className="form-control input"
                                       placeholder="Search"/>
                                <div className="input-group-btn">
                                    <button onClick={this.createApp} className="btn btn-primary">
                                        <i className="fa fa-plus"/>&nbsp;&nbsp;创建应用
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.props.apps.map(function (item) {
                        return <AppCard key={item.id} appData={item} handleAppCardEvent={appCardHandler}/>
                    })
                }
            </div>
        );
    }
}

ListApp.propTypes = {
    apps: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const apps = state.application.apps;
    if (apps) {
        return {apps};
    }
    return {};
}

export default connect(mapStateToProps)(ListApp)
