import {
    GET_BOOK,
    BOOK_LOADING,
    GET_ALL_BOOKS,
    GET_BY_GENRES,
    GET_ERRORS,
    GET_AUTOCOMPLETE,
    SEARCH_BOOKS,
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
  console.log(1,genre);
  dispatch(setBookLoading());
  axios
    .post('/Categories/listBook', {genre: genre})
    .then(res => {
      dispatch({
        type: GET_BY_GENRES,
        payload: res.data.rows,
      })  
    })
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
    .post('/Books/show', {id: bookId})
    .then(res => { 
      dispatch({
        type: GET_BOOK,
        payload: res.data.data,
      })
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