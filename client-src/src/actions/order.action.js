import axios from 'axios';
import {
  GET_ORDERS,
  GET_ORDER_DETAILS,
  ORDER_LOADING,
  DELETE_ORDER,
  CANCEL_ORDER,
} from './actionTypes';

export const getOrders = () => async dispatch => {
    const res = await axios.post(`/ExportOrders/listOrdersForUser`, {userId: localStorage.userId});
      dispatch({
          type: GET_ORDERS,
          payload: res.data.data,
      })
};

export const getOrderDetails = (orderCode) => async dispatch => {
    const res = await axios.post(`/ExportOrders/show`, {orderId: orderCode});
    dispatch({
      type: GET_ORDER_DETAILS,
      payload: res.data.data,
    })
  }

export const setOrderLoading = () => {
    return {
      type: ORDER_LOADING,
    };
  };

export const deleteOrder = () => dispatch =>{
  dispatch({
    type: DELETE_ORDER,
    payload: [],
  })
}

export const cancelOrder = (orderCode, status) =>  async dispatch =>{
  const res = await axios.post(`/ExportOrders/cancelOrder`, {orderId: orderCode});
      dispatch({
          type: GET_ORDERS,
          status
      })
}