import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import ProductDescription from './components/productdescription/ProductDescription'
import './app.css';
import Commodes from './components/Commodes/Commodes';
import Clocks from './components/Clocks/Clocks';
import Soft from './components/Soft/Soft';
import Tables from './components/Tables/Tables';

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
        
        <Route exact path='/description/:id' component={ProductDescription} />
      </Layout>
    );
  }
}
