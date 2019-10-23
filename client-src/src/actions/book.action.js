import {
    GET_BOOK,
    BOOK_LOADING,
    GET_ALL_BOOKS,
    GET_BY_GENRES,
    GET_ERRORS,
  } from './actionTypes';
import axios from 'axios'

export const getAllBooks = () => dispatch => {
    dispatch(setBookLoading());
    axios
      .get(`/Books/list`)
      .then(res =>
        dispatch({
          type: GET_ALL_BOOKS,
          payload: res.data.data.rows,
        }),     
      )
      .catch(err =>
        dispatch({
          type: GET_ALL_BOOKS,
          payload: {},
        }),
      );
  };

export const getByGenres = (genre) => dispatch => {
  dispatch(setBookLoading());
  axios
    .get(`/Categories/listBook`, genre)
    .then(res =>
      dispatch({
        type: GET_BY_GENRES,
        payload: res.data.data.rows,
      }),     
    )
    .catch(err =>
      dispatch({
        type: GET_BY_GENRES,
        payload: {},
      }),
    );
}

export const get5Genres = () => dispatch => {
  dispatch(setBookLoading());
  axios
    .get(`/Categories/list`)
    .then(res =>
      dispatch({
        type: GET_ALL_BOOKS,
        payload: res.data.data.rows,
      }),     
    )
    .catch(err =>
      dispatch({
        type: GET_ALL_BOOKS,
        payload: {},
      }),
    );
};

export const getBookById = (bookId) => dispatch => {
  dispatch(setBookLoading());
  axios
    .get(`/Books/showBook`, bookId)
    .then(res => 
      // console.log(res.data))
      dispatch({
        type: GET_BOOK,
        payload: res.data.data,
      }))
    .catch(err =>
      dispatch({
        type: GET_BOOK,
        payload: {},
      }))
}

export const setBookLoading = () => {
    return {
      type: BOOK_LOADING,
    };
  };