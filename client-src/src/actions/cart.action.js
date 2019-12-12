import axios from 'axios';
import {
  ADD_TO_CART,
  DELETE_FROM_CART,
  DELETE_ALL_FROM_CART,
  CHANGE_QUANTITY,
  CHECKOUT,
  GET_PROMOS
} from './actionTypes';

export const addToCart = (productData) => async dispatch =>{
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

export const checkOut = (promo) => dispatch =>{
  dispatch({
    type: CHECKOUT,
    payload: promo,
    // payload: [],
  })
}

export const getPromos = (userId) => async dispatch => {
  const res = await axios.post(`Promotions/listEnablePromotionForUser`, {userId: userId});
  dispatch({
    type: GET_PROMOS,
    payload: res.data
  })
  // dispatch({
  //   type: GET_PROMOS,
  //   payload: [
  //     {
  //       "total": 1,
  //       "minus": 0,
  //       "divide": 0.5
  //     }
  //   ]
  // })
}