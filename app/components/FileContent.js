import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { clearFile } from '../action/logFile';
import { formatUnix } from '../helpers/datetime';
import { levelToString } from '../helpers/common';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/solarized.css';
import 'codemirror/addon/dialog/dialog.css';
import 'codemirror/addon/search/matchesonscrollbar.css';
var CodeMirror = require('codemirror/lib/codemirror');
import 'codemirror/addon/dialog/dialog';
import 'codemirror/addon/search/searchcursor';
import 'codemirror/addon/search/search';
import 'codemirror/addon/scroll/annotatescrollbar';
import 'codemirror/addon/search/matchesonscrollbar';
import 'codemirror/addon/search/jump-to-line';

export default class FileContent extends Component {

    constructor(props) {
        super(props);
        this.closeContentView = this.closeContentView.bind(this);
        this.codeMirror = null;
    }

    componentDidMount() {

    }

    componentDidUpdate() {
        const { file } = this.props;
        if (file && Object.keys(file.meta).length != 0 && file.lines) {
            if (!this.codeMirror) {
                this.codeMirror = CodeMirror.fromTextArea(document.getElementById('log-file-content'), {
                    lineNumbers: true,
                    readOnly: true,
                    lineWrapping: true,
                    theme: 'solarized dark'
                });
            }
            this.codeMirror.setValue(file.lines);
        }
    }

    componentWillUnmount() {
        if (this.codeMirror) {
            this.codeMirror.toTextArea();
            this.codeMirror = null;
        }
    }

    closeContentView(event) {
        event.preventDefault();
        if (this.codeMirror) {
            this.codeMirror.toTextArea();
            this.codeMirror = null;
        }
        this.props.dispatch(clearFile());
    }

    filename(meta) {
        return meta.loggerName + '-'
            + formatUnix(meta.date / 1000, 'YYYYMMDD') + '-'
            + levelToString(meta.level) + '-'
            + meta.fragment;
    }

    render() {
        const { file } = this.props;
        if (Object.keys(file.meta).length == 0) {
            return (
                <div>
                </div>
            );
        }
        else {
            return (
                <div className="row">
                    <div className="col-xs-12">
                        <div className="box box-info">
                            <div className="box-header with-border">
                                <h3 className="box-title">{this.filename(file.meta)}</h3>
                                <div className="box-tools pull-right">
                                    <button className="btn btn-box-tool" onClick={this.closeContentView}>
                                        <i className="fa fa-close"/>
                                    </button>
                                </div>
                            </div>
                            <div className="box-body">
                                <textarea id="log-file-content"/>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

FileContent.propTypes = {
    file: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

export default connect()(FileContent)
