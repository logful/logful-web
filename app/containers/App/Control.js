import React, { Component } from 'react';
import { connect } from 'react-redux';
import TagsInput from 'react-tagsinput';
import { appSidebar } from '../../action/layout';
import { pushData } from '../../action/control';
import Toggle from 'react-toggle';
import 'react-tagsinput/react-tagsinput';

export default class Control extends Component {

    constructor(props) {
        super(props);
        this.state = {
            payload: {
                on: true,
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
        this.tagsValueChange = this.tagsValueChange.bind(this);
        this.switchStateChange = this.switchStateChange.bind(this);
        this.initRangeSlider = this.initRangeSlider.bind(this);
    }

    componentDidMount() {
        const params = this.props.params;
        this.props.dispatch(appSidebar({
            id: params.id,
            active: 4
        }));
        this.initRangeSlider();
    }

    componentDidUpdate() {
        this.initRangeSlider();
    }

    initRangeSlider() {
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

    tagsValueChange(type, field, tags) {
        var unique = tags.filter(function (elem, index, self) {
            return index == self.indexOf(elem);
        });
        let newState = this.state;
        newState.payload.params[type][field] = unique;
        this.setState(newState);
    }

    switchStateChange(event) {
        let newState = this.state;
        newState.payload.on = event.target.checked;
        this.setState(newState);
    }

    componentWillUnmount() {

    }

    customRenderInput(placeholder, props) {
        let {onChange, value, ...other} = props;
        return (
            <input type='text' placeholder={placeholder} onChange={onChange} value={value} {...other} />
        )
    }

    pushPayload(event) {
        event.preventDefault();
        const payload = this.state.payload;
        let data = {};
        data.on = payload.on;
        data.interval = payload.interval;
        data.frequency = payload.frequency;
        data.timestamp = Math.round(Date.now() / 1000);

        data.params = {};
        if (payload.params.getui.clientIds.length != 0 ||
            payload.params.getui.alias.length != 0) {
            data.params.getui = payload.params.getui;
        }

        console.log('push-data', data);
        if (!data.params.getui) {

        }
        else {
            pushData(data, function (success, error) {
                if (error) {
                    console.log(error);
                }
            });
        }
    }

    render() {
        let rangeView;
        if (this.state.payload.on) {
            rangeView =
                <div>
                    <div className="form-group">
                        <label>开启时间</label>
                        <input id="interval-range" type="text" value=""/>
                    </div>
                    <div className="form-group">
                        <label>上传频率</label>
                        <input id="frequency-range" type="text" value=""/>
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
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>个推推送</label>
                                        <div className="form-group">
                                            <TagsInput value={this.state.payload.params.getui.clientIds}
                                                       renderInput={this.customRenderInput.bind(this, '输入 CID')}
                                                       onChange={this.tagsValueChange.bind(this, 'getui', 'clientIds')}/>
                                        </div>
                                        <div className="form-group">
                                            <TagsInput value={this.state.payload.params.getui.alias}
                                                       renderInput={this.customRenderInput.bind(this, '输入别名')}
                                                       onChange={this.tagsValueChange.bind(this, 'getui', 'alias')}/>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <Toggle
                                                defaultChecked={this.state.payload.on}
                                                onChange={this.switchStateChange}/>
                                        </div>
                                        {rangeView}
                                    </div>
                                </div>
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
