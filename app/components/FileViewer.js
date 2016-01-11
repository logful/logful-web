import React, { Component, PropTypes } from 'react';
import { clearFile } from '../action/logFile';
import { formatUnix } from '../helpers/datetime';
import { levelToString } from '../helpers/common';
import * as URLHelper from '../helpers/urls';
import { API_URI } from '../constants';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/solarized.css';
import 'codemirror/addon/dialog/dialog.css';
import 'codemirror/addon/scroll/simplescrollbars.css';
import 'codemirror/addon/search/matchesonscrollbar.css';
import 'fancybox/dist/css/jquery.fancybox.css';

var CodeMirror = require('codemirror/lib/codemirror');
import 'fancybox/dist/js/jquery.fancybox.pack';
import 'codemirror/addon/dialog/dialog';
import 'codemirror/addon/search/searchcursor';
import 'codemirror/addon/search/search';
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/scroll/annotatescrollbar';
import 'codemirror/addon/search/matchesonscrollbar';
import 'codemirror/addon/search/jump-to-line';
import 'codemirror/addon/mode/overlay';

export default class FileViewer extends Component {

    constructor(props) {
        super(props);
        this.codeMirror = null;
        this.closeContentView = this.closeContentView.bind(this);
    }

    componentDidMount() {
        CodeMirror.defineMode('links', function (config, parserConfig) {
            var matcher = {
                token: function (stream, state) {
                    var attachment = /attachment<<.*>>/;
                    if (stream.match(attachment)) {
                        return "attach-links";
                    }
                    while (stream.next() != null && !stream.match(attachment, false)) {

                    }
                    return null;
                }
            };
            return CodeMirror.overlayMode(CodeMirror.getMode(config, parserConfig.backdrop || "text/html"), matcher);
        });
    }

    componentDidUpdate() {
        if (this.props.isOpen) {
            const { file } = this.props;
            if (Object.keys(file).length != 0 && (typeof file.lines) == 'string') {
                if (this.codeMirror) {
                    this.codeMirror.toTextArea();
                    this.codeMirror = null;
                }
                const target = document.getElementById('cm-log-file-content');
                if (target) {
                    this.codeMirror = CodeMirror.fromTextArea(target, {
                        mode: 'links',
                        lineNumbers: true,
                        readOnly: true,
                        lineWrapping: true,
                        scrollbarStyle: 'simple',
                        theme: 'solarized dark'
                    });
                    this.codeMirror.setValue(file.lines);
                    jQuery('.CodeMirror').delegate('.cm-attach-links', 'click', function (event) {
                        var text = event.target.textContent;
                        if (text && text.length == 46) {
                            var id = text.substring(12, 44);
                            var url = URLHelper.formatUrl(API_URI.attachment) + '/' + id + '.jpg';
                            jQuery.fancybox.open([{
                                href: url,
                                title: id
                            }], {padding: 0});
                        }
                    });
                }
            }
        }
    }

    componentWillUnmount() {
        if (this.codeMirror) {
            this.codeMirror = null;
        }
    }

    closeContentView(event) {
        event.preventDefault();
        if (this.props.onRequestClose) {
            this.props.onRequestClose();
        }
    }

    render() {
        if (this.props.isOpen) {
            const { file } = this.props;
            if (Object.keys(file).length == 0 || !file.lines) {
                return (
                    <div></div>
                );
            }
            else {
                return (
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box box-info">
                                <div className="box-header with-border">
                                    <h3 className="box-title">{file.title}</h3>
                                    <div className="box-tools pull-right">
                                        <button className="btn btn-box-tool" onClick={this.closeContentView}>
                                            <i className="fa fa-close"/>
                                        </button>
                                    </div>
                                </div>
                                <div className="box-body">
                                    {this.props.children}
                                    <textarea id="cm-log-file-content"/>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
        }
        else {
            return (
                <div></div>
            );
        }
    }
}

FileViewer.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    file: PropTypes.object.isRequired,
    onRequestClose: PropTypes.func.isRequired
};
