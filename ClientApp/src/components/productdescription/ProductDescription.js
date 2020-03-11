import React, { Component } from 'react'
import axios from 'axios'
import './ProductDescription.css'


 
import {Slider} from 'infinite-react-carousel';


import PropTypes from "prop-types";
import { connect } from "react-redux";

import get from 'lodash.get';
import * as cartActions from '../productservice/reducer';


const propTypes = {
    cart: PropTypes.object.isRequired,
    addProductToCart: PropTypes.func.isRequired,
};

const defaultProps = {};

class ProductDescription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isloading: true,
            id: props.match.params.id,
            productdata: null
        }
    }
    componentDidMount() {
        const { id } = this.state;
        axios.get("/api/products/" + id).then(res => {
            this.setState({ productdata: res.data });
            console.log(this.state.productdata);
            this.setState({ isloading: false });
        })
    }


    render() {
        const { isloading, productdata } = this.state
        if (isloading) {
            return (<div>

                Загрузка...
                <progress class="progress is-medium is-dark" max="100">45%</progress>
            </div>
            )
        }
        else {
            console.log(productdata);
            const SliderSettings =  {
                autoplay: true,
                autoplaySpeed: 5000,
                centerPadding: 30,
                dots: true,
                overScan: 5,
                wheelScroll: 5,
                centerMode: true,
              };
            return (<div className="columns is-centered div-description" >
                <div key={productdata.id} className="column  has-text-centered">
                    <div className="card is-centered">
                        <div className="card-image">
                            <Slider { ...SliderSettings }>
                            {productdata.photos.map(photo => (
                                <div>
                                    <figure className="image">
                                        <img src={'/images/photos/1280_' + photo.path} alt="Placeholder image"></img>
                                    </figure>
                            </div>
                                ))}
                            </Slider>
                            
                        </div>
                        <div className="card-content">
                            <div className="media-content">
                                <p className="title is-4">{productdata.name}</p>
                                <p className="subtitle is-6">{productdata.description}</p>
                                <p className="subtitle is-6 price">{productdata.price} грн.</p>
                                <a onClick={(e) => { e.preventDefault(); this.props.addProductToCart(productdata); }} class="button is-dark">Купить</a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            )
        }
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

ProductDescription.propTypes = propTypes;
ProductDescription.defaultProps = defaultProps;


export default connect(mapState, mapDispatch)(ProductDescription);