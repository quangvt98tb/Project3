import axios from 'axios';
import {
  GET_ORDERS,
  GET_ORDER_DETAILS,
  ORDER_LOADING,
  DELETE_ORDER,
  CANCEL_ORDER,
} from './actionTypes';

export const getOrders = () => dispatch => {
    axios
      .post(`/ExportOrders/listOrdersForUser`, {userId: localStorage.userId})
      .then(res => {
        // console.log(res.data.data)
          dispatch({
              type: GET_ORDERS,
              payload: res.data.data,
          })
      })
      .catch(error =>
          dispatch({
              type: GET_ORDERS,
              payload: ["empty"],
          }),
      );
    // dispatch({
    //   type: GET_ORDERS,
    //   payload: [{
    //     "shipDate": "23/11/2019",
    //     "orderCode": "S4980XA",
    //     "orderDate": "08/05/2019",
    //     "fullName": "Karna Steinhammer",
    //     "status": "Delivered",
    //     "books": ["bafADF","hidsagfh","ihsdbf"]
    //   }, {
    //     "shipDate": "23/11/2019",
    //     "orderCode": "Z946",
    //     "orderDate": "22/11/2018",
    //     "fullName": "Rheba Mauvin",
    //     "status": "Shipping",
    //     "books": ["bafADF"]
    //   }, {
    //     "shipDate": "23/11/2019",
    //     "orderCode": "S22081",
    //     "orderDate": "03/10/2019",
    //     "fullName": "Jarvis Dornin",
    //     "status": "Canceled",
    //     "books": ["ygifahsh","sgdgh"]
    //   }, {
    //     "shipDate": "23/11/2019",
    //     "orderCode": "T38996D",
    //     "orderDate": "20/12/2018",
    //     "fullName": "Jeramey McHardy",
    //     "status": "Delivered",
    //     "books": ["ygifahsh",'ashfjkh']
    //   }, {
    //     "shipDate": "23/11/2019",
    //     "orderCode": "W5629XD",
    //     "orderDate": "22/06/2019",
    //     "fullName": "Oralie Merkle",
    //     "status": "Canceled",
    //     "books": ["ygifahsh"]
    //   }, {
    //     "shipDate": "23/11/2019",
    //     "orderCode": "M2453",
    //     "orderDate": "23/01/2019",
    //     "fullName": "Katy Twinberrow",
    //     "status": "Delivered",
    //     "books": ["shdf"]
    //   }, {
    //     "shipDate": "23/11/2019",
    //     "orderCode": "V9530",
    //     "orderDate": "14/08/2019",
    //     "fullName": "Neal Scollan",
    //     "status": "Confirmed",
    //     "books": ["shdf",'ahgfhas','ashdgfhasdgf','jiashdf']
    //   }, {
    //     "shipDate": "23/11/2019",
    //     "orderCode": "S50829S",
    //     "orderDate": "01/06/2019",
    //     "fullName": "Ashlie Borne",
    //     "status": "Confirmed",
    //     "books": ["ygifahsh",'hdfhghksdafks']
    //   }, {
    //     "shipDate": "23/11/2019",
    //     "orderCode": "S52392B",
    //     "orderDate": "22/02/2019",
    //     "fullName": "Ursa Vodden",
    //     "status": "Delivered",
    //     "books": ["bafADF",'hasgaskf']
    //   }, {
    //     "shipDate": "23/11/2019",
    //     "orderCode": "M2102",
    //     "orderDate": "09/09/2019",
    //     "fullName": "Darryl Lawday",
    //     "status": "Delivered",
    //     "books": ["ygifahsh"]
    //   }]
      //  payload: ["empty"],
    // })
};

export const getOrderDetails = (orderCode) => dispatch => {
    dispatch(setOrderLoading());
    axios
      .get(`/ExportOrders/show`, {orderId: orderCode})
      .then(res => 
        dispatch({
          type: GET_ORDER_DETAILS,
          payload: res.data.data,
          orderCode,
        }))
      .catch(err =>
        dispatch({
          type: GET_ORDER_DETAILS,
          payload: {},
        }))
    // dispatch({
    //   type: GET_ORDER_DETAILS,
    //   payload: {
    //     profileData: {
    //       details: "32B ngõ 296/86",
    //       district: "Quận Ba Đình",
    //       email: "vudat1710@gmail.com",
    //       errors: {},
    //       fullName: "Vu Tien Dat",
    //       phone: "0123456789",
    //       province: "HANOI",
    //       ward: "Minh Khai"
    //     },
    //     cart: {
    //       addedItems: [
    //         {
    //           author: "Johny Apedaile",
    //           genre: "Drama",
    //           id: "5d8980766f920a2016f5af50",
    //           imgUrl: "https://sueddie.files.wordpress.com/2015/12/blackass_igoni-barrett.jpg",
    //           price: 7,
    //           quantity: 4,
    //           title: "Different from the Others"
    //         },
    //         {
    //           author: "Vladimir Lewry",
    //           genre: "Comedy|Crime|Drama",
    //           id: "5d8980766f920a2016f5af52",
    //           imgUrl: "https://sueddie.files.wordpress.com/2015/12/blackass_igoni-barrett.jpg",
    //           price: 9,
    //           quantity: 4,
    //           title: "Eulogy"
    //         }
    //       ], 
    //       total: 64, 
    //       shipping: 10, 
    //       grandTotal: 74
    //     },
    //     checkOutType: 1,
    //     orderDate: "22/02/2019",
    //     shipDate: "23/11/2019",
    //     status: "Confirmed",
    //   },
    // })
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

export const cancelOrder = (orderCode, status) => dispatch =>{
  dispatch({
    type: CANCEL_ORDER,
    payload: [],
    status,
  })
}