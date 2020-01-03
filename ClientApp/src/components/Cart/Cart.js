import React, { Component } from 'react';
import get from 'lodash.get';
import PropTypes from "prop-types";
import * as cartActions from '../productservice/reducer';
import { connect } from "react-redux";

const propTypes = {
    cart: PropTypes.object.isRequired,
    addProductToCart: PropTypes.func.isRequired,
    deleteProductFromCart: PropTypes.func.isRequired,
    clearCart: PropTypes.func.isRequired,
};
const defaultProps = {};

class Cart extends Component {
    constructor() {
        super();

    }

    render() {
        return (
            <div>
                <div className="columns">
                    <div className='column is-full has-text-centered'>
                        <h2 className="is-size-3 new-arrivals-header has-text-dark">Корзина</h2>
                    </div>
                </div>
                    <div className='column is-full has-text-centered'>
                        <table className="table is-fullwidth is-bordered is-hoverable">
                            <thead>
                                <tr>
                                    <th>Артикль</th>
                                    <th>Название</th>
                                    <th>Цена</th>
                                    <th>Удалить</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.cart.products.map((product, index) => (
                                    <tr key={index}>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price.toFixed(2)}грн.</td>
                                        <td><button className="button is-black is-outlined is-rounded" onClick={(e) => { e.preventDefault(); this.props.deleteProductFromCart(index); }}><span class="icon is-small">
                                            <i class="fas fa-minus-circle"></i>
                                        </span></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

        )
    }
}

const mapState = (state) => {
    return {
        cart: get(state, 'cart')
    }
}

const mapDispatch = {
    addProductToCart: (model) => {
        return cartActions.AddProductToCart(model);
    },
    deleteProductFromCart: (model) => {
        return cartActions.deleteProductFromCart(model);
    },
    clearCart: () => {
        return cartActions.clearCart();
    }
}


Cart.propTypes = propTypes;
Cart.defaultProps = defaultProps;

export default connect(mapState, mapDispatch)(Cart);