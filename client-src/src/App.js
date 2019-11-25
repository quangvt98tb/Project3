import Header from './components/layouts/Header/Header';
import Home from './components/Home/Home';
import React from 'react';
import { Provider } from 'react-redux'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/auth.action';
import { Route, BrowserRouter } from 'react-router-dom'
import PrivateRoute from './HOC/PrivateRoute';
import Footer from './components/layouts/Footer/Footer';
import Profile from './components/Profile/Profile';
import Login from './components/auth/Login/Login';
import Register from './components/auth/Register/Register';
import ProductDetails from './components/Product/ProductDetails';
import Cart from './components/Cart/Cart';
import store from './store';
import Checkout from './components/Checkout/Checkout';
import TableP from './components/Order/TablePagination';
import OrderDetails from './components/Order/OrderDetails';
import Search from './components/Search/Search';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  // Set user is authenticated
  store.dispatch(setCurrentUser(localStorage.jwtToken));
  // Check for expried token
  const currentTime = Date.now() / 1000;
  console.log(localStorage.ttl)
  // if (localStorage.ttl < currentTime) {
  //   console.log("11111111111111111111111111111");

  //   store.dispatch(logoutUser());
  //   //redirect to login
  //   window.location.href = '/login';
  // }
}

function App() {
  return (
    <main>
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/books/:id" component={ProductDetails} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/search" component={Search} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/checkout" component={Checkout} />
          <PrivateRoute exact path="/orders" component={TableP} />
          <PrivateRoute exact path="/orderdetails/:id" component={OrderDetails} />
        </BrowserRouter>
        <Footer />

      </Provider>
    </main>
  );
}

export default App;


