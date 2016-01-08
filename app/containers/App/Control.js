import React, { Component } from 'react';
import { connect } from 'react-redux';
import TagsInput from 'react-tagsinput';
import { appSidebar } from '../../action/layout';
import { pushData } from '../../action/control';
var Switchery = require('switchery');

import 'react-tagsinput/react-tagsinput';

export default class Control extends Component {

    constructor(props) {
        super(props);
        this.state = {
            switchOn: false,
            payload: {
                on: false,
                interval: 60,
                frequency: 60,
                params: {
                    getui: {
                        clientIds: [],
                        alias: []
                    }
                }
            }
        };
        this.pushPayload = this.pushPayload.bind(this);
        this.getuiCidTagsChange = this.getuiCidTagsChange.bind(this);
        this.getuiAliasTagsChange = this.getuiAliasTagsChange.bind(this);
    }

    componentDidMount() {
        const params = this.props.params;
        this.props.dispatch(appSidebar({
            id: params.id,
            active: 4
        }));
        const self = this;
        var elem = document.querySelector('.log-switch');
        let logSwitch = new Switchery(elem, {
            color: '#378CBE'
        });
        jQuery('.switchery').on('click', function () {
            self.setState({
                switchOn: elem.checked
            });
            self.state.payload.on = elem.checked;
        });
    }

    componentDidUpdate() {
        const self = this;
        jQuery('#interval-range').ionRangeSlider({
            min: 60,
            max: 86400,
            type: 'single',
            step: 1,
            postfix: " s",
            prettify: false,
            hasGrid: true,
            onChange: function (data) {
                self.state.payload.interval = data.fromNumber;
            }
        });
        jQuery('#frequency-range').ionRangeSlider({
            min: 60,
            max: 86400,
            type: 'single',
            step: 1,
            postfix: " s",
            prettify: false,
            hasGrid: true,
            onChange: function (data) {
                self.state.payload.frequency = data.fromNumber;
            }
        });
    }

    getuiCidTagsChange(tags) {
        // TODO check same
        let newState = this.state;
        newState.payload.params.getui.clientIds = tags;
        this.setState(newState);
    }

    getuiAliasTagsChange(tags) {
        let newState = this.state;
        newState.payload.params.getui.alias = tags;
        this.setState(newState);
    }

    componentWillUnmount() {

    }

    pushPayload(event) {
        event.preventDefault();
        pushData(this.state.payload, function (success, error) {
            if (error) {
                console.log(error);
            }
        });
    }

    render() {
        let rangeView;
        if (this.state.switchOn) {
            rangeView =
                <div>
                    <div className="form-group">
                        <label>开启时间</label>
                        <input id="interval-range" type="text" name="range_5" value=""/>
                    </div>
                    <div className="form-group">
                        <label>上传频率</label>
                        <input id="frequency-range" type="text" name="range_5" value=""/>
                    </div>
                </div>
        }
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
                                <div className="form-group">
                                    <label>CID 列表</label>
                                    <TagsInput value={this.state.payload.params.getui.clientIds}
                                               onChange={this.getuiCidTagsChange}/>
                                </div>
                                <div className="form-group">
                                    <label>别名列表</label>
                                    <TagsInput value={this.state.payload.params.getui.alias}
                                               onChange={this.getuiAliasTagsChange}/>
                                </div>
                                <div className="form-group">
                                    <input className="log-switch" type="checkbox" name="checkbox"/>
                                </div>
                                {rangeView}
                            </div>
                            <div className="box-footer">
                                <button type="submit" onClick={this.pushPayload} className="btn btn-primary">推送</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect()(Control)
