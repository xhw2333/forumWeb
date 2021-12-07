import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

export default class myNavLink extends Component {
    render() {
        return (
            <NavLink activeClassName="" className="">{...this.props}</NavLink>
        )
    }
}
