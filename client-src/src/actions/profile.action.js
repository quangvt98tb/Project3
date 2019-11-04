import axios from 'axios';
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
  GET_PROFILES,
} from './actionTypes';

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  const user_Id = localStorage.userId
  console.log(user_Id)
  axios
    .post('customer/readProfile', {
      id: user_Id
    })
    .then(res => {
      console.log("0",res.data)
      dispatch({
        type: GET_PROFILE, 
        payload: res.data,
      })
    })
    .catch(err => {
      console.log(err)
      dispatch({
        type: GET_PROFILE,
        payload: {},
      })
    });
};

// Create Profile
export const updateProfile = (type, profileData) => dispatch => {
  axios
    .post(`api/users/${type}`, profileData)
    .then()
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING,
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};
export const deleteAccount = () => dispatch => {
  if (window.confirm('Are you sure?')) {
    axios
      .delete('api/users')
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {},
        }),
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        }),
      );
  }
};

export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`http://localhost:3000/api/profile/all`)
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data,
      }),
    )
    .catch(err =>
      //nếu không có user không đẩy ra lỗi mà để rỗng
      dispatch({
        type: GET_PROFILE,
        payload: null,
      }),
    );
};
