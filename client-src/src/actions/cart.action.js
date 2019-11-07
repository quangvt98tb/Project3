import axios from 'axios';
import {
  ADD_TO_CART,
  DELETE_FROM_CART,
  DELETE_ALL_FROM_CART,
  CHANGE_QUANTITY,
  CHECKOUT,
  GET_ERRORS,
} from './actionTypes';

export const addToCart = (productData) => dispatch =>{
  axios
    .post('/Books/addToCart', {bookId: productData.productId, quantity: productData.quantity, currentQuantity: productData.currentQuantity})
    .then(res => 
        dispatch({
          type: ADD_TO_CART,
          payload: res.data.data,
          productData
        })
    )
    .catch(err =>
      dispatch({
        type: ADD_TO_CART,
        payload: {},
        productData
      }))
};

export const deleteAll = () => dispatch =>{
  dispatch( {
      type: DELETE_ALL_FROM_CART,
    })
};

export const deleteFromCart = (productData) => dispatch =>{
  dispatch( {
      type: DELETE_FROM_CART,
      productData
    })
};

export const changeQuantity = (dataList, shipping) => dispatch =>{
  axios
    .post('/Books/updateCart', {dataList: dataList})
    .then(res => 
        dispatch({
          type: CHANGE_QUANTITY,
          payload: res.data.data, // neu thanh cong return "success", neu that bai return []
          dataList, shipping
        })
    )
};

export const checkOut = () => dispatch =>{
  dispatch({
    type: CHECKOUT,
    payload: "success",
    // payload: [],
  })
}