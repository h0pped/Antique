import React, { Component } from 'react'
import OrderInfo from '../OrderInfo';

class OrderStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ordernum: '',
            is_found: null,
            find_error: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleFindOrder = this.handleFindOrder.bind(this);
    }
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    handleFindOrder() {
        const url = "/api/Orders/" + this.state.ordernum;
        fetch(url)
            .then(res => res.json())
            .then(json => {
                this.setState({ is_found: true, find_error: false, descriptionOrder: json, id: json.id })
            }, (error) => {
                this.setState({ is_found: false, find_error: true })
            });
    }
    render() {
        const { ordernum, is_found, find_error } = this.state;

        return (<div className="has-text-centered">
            <p className="is-size-3">Статус заказа</p>
            <div className="columns">
                <div className="column">
                    <p className="is-size-4">Номер заказа: </p>
                </div>
                <div className="column has-text-left is-half ">
                    <input className="input is-medium" type="number" name="ordernum" placeholder="Номер заказа" onChange={(e) => this.handleChange(e)}></input>
                </div>
                <div className="column has-text-left">

                    <button disabled={!ordernum} className="Disabled button is-dark" onClick={this.handleFindOrder}>Найти заказ</button>
                </div>


            </div>
            {is_found ? <OrderInfo order={this.state.descriptionOrder} id={this.state.descriptionOrderId}></OrderInfo> : null}
            {find_error ? <div className="column has-text-centered">
                <p className="is-size-4 has-text-danger">Заказ не был найден</p></div> : null}
        </div>)
    }
}
export default OrderStatus;