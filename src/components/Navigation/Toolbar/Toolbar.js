import React from 'react';
import './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggel from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
    <header className="Toolbar">
        <DrawerToggel clicked={props.drawerToggelClicked}/>
        <div className="Logo">
            <Logo />
        </div>
        <nav className="DesktopOnly">
            <NavigationItems isAuthenticated={props.isAuth}/>
        </nav>
    </header>
);

export default toolbar