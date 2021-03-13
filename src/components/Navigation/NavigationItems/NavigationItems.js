import React from 'react';
import './NavigationItems.css';
import NavigationItem from '../NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className="NavigationItems">
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        {props.isAuthenticated ? <NavigationItem link="/Orders">Orders</NavigationItem> : null}
        {!props.isAuthenticated ? <NavigationItem link="/auth">Authenticate</NavigationItem> :
            <NavigationItem link="/logout">LogOut</NavigationItem>
        }
    </ul>

);

export default navigationItems