import { GET_COMMENT, COMMENT, COMMENT_LOADING } from './actionTypes'
import axios from 'axios'
import getDay from '../components/common/GetDay' 
export const getCommentByIdBook = (bookId) => async dispatch => {
    dispatch(setCommentLoading());
    await axios.post('/Comments/list', {bookId: bookId})
    .then( res =>  {
      dispatch({
        type: GET_COMMENT,
        payload: res.data.rows
      })
    })
  }

export const postComment = (Comment) => async dispatch =>{
  
  const user_Id = localStorage.userId
    await axios
      .post('/Comments/create', {bookId: Comment.bookId, content: Comment.content, userId: user_Id })
      .then(res => 
          dispatch({
            type: COMMENT,
            payload: res.data,
          }),
      )
      .catch(err =>
        dispatch({
          type: COMMENT,
          payload: {},
          Comment
        }),
        console.log("error")
        )
};

export const setCommentLoading = () => {
    return {
      type: COMMENT_LOADING,
    };
  };