import axios from 'axios';
import {
  GET_ERRORS,
  CHECKOUT_CONFIRM,
} from './actionTypes';

export const checkOutConfirm = (checkOutData) => async dispatch => {
  const res = await axios.post('/ExportOrders/createOrder', {checkOutData: checkOutData, userId: localStorage.userId})
    // axios
    // .post('/ExportOrders/createOrder', {checkOutData: checkOutData, userId: localStorage.userId})
    // .then(res => {
    //     console.log(res.data.data)
        if (res.data.data === "success" ) {
          dispatch({
            type: CHECKOUT_CONFIRM,
            payload: res.data.data,   
          })
        } else {
          dispatch({
            type: GET_ERRORS,
            payload: res.data.data,
          });
        }
    // })
};