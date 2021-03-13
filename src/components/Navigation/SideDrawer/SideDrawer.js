import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import './SideDrawer.css';
import BackDrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../containers/hoc/Aux';

const sideDrawer = (props) => {
    let attachedClasses = ['SideDrawer', 'Close']
    if (props.open) {
        attachedClasses = ['SideDrawer', 'Open']
    }
    return ( 
        <Aux>
            <BackDrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
            <div className="Logos">
                <Logo />
            </div> 
            <nav>
                    <NavigationItems isAuthenticated={props.isAuthenticated }/>
            </nav>
            </div>
        </Aux>
    )
}

export default sideDrawer