import React, { Component } from 'react';
import Products from './Product.js'
import Pagination from '../Pagination/Pagination'

import PropTypes from "prop-types";
import { connect } from "react-redux";

import get from 'lodash.get';

import * as cartActions from './reducer';
import { getJwt } from '../Login/helpers.js';

const propTypes = {
    cart: PropTypes.object.isRequired,
    addProductToCart: PropTypes.func.isRequired,
};

const defaultProps = {};
class ProductService extends Component {
    constructor() {
        super();
        this.state = {
            apiUrl: "/api/Products",
            error: null,
            isloaded: false,
            products: [],
            currentPage: 1,
            productsPerPage: 12,
            Auth: false
        }
    }

    componentDidMount() {
        console.log(this.props.category);
        let url = this.state.apiUrl;

        if (this.props.category) {
            console.log(this.props.category);
            url = this.state.apiUrl + "/GetByCategory/" + this.props.category;

        }
        console.log(url);

        fetch(url)
            .then(res => res.json())
            .then(json => {
                this.setState({ products: json, isloaded: true });
            }, (error) => {
                this.setState({ isloaded: true, error });
            });

        const jwtt = getJwt();
        if (jwtt) {
            this.setState({ Auth: true });
        }
    }

    render() {
        const { products, isloaded, error, currentPage, productsPerPage, Auth } = this.state;
        const indexOfLastProduct = currentPage * productsPerPage;
        const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
        const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
        console.log(products);
        const paginate = (pageNumber) => {
            if (pageNumber < 1 || pageNumber > Math.ceil(products.length / productsPerPage)) {
                return;
            }
            else
                this.setState({ currentPage: pageNumber });
            window.scrollTo(0, 0);
        }
        return (
            <div>
                <div class="field">
                    <label class="label">Поиск</label>
                    <div class="control has-icons-left has-icons-right">
                        <input class="input is-success" type="text" placeholder="Поиск товаров" value=""></input>
                        <span class="icon is-small is-left">
                            <i class="fas fa-search"></i>
                        </span>

                    </div>
                </div>
                <Products auth={Auth} addCart={this.props.addProductToCart} products={currentProducts} isloaded={isloaded} error={error} />
                <Pagination productsPerPage={productsPerPage} totalProducts={products.length} paginate={paginate} currentPage={currentPage} />
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
    }
}

ProductService.propTypes = propTypes;
ProductService.defaultProps = defaultProps;


export default connect(mapState, mapDispatch)(ProductService);