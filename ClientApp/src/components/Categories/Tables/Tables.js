import React, {Component } from 'react'
import ProductService from '../../productservice/ProductService'


export default class Tables extends Component{
    render(){
        return(
            <div>

            <div className="columns">
                <div className='column is-full has-text-centered'>
                  <h2 className="is-size-3 new-arrivals-header has-text-dark">Столы и стулья</h2>
                  <ProductService category="Столы и стулья"></ProductService>
                </div>
            </div>
            </div>
            )
    }
}