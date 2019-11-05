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
      // console.log(res.data.data)
        dispatch({
          type: ADD_TO_CART,
          payload: res.data.data,
          productData
        })
    )
    // )
    .catch(err =>
      dispatch({
        type: ADD_TO_CART,
        payload: {},
        productData
      }))
  // dispatch({
  //   type: ADD_TO_CART,
  //   payload: {
  //     category: "Tiểu thuyết",
  //     id: "5db301a366c1b16c3143e45d",
  //     imgUrl: "string",
  //     price: 2,
  //     title: "tieu thuyet 1"
  //   },
  //   productData,
  // })
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
//  try {
//     dispatch({
//       type: CHANGE_QUANTITY,
//       payload: "success",
//       dataList, shipping
//     })
// const productData = {
//     dataList: dataList,
//     shipping: shipping,
// };
//  const response = await axios.post(`api/here`, productData);
//   } catch (error) {
//     dispatch({
//       type: CHANGE_QUANTITY,
//       payload: error, 
//       dataList, shipping
//     })
//   }
  dispatch({
      type: CHANGE_QUANTITY,
      payload: "success",
      // payload: [],
      dataList, shipping
  })
};

export const checkOut = () => dispatch =>{
  dispatch({
    type: CHECKOUT,
    payload: "success",
    // payload: [],
  })
}