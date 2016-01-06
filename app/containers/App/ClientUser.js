import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appSidebar } from '../../action/layout';

export default class ClientUser extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const params = this.props.params;
        this.props.dispatch(appSidebar({
            id: params.id,
            active: 1
        }));
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="box box-primary">
                            <div className="box-header with-border">
                                <h3 className="box-title">基本信息</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(ClientUser)
