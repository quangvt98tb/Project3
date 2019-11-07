import axios from 'axios';
import {
  GET_ERRORS,
  CHECKOUT_CONFIRM,
} from './actionTypes';

export const checkOutConfirm = (checkOutData) => dispatch => {
    axios
    .post('/ExportOrders/createOrder', {checkOutData: checkOutData, userId: localStorage.userId})
    .then(res => {
        if (res.data.data == "success" || res.data.data == []) {
          dispatch({
            type: CHECKOUT_CONFIRM,
            payload: res.data.data,   
          })
        } else {
          return dispatch({
            type: GET_ERRORS,
            payload: res.data.data,
          });
        }
    })
    .catch(error =>   
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data, 
      }))
};