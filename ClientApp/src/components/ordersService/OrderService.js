import React, { Component } from 'react';
import Pagination from '../Pagination/Pagination'

import PropTypes from "prop-types";
import { connect } from "react-redux";
import OrdersTable from './OrdersTable'
import get from 'lodash.get';
import OrderInfo from './OrderInfo';

class OrderService extends Component {
    constructor() {
        super();
        this.state = {
            apiUrl: "/api/Orders/",
            error: null,
            isloaded: false,
            orders: [],
            currentPage: 1,
            OrdersPerPage: 12,

            isDescription: false,
            descriptionOrder: {},
            descriptionOrderId:null,

            search:''
        }
        this.openOrderInfo = this.openOrderInfo.bind(this);
    }

    openOrderInfo(order) {
        this.setState({ isDescription: true,descriptionOrder:order,descriptionOrderId:order.id });
        
    }
    updateSearch(event) {
        this.setState({ search: event.target.value });
    }

    componentDidMount() {
        let url = this.state.apiUrl;

        if (this.props.all == true) {
            url += "allOrders";
            this.setState({ apiUrl: url });
        }
        if (this.props.undone == true) {
            url += "undoneOrders";
        }

        fetch(url)
            .then(res => res.json())
            .then(json => {
                this.setState({ orders: json, isloaded: true });
            }, (error) => {
                this.setState({ isloaded: true, error });
            });
    }
    render() {
        const { orders, isloaded, error, currentPage, OrdersPerPage,isDescription } = this.state;
        const indexOfLastProduct = currentPage * OrdersPerPage;
        const indexOfFirstProduct = indexOfLastProduct - OrdersPerPage;

        let filteredOrders = orders.filter(order => {
            return ((order.name.toLowerCase().indexOf(this.state.search.toLowerCase())) != -1)||((order.surname.toLowerCase().indexOf(this.state.search.toLowerCase())) != -1)||((order.name.toLowerCase().concat(" ").indexOf(this.state.search.toLowerCase())) != -1)||((order.name.toLowerCase().concat(" ",order.surname.toLowerCase()).indexOf(this.state.search.toLowerCase())) != -1)||((order.surname.toLowerCase().concat(" ",order.name.toLowerCase()).indexOf(this.state.search.toLowerCase())) != -1)||((order.id==this.state.search))
        })
        const currentOrders = filteredOrders.slice(indexOfFirstProduct, indexOfLastProduct);

        const paginate = (pageNumber) => {
            if (pageNumber < 1 || pageNumber > Math.ceil(filteredOrders.length / OrdersPerPage)) {
                return;
            }
            else
                this.setState({ currentPage: pageNumber });
            window.scrollTo(0, 0);
        }
        return (
            <div>
                
                {isDescription?<div>
                    <OrderInfo order={this.state.descriptionOrder} id={this.state.descriptionOrderId}></OrderInfo>
                </div> :<div>
                <div className="field">
                    <label className="label">Поиск</label>
                    <div className="control has-icons-left has-icons-right">
                        <input className="input" type="text" placeholder="Поиск заказа" value={this.state.search} onChange={this.updateSearch.bind(this)}></input>
                        <span className="icon is-small is-left">
                            <i className="fas fa-search"></i>
                        </span>
                    </div>
                </div>
                    <OrdersTable openOrderInfo={this.openOrderInfo}  orders={currentOrders} isloaded={isloaded} error={error} all={this.props.all} undone={this.props.undone} />
                    <Pagination productsPerPage={OrdersPerPage} totalProducts={filteredOrders.length} paginate={paginate} currentPage={currentPage} />
                </div>}
                

                
            </div>

        )
    }
}
export default OrderService;