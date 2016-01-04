import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Sidebar extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const sidebar = this.props.data;
        if (!sidebar) {
            return (
                <section className="sidebar">
                </section>
            );
        }
        else {
            return (
                <section className="sidebar">
                    <ul className="sidebar-menu">
                        <li className="header">{sidebar.data.header.name}</li>
                        {
                            sidebar.data.menus.map(function (item, index) {
                                let icon = 'fa ' + item.icon;
                                let active = index == sidebar.active ? 'active' : null;
                                return (
                                    <li key={item.route} className={active}>
                                        <Link to={item.route}>
                                            <i className={icon}/>&nbsp;
                                            <span>{item.name}</span>
                                        </Link>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </section>
            );
        }
    }
}

Sidebar.propTypes = {
    data: PropTypes.object.isRequired
};
