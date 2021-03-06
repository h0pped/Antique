import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import Home  from './components/Home/Home';
import ProductDescription from './components/productdescription/ProductDescription'
import './app.css';
import Commodes from './components/Categories/Commodes/Commodes';
import Clocks from './components/Categories/Clocks/Clocks';
import Soft from './components/Categories/Soft/Soft';
import Tables from './components/Categories/Tables/Tables';
import Another from './components/Categories/Another/Another';
import Login from './components/Login/Login';
import AddNewProduct from './components/AddNewProduct/AddNewProduct';
import Cart from './components/Cart/Cart';
import Order from './components/ordersService/Order/Order';
import OrderService from './components/ordersService/OrderService';
import adminPanel from './components/adminPanel/adminPanel';
import OrderStatus from './components/ordersService/orderStatus/orderStatus';
import ProductUpdate from './components/productservice/ProductUpdate';

export default class App extends Component {
  static displayName = App.name;

  render () {
      return (
        
      <Layout>
        <Route exact path='/' component={Home} />

        <Route exact path='/Комоды' component={Commodes} />
        <Route exact path='/Часы' component={Clocks} />
        <Route exact path='/МягкаяЧасть' component={Soft} />
        <Route exact path='/СтолыИСтулья' component={Tables} />
        <Route exact path='/Разное' component={Another} />
        
        <Route exact path='/Login' component={Login} />
        
        <Route exact path='/description/:id' component={ProductDescription} />
        <Route exact path='/updateproduct/:id' component={ProductUpdate} />
        <Route exact path='/AddProduct' component={AddNewProduct} />
        <Route exact path='/Корзина' component={Cart} />
        <Route exact path='/Заказ' component={Order} />
        <Route exact path='/orders' component={OrderService} />
        <Route exact path="/adminPanel" component={adminPanel}/>
        <Route exact path="/Статус" component={OrderStatus}/>
      </Layout>
    );
  }
}
