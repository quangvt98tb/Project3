import axios from 'axios';
import {
  ADD_TO_CART,
  DELETE_FROM_CART,
  DELETE_ALL_FROM_CART,
} from './actionTypes';

export const addToCart = (productId, quantity) => dispatch =>{
  axios
    .get(`http://localhost:3000/api/books?filter[where][id]=${productId}`)
    .then(res =>
      dispatch({
        type: ADD_TO_CART,
        payload: res.data,
        productId, quantity
      }),     
    )
    .catch(err =>
      dispatch({
        type: ADD_TO_CART,
        payload: {}, productId, quantity
      }),
    );
  // return {
  //     type: ADD_TO_CART,
  //     productId,
  //     quantity
  // }
};