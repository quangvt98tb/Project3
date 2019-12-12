import {
    GET_BOOK,
    BOOK_LOADING,
    GET_ALL_BOOKS,
    GET_BY_GENRES,
    GET_AUTOCOMPLETE,
    SEARCH_BOOKS,
    GET_WISH_LIST,
    REMOVE_BOOK_WISHLIST,
    ADD_TO_WISHLIST
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
      case GET_WISH_LIST:
        return {
          ...state,
          books: payload,
          loading: false
        }
      case REMOVE_BOOK_WISHLIST:
        return {
          ...state,
          books: payload,
          loading: false
        }
      case ADD_TO_WISHLIST:
        console.log(payload)
        return state;
      default:
        return state;
    }
  };
  
  