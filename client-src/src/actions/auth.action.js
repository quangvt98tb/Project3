import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
// import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER } from './actionTypes';
import { clearCurrentProfile } from './profile.action';

export const registerUser = (userData, history) => dispatch => {
  axios
    .post('customer/createCustomer', userData)
    .then(res => {
      if (res.data.status === 400){
        dispatch({
          type: GET_ERRORS,
          payload: res.data,
        });
      }
      else history.push('/login')
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.data,
      });
    });
};

export const loginUser = userData => dispatch => {
  axios
    .post('customer/loginCustomer', userData)
    .then(res => {
      // save to LocalStorageno
      if (res.data.status !== 400) {
        console.log(res.data)
        const token = res.data.id;
        const user_id = res.data.userId;
        const cart = {
          addedItems: [],
          total: 0,
          shipping: 10,
          error: "",
        }
        //set token to ls
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('userId', user_id);
        localStorage.setItem('ttl', res.data.ttl);
        localStorage.setItem('cart', JSON.stringify(cart))
        // set token to Auth header
        setAuthToken(token);
        //Set Current user
        dispatch(setCurrentUser(token));
      } else {
        return dispatch({
          type: GET_ERRORS,
          payload: res.data,
        });
      }
    })
    .catch(err => {
      console.log(err)
      return dispatch({
        type: GET_ERRORS,
        payload: err.data,
      });
    });
};

export const setCurrentUser = token => {
  return {
    type: SET_CURRENT_USER,
    payload: token,
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  axios
  .post('customer/logout')
  .then( res => {
    console.log(res)
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('userId')
  localStorage.removeItem('ttl')
  localStorage.removeItem('cart')
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  //Remove user profile
  dispatch(clearCurrentProfile());
  })
};
