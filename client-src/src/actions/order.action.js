import axios from 'axios';
import {
  GET_ORDERS,
  GET_ORDER_DETAILS,
  ORDER_LOADING,
  DELETE_ORDER,
  GET_ERRORS
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
    console.log(res.data.data)
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
  let data = {}
  data.orderId = orderCode
  await axios.post(`/ExportOrders/editOrder`, {reqData: data, action: 'cancel'});
      dispatch({
          type: GET_ORDERS,
          status
      })
}

export const editOrder = (newInfo) => async dispatch => {
  const res = await axios.post(`/ExportOrders/editOrder`, {reqData: newInfo, action: 'edit'});
  if (res.data.data == "Confirmed"){
    dispatch({
      type: GET_ORDERS,
      payload: res.data.data
    })
  } else {
    dispatch({
      type: GET_ERRORS,
      payload: res.data.data
    })
  }
}