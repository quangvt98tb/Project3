import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER } from './actionTypes';
import { clearCurrentProfile } from './profile.action';

export const registerUser = (userData, history) => dispatch => {
  axios
    .post('customer/createCustomer', userData)
    .then(res => {
      if (res.data.status == 400){
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
  console.log(userData)
  axios
    .post('customer/loginCustomer', userData)
    .then(res => {
      console.log(res.data)
      if (res.data.status == 400){
        dispatch({
          type: GET_ERRORS,
          payload: res.data,
        });
      } else {
        // save to LocalStorageno
        const token = res.data.id;
        //set token to ls
        localStorage.setItem('jwtToken', token);
        // set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        // const decoded = jwt_decode(token);
        //Set Current user
        dispatch(setCurrentUser(token)); 
      }
    })
    .catch(err => {
      console.log("err",err)
      return dispatch({
        type: GET_ERRORS,
        payload: err.data,
      });
    });
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  //Remove user profile
  dispatch(clearCurrentProfile());
};
