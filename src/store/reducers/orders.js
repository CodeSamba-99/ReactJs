import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../Utility';

const initialState = {
    orderId:0,
    orders: [],
    loading: false
}

const purchaseInit = (state) => {
    return updatedObject(state, { purchased: false})
}

const purchaseBurgerStart = (state) => {
    return updatedObject(state, { loading: true})
}

const purchaseBurgerSucces = (state, action) => {
    const newOrder = {
        ...action.orderData,
        id: action.orderId
    }
    return updatedObject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)} )
}

const purchaseBurgerFail = (state) => {
    return updatedObject(state, { loading: false})
}

const fetchOrdersStart = (state) => {
    return updatedObject(state, { loading: true})
}

const fetchOrdersSuccess = (state, action) => {
    return updatedObject(state, {
        orders: action.orders,
        loading: false})
}

const fetchOrdersFail = (state) => {
    return updatedObject(state, { loading: false})
}

const burgerReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT: return purchaseInit(state)
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state)
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSucces(state, action)  
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state)
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state)
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action)
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state)
        default:return state;
    }
}

export default burgerReducer;