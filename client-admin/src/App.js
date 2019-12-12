import React from 'react';
import logo from './logo.svg';
import './App.css';
import {render} from 'react-dom';
import {Admin, Resource, fetchUtils} from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import { UserList} from './components/users';
import { CategoryList, CategoryEdit, CategoryCreate } from './components/category';
import { AuthorEdit, AuthorCreate, AuthorList } from './components/authors';
import { SuppliersList, SuppliersEdit, SuppliersCreate} from './components/suppliers';
import { BookList, BookEdit, BookCreate} from './components/books';
import { ImportOrderList, ImportOderCreate, ImportOrderShow} from './components/importorder';
import { OrderList, OrderEdit } from './components/orders';
import { CommentList, CommentEdit} from './components/comments';
import { PublisherList, PublisherEdit, PublisherCreate} from './components/publisher';
import { PromotionList, PromotionEdit, PromotionCreate} from './components/promotions';
import BookIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import SupplierIcon from '@material-ui/icons/AccessAlarm';
import ImportOrder from '@material-ui/icons/Assignment';
import Order from '@material-ui/icons/Dns';
import {AdminList, AdminCreate}  from './components/admin'
import Promotion from '@material-ui/icons/More';
import authProvider from '../src/components/authProvider';

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    options.headers.set('X-Custom-Header', 'foobar');
    return fetchUtils.fetchJson(url, options);
}
const dataProvider = simpleRestProvider('http://localhost:3000/api/', httpClient);
const App = () => ( 
    <Admin dataProvider={dataProvider} >
       <Resource options={{label: "Thể loại"}} name="Categories" list={CategoryList} edit={CategoryEdit} create={CategoryCreate} />
       <Resource options={{label: "Sách"}} name="Books" list={BookList} edit={BookEdit} create={BookCreate} icon={BookIcon}/>
       <Resource options={{label: "Tác giả"}} name="Authors" list={AuthorList} edit={AuthorEdit} create={AuthorCreate} icon={UserIcon}/>
       <Resource options={{label: "Nhà xuất bản"}} name="Publishers" list={PublisherList} edit={PublisherEdit} create={PublisherCreate} />
       <Resource options={{label: "Đơn nhập hàng"}} name="ImportOrders" show={ImportOrderShow} list={ImportOrderList}  create={ImportOderCreate} icon={ImportOrder}/>
       <Resource options={{label: "Đơn hàng"}} name="ExportOrders" list={OrderList} edit={OrderEdit} icon={Order}/>
       <Resource options={{label: "Thành viên"}} name="customer" list={UserList} icon={UserIcon}/>
       <Resource options={{label: "Nhà phân phối"}} name="Suppliers" list={SuppliersList} edit={SuppliersEdit} create={SuppliersCreate} icon={SupplierIcon}/>
       <Resource options={{label: "Quản trị viên"}} name="Users" list={AdminList} create={AdminCreate} icon={Order}/>
       <Resource options={{label: "Bình Luận"}} name="Comments" list={CommentList} edit={CommentEdit} icon={BookIcon}/>
       <Resource options={{label: "Khuyến mãi"}} name="Promotions" list={PromotionList} edit={PromotionEdit} create={PromotionCreate} icon={Promotion}/>

   </Admin>
  );
export default App;
