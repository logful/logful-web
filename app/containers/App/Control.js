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
            active: 4
        }));
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="box box-primary">
                            <div className="box-header with-border">
                                <h3 className="box-title">灰度控制</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="box box-primary">
                            <div className="box-header with-border">
                                <h3 className="box-title">推送控制</h3>
                            </div>
                            <div className="box-body">
                                Test
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(Control)
