import Header from './components/layouts/Header/Header';
import Home from './components/Home/Home';
import React from 'react';
import { Provider } from 'react-redux'
import { Route, BrowserRouter } from 'react-router-dom'

function App() {
    return (
        <div>
        <Header/>
        <Home/>
        </div>
    );
}

export default App;