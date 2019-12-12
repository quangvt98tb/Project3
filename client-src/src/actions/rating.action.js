import { RATING, RATING_LOADING, GET_RATING_USER} from './actionTypes'
import axios from 'axios'
import getDay from '../components/common/GetDay' 

export const ratingBook = (rating) => async dispatch =>{
  const user_Id = localStorage.userId
    axios
      .post('/Ratings/create', {bookId: rating.bookId, userId: user_Id, rate: rating.rate})
      .then(res => 
          dispatch({
            type: RATING,
            payload: res.data.data
          }),
          console.log("done")
      )
      .catch(err =>
        dispatch({
          type: RATING,
          payload: {}
        }),
        console.log("error")
        )
};

export const getRatingBook = (bookId) => async dispatch => {
  axios
  .post('/Ratings/list', {bookId: bookId})
  .then(res => 
    dispatch({
      type: RATING,
      payload: res.data.data,
    }),
    console.log("done")
    )
  .catch(err =>
    dispatch({
      type: RATING,
      payload: {}
    }),
    console.log("error")
    )
}

export const getRatingBookUser = (bookId, userId) => async dispatch => {
  axios
  .post('/Ratings/getRateUser', {bookId: bookId, userId: userId})
  .then(res =>
    dispatch({
      type: GET_RATING_USER,
      payload: res.data.data
    }),
    console.log("done")
    )
  .catch(err =>
    dispatch({
      type: GET_RATING_USER,
      payload: {}
    }),
    console.log("error")
    )
}

export const ratingLoading = () => {
    return {
      type: RATING_LOADING,
    };
  };