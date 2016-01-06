import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appSidebar } from '../../action/layout';

export default class Control extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const params = this.props.params;
        this.props.dispatch(appSidebar({
            id: params.id,
            active: 3
        }));
    }

    render() {
        return (
            <div>
                <div className="row">

                </div>
            </div>
        );
    }
}

export default connect()(Control)
