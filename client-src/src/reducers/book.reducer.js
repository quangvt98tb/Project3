import {
    GET_BOOK,
    BOOK_LOADING,
    GET_ALL_BOOKS,
    GET_BY_GENRES,
    GET_AUTOCOMPLETE,
    SEARCH_BOOKS
  } from '../actions/actionTypes';
  
  const initialState = {
    book: null,
    books: null,
    loading: false,
    dataAuto: null,
  };
  
  export default (state = initialState, { type, payload }) => {
    switch (type) {
      case BOOK_LOADING:
        return {
          ...state,
          loading: true
        };
      case GET_BOOK:
        return {
          ...state,
          book: payload,
          loading: false
        };
      case GET_ALL_BOOKS:
        return {
          ...state,
          books: payload,
          loading: false
        };
      case GET_BY_GENRES:
        return {
          ...state,
          books: payload,
          loading: false,
        }
      case GET_AUTOCOMPLETE:
        return {
          ...state,
          dataAuto: payload,
          loading: false
        }
      case SEARCH_BOOKS:
        return {
          ...state,
          books: payload,
          loading: false
        }
      default:
        return state;
    }
  };
  
  