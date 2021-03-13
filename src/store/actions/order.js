import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSucces = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData:orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error:error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type:actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
            .then(responce => {
                dispatch(purchaseBurgerSucces(responce.data.name, orderData));
               // this.props.history.push('/');
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error));
            });
    };
}

export const purchaseInit = () => {
    return {
        type:actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders:orders
    }
}

export const fetchOrdersFail = () => {
    return {
        type:actionTypes.FETCH_ORDERS_FAIL
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = (token) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('/orders.json')
            .then(res => {
                console.log(res.data);
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
                
            })
            .catch(err => {
                dispatch(fetchOrdersFail());
            });
    }
}