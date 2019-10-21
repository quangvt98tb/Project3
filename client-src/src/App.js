import Header from './components/layouts/Header/Header';
import Home from './components/Home/Home';
import React from 'react';
import { Provider } from 'react-redux'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/auth.action';
import { Route, BrowserRouter } from 'react-router-dom'
import PrivateRoute from './HOC/PrivateRoute';
import Footer from './components/layouts/Footer/Footer';
import Profile from './components/Profile/Profile'
import Login from './components/auth/Login/Login'
import Register from './components/auth/Register/Register'
import ProductDetails from './components/Product/ProductDetails'
import Cart from './components/Cart/Cart'
import store from './store'

if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    // Set user is authenticated
    store.dispatch(setCurrentUser(decoded));
    // Check for expried token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      store.dispatch(logoutUser());
      // clear current profile
      // store.dispatch(clearCurrentProfile());
      //redirect to login
      window.location.href = '/login';
    }
  }

function App() {
    return (
        <main>
        <Provider store={store}>
        <BrowserRouter>
        <Header/>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/books/:id" component={ProductDetails} />
            <Route exact path="/profile" component={Profile}/>
            <Route exact path="/cart" component={Cart}/>
        </BrowserRouter>
        <Footer/>
        
        </Provider>
        </main>
    );
}

export default App;


