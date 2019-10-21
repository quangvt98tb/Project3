import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER } from './actionTypes';
import { clearCurrentProfile } from './profile.action';
export const registerUser = (userData, history) => dispatch => {
  // axios
  //   .post('/users/register', userData)
  //   .then(res => history.push('/login'))
  //   .catch(err =>
  //     dispatch({
  //       type: GET_ERRORS,
  //       payload: err.response.data,
  //     }),
  //   );
  history.push('/login');
};

export const loginUser = userData => dispatch => {
  axios
    .post('/users/login', userData)
    .then(res => {
      // save to LocalStorage
      const { token } = res.data;
      //set token to ls
      localStorage.setItem('jwtToken', token);
      // set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      //Set Current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      //console.log(err);

      return dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
  // //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
  // //set token to ls
  // localStorage.setItem('jwtToken', token);
  // // set token to Auth header17
  // setAuthToken(token);
  // // Decode token to get user data
  // const decoded = jwt_decode(token);
  // //Set Current user
  // dispatch(setCurrentUser(decoded));
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
