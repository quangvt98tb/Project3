import {
    GET_BOOK,
    BOOK_LOADING,
    GET_ALL_BOOKS,
    GET_BY_GENRES,
    GET_ERRORS,
    GET_AUTOCOMPLETE,
    SEARCH_BOOKS,
    GET_WISH_LIST,
    REMOVE_BOOK_WISHLIST,
    ADD_TO_WISHLIST,
  } from './actionTypes';
import axios from 'axios'

export const getAllBooks = () => async dispatch => {
    dispatch(setBookLoading());
    const res = await axios.get(`/Books/list`);
      // .then(res => {
        // console.log(res.data.data.rows)
        dispatch({
          type: GET_ALL_BOOKS,
          payload: res.data.data,
        });     
      // })
      // .catch(err =>
      //   dispatch({
      //     type: GET_ALL_BOOKS,
      //     payload: {},
      //   }),
      // );
  };

export const getByGenres = (genre) => dispatch => {
  dispatch(setBookLoading());
  axios
    .post('/Categories/listBook', {genre: genre})
    .then(res => {
      dispatch({
        type: GET_BY_GENRES,
        payload: res.data,
      })  
    })
    .catch(err =>
      dispatch({
        type: GET_BY_GENRES,
        payload: {},
      }),
    );
}


export const getBookById = (bookId) => dispatch => {
  dispatch(setBookLoading());
  axios
    .post('/Books/show', {id: bookId})
    .then(res => { 
      dispatch({
        type: GET_BOOK,
        payload: res.data.data,
      })
      // console.log(res.data.data)
    })
    .catch(err =>
      dispatch({
        type: GET_BOOK,
        payload: {},
      }))
}

export const getDataAutoComplete = () => async dispatch => {
  const res = await axios.get(`Books/autoCompleted`);
  dispatch({
    type: GET_AUTOCOMPLETE,
    payload: res.data.data
  })
}

export const searchBooks = (searchData) => async dispatch => {
  const res = await axios.post(`Books/search`, {reqData: searchData});
  dispatch({
    type: SEARCH_BOOKS,
    payload: res.data.data
  })
}

export const setBookLoading = () => {
    return {
      type: BOOK_LOADING,
    };
  };

export const getWishList = (userId) => async dispatch => {
  const res = await axios.post(`/Books/listWishList`, {userId: userId});
  dispatch({
    type: GET_WISH_LIST,
    payload: res.data.data
  })
}

export const addToWishList = (bookId, userId) => async dispatch => {
  const res = await axios.post(`/Books/addToWishList`, {userId: userId, bookId: bookId, action: "add"});
  dispatch({
    type: ADD_TO_WISHLIST,
    payload: 'success'
  })
  // dispatch({})
}

export const removeBookWishList = (bookId) => async dispatch => {
  let userId = localStorage.userId
  const res = await axios.post(`Books/addToWishList`, {userId: userId, bookId: bookId, action: "remove"});
  // console.log(res)
  dispatch({
    type: REMOVE_BOOK_WISHLIST,
    payload: res.data.data
  })
  
}

