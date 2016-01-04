import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Sidebar extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="sidebar">
                <ul className="sidebar-menu">
                    <li className="header">MAIN NAVIGATION</li>
                    <li className="active">
                        <Link to='/'>
                            <i className="fa fa-cubes"/> <span>应用管理</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/system'>
                            <i className="fa fa-dashboard"/> <span>系统状态</span>
                        </Link>
                    </li>
                </ul>
            </section>
        );
    }
}
