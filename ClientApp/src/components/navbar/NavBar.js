import React, { Component } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom'
import { connect } from "react-redux";

import get from 'lodash.get';

class NavBarius extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>

                <div className="columns">
                    <div className="column is-full has-text-centered">
                        <nav className="breadcrumb is-large is-centered" aria-label="breadcrumbs">
                            <ul>
                                <li><Link to="/Комоды">Комоды</Link></li>
                                <li><Link to="/МягкаяЧасть">Мягкая часть</Link></li>
                                <li ><Link to="/СтолыИСтулья">Столы и Стулья</Link></li>
                                <li><Link to="/Часы">Часы</Link></li>
                                <li className="is-right"><Link to="/Разное">Разное</Link></li>
                                <li ><Link className="cartButton" to="/Корзина"><span class="icon">
                                    <i class="fas fa-shopping-cart"></i>
                                </span>{this.props.cart.count}</Link></li>
                 </ul>
                </nav>
                </div>
            </div>   
            </div >
        )
    }
}
class NavBar extends Component {


    render() {
        return (
            <div className="header App text-center">
                <NavBarius cart={this.props.cart} />
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        cart: {
            count: get(state, 'cart.products').length
        }
    }
}

export default connect(mapState)(NavBar);