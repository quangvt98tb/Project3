import React from 'react';
import logo from './logo.svg';
import './App.css';
import {render} from 'react-dom';
import {Admin, Resource, fetchUtils} from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import { UserList, UserEdit, UserCreate} from './components/users';
import { SuppliersList, SuppliersEdit, SuppliersCreate} from './components/suppliers';
import { BookList, BookEdit, BookCreate} from './components/books';
import { ImportOrderList, ImportOrderEdit, ImportOderCreate} from './components/importorder';
import { OrderList, OrderEdit, OrderCreate} from './components/orders';
import { PromotionList, PromotionEdit, PromotionCreate} from './components/promotions';
import BookIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import ImportOrder from '@material-ui/icons/Assignment';
import Order from '@material-ui/icons/Dns';
import Promotion from '@material-ui/icons/More';

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    options.headers.set('X-Custom-Header', 'foobar');
    return fetchUtils.fetchJson(url, options);
}
const dataProvider = simpleRestProvider('http://localhost:3000/api/', httpClient);
const App = () => (
    <Admin dataProvider={dataProvider}>
       <Resource name="customer" list={UserList} edit={UserEdit} create={UserCreate} icon={UserIcon}/>
       <Resource name="Suppliers" list={SuppliersList} edit={SuppliersEdit} create={SuppliersCreate} icon={UserIcon}/>
       <Resource name="Books" list={BookList} edit={BookEdit} create={BookCreate} icon={BookIcon}/>
       <Resource name="ImportOrders" list={ImportOrderList} edit={ImportOrderEdit} create={ImportOderCreate} icon={ImportOrder}/>
       <Resource name="Orders" list={OrderList} edit={OrderEdit} create={OrderCreate} icon={Order}/>
       <Resource name="Promotions" list={PromotionList} edit={PromotionEdit} create={PromotionCreate} icon={Promotion}/>

   </Admin>
  );
export default App;
