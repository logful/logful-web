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
        const { data } = this.props;
        return (
            <div style={divStyle}>
                <span>{data.title}</span>
            </div>
        );
    }
}
