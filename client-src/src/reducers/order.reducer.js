import {
    GET_ORDERS,
    GET_ORDER_DETAILS,
    ORDER_LOADING,
  } from '../actions/actionTypes';
  
const initialState = {
    order: null,
    orders: null,
    loading: true,
    error: null,
};

export default (state = initialState, { type, payload, status }) => {
    switch (type) {
        
        case ORDER_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_ORDERS:
            return {
                ...state,
                orders: payload,
                loading: false
            };
        case GET_ORDER_DETAILS:
            return {
                ...state,
                order: payload,
                loading: false
            };

        default:
            return state;
    }
};