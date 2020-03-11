import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './ProductDescription.css'
import { Slider } from 'infinite-react-carousel';
import PropTypes from "prop-types";

import { connect } from "react-redux";

import get from 'lodash.get';
import * as cartActions from '../productservice/reducer';
import { getJwt } from '../Login/helpers';


const propTypes = {
    cart: PropTypes.object.isRequired,
    addProductToCart: PropTypes.func.isRequired,
};

const defaultProps = {};

class ProductDescription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Auth:false,
            isloading: true,
            id: props.match.params.id,
            productdata: null
        }
    }
    componentDidMount() {
        const { id } = this.state;
        axios.get("/api/products/" + id).then(res => {
            this.setState({ productdata: res.data });
            this.setState({ isloading: false });
        })
        const jwtt = getJwt();
        if (jwtt) {
            this.setState({ Auth: true });
        }
    }


    render() {
        const { isloading, productdata,Auth } = this.state
        if (isloading) {
            return (<div>

                Загрузка...
                <progress className="progress is-medium is-dark" max="100">45%</progress>
            </div>
            )
        }
        else {
            const SliderSettings = {
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
                            <Slider {...SliderSettings}>
                                {productdata.photos.map((photo,index) => (
                                    <div key={index}>
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
                                <div className="columns">
                                    <div className="column">
                                        <a onClick={(e) => { e.preventDefault(); this.props.addProductToCart(productdata); }} className="button is-dark">Добавить в корзину</a>
                                    </div>
                                    {Auth?<div>
                                        <div className="column">
                                        <Link to={"/updateProduct/" + productdata.id}><a className="button is-dark">Редактировать Товар</a></Link>
                                    </div>
                                        </div>:null}
                                </div>
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