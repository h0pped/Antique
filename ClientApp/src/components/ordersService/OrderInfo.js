import React, { Component } from 'react'
import axios from 'axios';
import './OrderInfo.css'

// import Zoom from 'react-medium-image-zoom'
// import 'react-medium-image-zoom/dist/styles.css'
import AddInvoice from './addInvoice/AddInvoice'
import { getJwt } from '../Login/helpers';
import { Link } from 'react-router-dom';


class OrderInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isloaded: false,
            products: {},
            addInvoice: false,
            is_markedAsDone: false,

            Auth: false
        }
        this.handleAddInvoice = this.handleAddInvoice.bind(this);
        this.markAsDone = this.markAsDone.bind(this);
    }
    componentDidMount() {

        const jwtt = getJwt();
        if (jwtt) {
            this.setState({ Auth: true });
        }

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
    handleAddInvoice() {
        let add = this.state.addInvoice;
        this.setState({ addInvoice: !add });
    }
    markAsDone(i) {
        axios.post("api/Orders/markAsDone/" + i).then(res => {
            this.setState({ is_markedAsDone: true });
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        }).catch(err => {
        })
    }

    render() {
        const { order } = this.props
        const { isloaded, is_markedAsDone } = this.state
        if (!isloaded) {
            return <div>
                Загрузка...
                      <progress className="progress is-medium is-dark" max="100">45%</progress>
            </div>;
        }
        else {
            const { products, addInvoice, Auth } = this.state
            return (<div>
                <div className="card">
                    <header className="card-header">
                        <p className="card-header-title">
                            Информация о заказе
                    </p>
                    </header>
                    <div className="card-content">
                        <div className="content">
                            <p className="has-text-weight-semibold">Заказ #{order.id}</p>
                            <p className="has-text-weight-semibold">Статус заказа: {order.isDone ? "Завершён" : "Активный"}</p>
                            <br></br>
                            <p >Имя заказчика: {order.name} {order.surname}</p>
                            <p >Номер телефона: {order.number}</p>
                            <p >Город: {order.city}</p>
                            <p >Служба доставки: {order.delivery} #{order.deliveryNum}</p>
                            <p >ТТН: {(order.invoice != 0) ? order.invoice : null}</p>
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
                                            <td>
                                                {/* <Zoom > */}
                                                <img className="orderimg" src={'/images/photos/1280_' + product.photos[0].path} alt="Placeholder image"></img>
                                                {/* </Zoom> */}
                                            </td>
                                            <td>{product.name}</td>
                                            <td>{product.price.toFixed(2)} грн.</td>
                                            <td><Link to={"/description/" + product.id}>
                                                <button className="button is-black is-outlined is-rounded"><span className="icon is-small">
                                                    <i className="fas fa-bars"></i>
                                                </span></button>
                                            </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <p className="has-text-right"> Общая стоимость: {order.totalPrice.toFixed(2)} грн.</p>

                        </div>
                        {Auth ?
                            <div>
                                <div className="columns">
                                    <div className=" column ">
                                        <button className="button is-dark" onClick={this.handleAddInvoice}>Сменить ТТН</button>
                                    </div>
                                    <div className=" column ">
                                        {order.isDone ? null : <button className="button is-dark" onClick={() => this.markAsDone(order.id)}>Пометить как завершён</button>}
                                    </div>
                                    <div className="column ">
                                        {is_markedAsDone ? <p className="has-text-success">Статус заказа успешно обновлён!</p> : null}
                                    </div>
                                </div>
                                {addInvoice ? <div><AddInvoice order={this.props.order}></AddInvoice></div> : null}
                            </div>
                            : null}

                    </div>
                </div>
            </div >)
        }
    }
}
export default OrderInfo;