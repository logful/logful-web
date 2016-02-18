import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TagsInput from 'react-tagsinput';
import { appSidebar } from '../../action/layout';
import { pushData } from '../../action/control';
import { fetchApp } from '../../action/application';
import Toggle from 'react-toggle';
import 'react-tagsinput/react-tagsinput';

export default class Control extends Component {

    constructor(props) {
        super(props);
        this.state = {
            payload: {
                on: true,
                interrupt: false,
                interval: 60,
                frequency: 60,
                clientIds: [],
                aliases: []
            }
        };
        this.pushPayload = this.pushPayload.bind(this);
        this.tagsValueChange = this.tagsValueChange.bind(this);
        this.switchStateChange = this.switchStateChange.bind(this);
        this.initRangeSlider = this.initRangeSlider.bind(this);
        this.initCheckbox = this.initCheckbox.bind(this);
    }

    componentDidMount() {
        const params = this.props.params;
        this.props.dispatch(appSidebar({
            id: params.id,
            active: 4
        }));
        if (Object.keys(this.props.app).length == 0) {
            this.props.dispatch(fetchApp({
                id: params.id
            }));
        }
        this.initRangeSlider();
        this.initCheckbox();
    }

    componentDidUpdate() {
        this.initRangeSlider();
        this.initCheckbox();
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

    initCheckbox() {
        const self = this;
        let checkbox = jQuery('input[name="interrupt"]');
        checkbox.iCheck({
            checkboxClass: 'icheckbox_square-blue',
            radioClass: 'iradio_square-blue',
            increaseArea: '20%'
        });
        checkbox.on('ifChecked', function (event) {
            self.state.payload.interrupt = true;
        });
        checkbox.on('ifUnchecked', function (event) {
            self.state.payload.interrupt = false;
        });
    }

    tagsValueChange(field, tags) {
        var unique = tags.filter(function (elem, index, self) {
            return index == self.indexOf(elem);
        });
        let newState = this.state;
        newState.payload[field] = unique;
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
        const { app } = this.props;
        if (Object.keys(app).length == 0) {
            // TODO
        }
        else {
            if (app.getuiAppId && app.getuiAppKey && app.getuiMasterSecret) {
                let payload = this.state.payload;
                payload.timestamp = Math.round(Date.now() / 1000);
                console.log('push', payload);
                pushData({
                    id: this.props.params.id,
                    data: payload
                }, function (success, error) {
                    if (error) {
                        console.log(error);
                    }
                });
            }
            else {
                console.log('getui sdk not config!');
                // TODO
            }
        }
    }

    render() {
        let rangeView;
        if (this.state.payload.on) {
            rangeView =
                <div>
                    <div className="form-group">
                        <label>截断上传&nbsp;&nbsp;</label>
                        <input type="checkbox" name="interrupt"/>
                    </div>
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
                                            <TagsInput value={this.state.payload.clientIds}
                                                       renderInput={this.customRenderInput.bind(this, '输入 CID')}
                                                       onChange={this.tagsValueChange.bind(this, 'clientIds')}/>
                                        </div>
                                        <div className="form-group">
                                            <TagsInput value={this.state.payload.aliases}
                                                       renderInput={this.customRenderInput.bind(this, '输入别名')}
                                                       onChange={this.tagsValueChange.bind(this, 'aliases')}/>
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

Control.propTypes = {
    app: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { app } = state.application;
    return {app};
}

export default connect(mapStateToProps)(Control)
