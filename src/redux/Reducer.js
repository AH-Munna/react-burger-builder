import * as actTypes from './ActionType.js';

const INITIAL_STATE = {
    ingredients: [{ type: 'salad', amount: 0 }, { type: 'cheese', amount: 0 }, { type: 'meat', amount: 0 }],
    totalPrice: 40,
    purchase: false,
    orders: [],
    ordersLoading: true,
    ordersLoadError: false,
    auth: { token: null, userId: null, authLoading: false, authFailedMessage: null }
}
export const INGREDIENT_PRICE = {
    salad: 30,
    meat: 60,
    cheese: 35,
}

export const Reducer = (state = INITIAL_STATE, action) => {
    const ingredient = state.ingredients.map(value => Object.assign({}, value));
    // const ingredient = [...state.ingredients];
    switch (action.type) {
        case actTypes.ADD_INGREDIENT:
            for (let item of ingredient) if (item.type === action.payload) item.amount++;
            return {
                ...state,
                ingredients: ingredient,
                totalPrice: state.totalPrice + INGREDIENT_PRICE[action.payload]
            }
        case actTypes.REMOVE_INGREDIENT:
            for (let item of ingredient) if (item.type === action.payload) {
                if (!item.amount) return state;
                item.amount--;
            }
            return {
                ...state,
                ingredients: ingredient,
                totalPrice: state.totalPrice - INGREDIENT_PRICE[action.payload]
            }
        case actTypes.PURCHASE:
            const sum = state.ingredients.reduce((sum, e) => {
                return sum += e.amount;
            }, 0);
            return {
                ...state,
                purchase: sum > 0
            }
        case actTypes.RESET_STORE:
            return {
                ...state,
                ingredients: [
                    { type: 'salad', amount: 0 },
                    { type: 'cheese', amount: 0 },
                    { type: 'meat', amount: 0 },
                ],
                totalPrice: 40,
                purchase: false,
            }
        case actTypes.ORDERS_LOADED:
            let orders = [];
            for (let key in action.payload) {
                orders.push({
                    ...action.payload[key],
                    id: key,
                })
            }
            return {
                ...state,
                orders: orders,
                ordersLoading: false,
                ordersLoadError: false,
            }
        case actTypes.ORDERS_LOAD_FAILED:
            return {
                ...state,
                ordersLoading: false,
                ordersLoadError: action.payload
            }
        case actTypes.AUTHENTICATION_SUCCESS:
            return {
                ...state,
                auth: {
                    token: action.payload.token,
                    userId: action.payload.userId,
                    authFailedMessage: null,
                }
            }
        case actTypes.AUTHENTICATION_LOGOUT:
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            localStorage.removeItem("expirationTime");
            return {
                ...state,
                auth: {
                    token: null,
                    userId: null,
                    authFailedMessage: null,
                }
            }
        case actTypes.AUTHENTICATION_LOADING:
            return {
                ...state,
                auth: { authLoading: action.payload }
            }
        case actTypes.AUTHENTICATION_FAILED:
            return {
                ...state,
                auth: { authFailedMessage: action.payload }
            }
        default:
            return state;
    }
}