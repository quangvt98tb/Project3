import { combineReducers } from 'redux';
import errorReducer from './error.reducer';
import authReducer from './auth.reducer';
import profileReducer from './profile.reducer';
//import postReducer from './post.reducer';
//import statisticReducer from './statistic.reducer';
import cartReducer from './cart.reducer'
import bookReducer from './book.reducer'

export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  books: bookReducer,
  profile: profileReducer,
  cart: cartReducer,
  //post: postReducer,
  //statistic: statisticReducer
});
