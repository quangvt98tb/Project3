import { combineReducers } from 'redux';
import errorReducer from './error.reducer';
import authReducer from './auth.reducer';
import profileReducer from './profile.reducer';
//import postReducer from './post.reducer';
//import statisticReducer from './statistic.reducer';
import orderReducer from './order.reducer';
import cartReducer from './cart.reducer';
import bookReducer from './book.reducer';
import commentReducer from './comment.reducer';
import ratingReducer from './rating.reducer';
import promoReducer from './promo.reducer';

export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  books: bookReducer,
  profile: profileReducer,
  cart: cartReducer,
  orders: orderReducer,
  //post: postReducer,
  //statistic: statisticReducer,
  promos: promoReducer,
  comments: commentReducer,
  ratings: ratingReducer
});
