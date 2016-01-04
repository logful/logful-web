import React, { Component, PropTypes } from 'react';

export default class PageTitle extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const divStyle = {
            color: 'white',
            float: 'left',
            height: '50px',
            lineHeight: '50px',
            fontSize: '18px',
            paddingLeft: '15px'
        };
        return (
            <div style={divStyle}>
                <span>{this.props.titleText}</span>
            </div>
        );
    }
}
