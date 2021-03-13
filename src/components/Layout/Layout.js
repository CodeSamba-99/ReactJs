import React, {Component} from 'react';
import Aux from '../../containers/hoc/Aux';
import './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

class Layout extends Component{
    state = {
        showSideDrawer: false
    };

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false })
    };

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        })
    };
    render() {
        return (
            <Aux>
                {/* <div>Toolbar, sideDrawer, BackDrop</div> */}
                <Toolbar
                    isAuth={this.props.isAuthenticated}
                    drawerToggelClicked={this.sideDrawerToggleHandler} />
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    closed={this.sideDrawerClosedHandler}
                    open={this.state.showSideDrawer} />
                <main className="Content">
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token != null
    };
}

export default connect(mapStateToProps)(Layout);