import React, { Component } from 'react';

export default class System extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row">
                <div className="col-xs-12">
                    <div className="box box-info">
                        <div className="box-header with-border">
                            <h3 className="box-title">WeedFS 状态</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="box box-primary">
                        <div className="box-header with-border">
                            <h3 className="box-title">Area Chart</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="box box-info">
                        <div className="box-header with-border">
                            <h3 className="box-title">Area Chart</h3>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}