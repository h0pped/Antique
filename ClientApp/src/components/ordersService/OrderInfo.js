import React, { Component } from 'react'
import axios from 'axios';
import './OrderInfo.css'

import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import AddInvoice from './addInvoice/AddInvoice'


class OrderInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isloaded: false,
            products: {},
            addInvoice:false,
        }
        this.handleAddInvoice = this.handleAddInvoice.bind(this);
    }
    componentDidMount() {
        let apiproducts = [];
        this.props.order.items.forEach(el => {
            axios.get("api/Products/" + el.productId).then(res => {

                this.setState(previousState => ({
                    products: [...previousState.products, res.data]
                }));
            })
        })
        this.setState({ products: apiproducts, isloaded: true })
    }
    handleAddInvoice(){
        let add = this.state.addInvoice;
        this.setState({addInvoice:!add});
        console.log("add ttn: ",add);
    }

    render() {
        const { order } = this.props
        const { isloaded } = this.state
        console.log(order);
        if (!isloaded) {
            return <div>
                Загрузка...
                      <progress class="progress is-medium is-dark" max="100">45%</progress>
            </div>;
        }
        else {
            const { products,addInvoice } = this.state
            console.log("PRODUCTS:", this.state.products);
            return (<div>
                <div className="card">
                    <header class="card-header">
                        <p class="card-header-title">
                            Информация о заказе
                    </p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            <p className="has-text-weight-semibold">Заказ #{order.id}</p>
                            <p  className="has-text-weight-semibold">Статус заказа: {order.isDone ? "Завершён" : "Активный"}</p>
                            <br></br>
                            <p >Имя заказчика: {order.name} {order.surname}</p>
                            <p >Номер телефона: {order.number}</p>
                            <p >Город: {order.city}</p>
                            <p >Служба доставки: {order.delivery} #{order.deliveryNum}</p>
                            <br></br>
                            <p>Товары:</p>
                            <table className="table is-fullwidth is-bordered is-hoverable">
                                <thead>
                                    <tr>
                                        <th>Артикль</th>
                                        <th>Фото</th>
                                        <th>Название</th>
                                        <th>Цена</th>
                                        <th>Подробнее</th>
                                    </tr>
                                </thead>
                                <tbody>{
                                    products.map((product, index) => (
                                        <tr key={index}>
                                            <td>{product.id}</td>
                                            <td><Zoom >
                                                <img className="orderimg" src={'/images/photos/1280_' + product.photos[0].path} alt="Placeholder image"></img>
                                            </Zoom>
                                            </td>
                                            <td>{product.name}</td>
                                            <td>{product.price.toFixed(2)} грн.</td>
                                            <td><button className="button is-black is-outlined is-rounded"><span class="icon is-small">
                                                <i class="fas fa-bars"></i> 
                                            </span></button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <p className="has-text-right"> Общая стоимость: {order.totalPrice.toFixed(2)} грн.</p>

                        </div>
                        <div class="columns">

                        <div className=" column  is-one-quarter">
                            <button className="button is-dark" onClick={this.handleAddInvoice}>Добавить ТТН</button>
                        </div>
                        <div className=" column  is-one-quarter">
                            <button className="button is-dark">Редактировать заказ</button>
                        </div>
                        <div className="column ">

                        </div>
                        </div>
                        {addInvoice?<div><AddInvoice order={this.props.order}></AddInvoice></div>:null}
                    </div>
                </div>
            </div>)
        }
    }
}
export default OrderInfo;