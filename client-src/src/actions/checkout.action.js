import axios from 'axios';
import {
  GET_ERRORS,
  CHECKOUT_CONFIRM,
} from './actionTypes';

export const checkOutConfirm = (checkOutData) => dispatch => {
  // try {
    //     dispatch({
    //       type: CHECKOUT_CONFIRM,
    //       payload: "success",
    //     })
    //  const response = await axios.post(`api/here`, checkOutData);
    //   } catch (error) {
    //     dispatch({
    //       type: GET_ERRORS,
    //       payload: error.response.data, 
    //     })
    //   }
    axios
    .post('/ExportOrders/createOrder', {checkOutData: checkOutData, userId: localStorage.userId})
    .then(res => 
        dispatch({
          type: CHECKOUT_CONFIRM,
          payload: res.data.data,   // return "success"
        })
    )
    .catch(error =>   // giong dang ki dang nhap validate input
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data, 
      }))
    // dispatch({
    //   type: CHECKOUT_CONFIRM,
    //   payload: "success",
    // })
};