import React, { Component } from 'react';
import ProductService from './productservice/ProductService';

import { connect } from 'react-redux';

class Home extends Component {
  constructor(){
    super();
    this.state = {
      products: []
    }
  }
  updateData = (value) => {
    this.setState({ products: value })
 }

  render () {
    const {products} = this.state;

    return (
      <div className="App ">
        <div className="columns">
                <div className='column is-full has-text-centered'>
                  <h2 className="is-size-3 new-arrivals-header has-text-dark">Новые поступления</h2>
                  <ProductService updateData={this.updateData}></ProductService>
        </div>
      </div>
      </div>
    );
  }
}
export default connect()(Home);