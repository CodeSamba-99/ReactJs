import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../containers/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/spinner/spinner';

class Orders extends Component{

    componentDidMount() {
        this.props.onFetchOrders(this.props.token);
    }
    render() {
        let orders = <Spinner />
        if (!this.props.loading) {
            orders = (
                <div>
                    {this.props.orders.map(order => (
                        <Order key={order.id}
                            ingredients={order.ingredients}
                            price={+order.price}
                        />
                    ))}
                </div>
            )
        }
        return (
            <div>
                {orders}
           </div>
        );
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token) => dispatch(actions.fetchOrders(token))
    };
}

const mapStateToPorps = state => {
    return {
        orders: state.orders.orders,
        loading: state.orders.loading,
        token:state.auth.token
    }
}

export default connect(mapStateToPorps, mapDispatchToProps)(withErrorHandler(Orders, axios));