import axios from 'axios';
import * as actTypes from './ActionType.js';

export const addIngredient = itemType => {
    return {
        type: actTypes.ADD_INGREDIENT,
        payload: itemType,
    }
}
export const removeIngredient = itemType => {
    return {
        type: actTypes.REMOVE_INGREDIENT,
        payload: itemType,
    }
}
export const purchase = () => {
    return {
        type: actTypes.PURCHASE,
    }
}

export const resetIngredients = () => {
    return {
        type: actTypes.RESET_STORE
    }
}

// orders
const ordersLoad = orders => {
    return {
        type: actTypes.ORDERS_LOADED,
        payload: orders
    }
}
const ordersLoadFailed = error => {
    return {
        type: actTypes.ORDERS_LOAD_FAILED,
        payload: error
    }
}
export const asyncFetchOrders = (token, userId) => dispatch => {
    const queryParam = '&orderBy="userId"&equalTo="' + userId + '"';
    axios.get('https://react-burger-builder-26069-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json?auth=' + token + queryParam)
        .then(response => dispatch(ordersLoad(response.data)))
        .catch(error => dispatch(ordersLoadFailed(error.message)));
}