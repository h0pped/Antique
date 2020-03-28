import React, {Component } from 'react'
import ProductService from '../../productservice/ProductService'


export default class Clocks extends Component{
    render(){
        return(
            <div>

            <div className="columns">
                <div className='column is-full has-text-centered'>
                  <h2 className="is-size-3 new-arrivals-header has-text-dark">Часы</h2>
                  <ProductService category="Часы"></ProductService>
                </div>
            </div>
            </div>
            )
    }
}