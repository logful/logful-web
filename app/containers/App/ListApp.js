import React, { Component, PropTypes } from 'react';
import { pushState } from 'redux-router';
import { connect } from 'react-redux';
import AppCard from '../../components/AppCard';
import { list } from '../../action/application';

export const ActionType = {
    remove: 'remove',
    edit: 'edit',
    info: 'info',
    user: 'user',
    file: 'file',
    control: 'control'
};

export default class ListApp extends Component {

    constructor(props) {
        super(props);
        this.createApp = this.createApp.bind(this);
        this.handleAppCardEvent = this.handleAppCardEvent.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(list());
    }

    createApp(event) {
        event.preventDefault();
        this.props.history.pushState({}, '/app/create');
    }

    handleAppCardEvent(action) {
        if (action && action.type && action.data) {
            if (action.type == ActionType.edit) {
                this.props.history.pushState({}, '/app/info');
            }
        }
    }

    render() {
        const { apps } = this.props;
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
                    apps.map(function (item) {
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
