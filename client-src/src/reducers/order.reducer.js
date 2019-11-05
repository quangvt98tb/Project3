import {
    GET_ORDERS,
    GET_ORDER_DETAILS,
    ORDER_LOADING,
    DELETE_ORDER,
    CANCEL_ORDER,
  } from '../actions/actionTypes';
  
const initialState = {
    order: null,
    orders: null,
    loading: true,
    error: null,
};

export default (state = initialState, { type, payload, status }) => {
    console.log(payload)
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
        case CANCEL_ORDER:
            if (status === "Confirmed"){
                state.order.status = "Canceled";  
                return{
                    ...state,
                    error: "success"
                }
            }
            else {
                return{
                    ...state,
                    error: "error",
                }
            }

        default:
            return state;
    }
};