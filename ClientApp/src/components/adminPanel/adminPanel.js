import React, { Component } from 'react'
import OrderService from '../ordersService/OrderService';
import { Redirect } from 'react-router-dom';
import { getJwt } from '../Login/helpers';
import AddNewProduct from '../AddNewProduct/AddNewProduct';

class adminPanel extends Component {
    constructor() {
        super();
        this.state = {
            is_new_orders: true,
            is_all_orders: false,
            is_statistics: false,
            is_settings: false,
            is_add_product: false,
            Auth: false
        }
    }
    componentDidMount() {
        const jwtt = getJwt();
        if (jwtt) {
            this.setState({ Auth: true })
        }

    }
    render() {
        const { Auth } = this.state
        if (Auth) {

            return (<div className="columns">
                <div className="column is-one-fifth">

                    <aside class="menu">
                        <p class="menu-label">
                            Панель
                 </p>
                        <ul class="menu-list">
                            <li>
                                <a>Заказы</a>
                                <ul>
                                    <li><a className={(this.state.is_new_orders ? "is-active" : null)} onClick={(e) => { e.preventDefault(); this.setState({ is_new_orders: true, is_all_orders: false, is_statistics: false, is_settings: false, is_add_product: false }) }}>Новые заказы</a></li>
                                    <li><a className={(this.state.is_all_orders ? "is-active" : null)} onClick={(e) => { e.preventDefault(); this.setState({ is_new_orders: false, is_all_orders: true, is_statistics: false, is_settings: false, is_add_product: false }) }}>Все заказы</a></li>
                                </ul>
                            </li>
                            <li><a className={(this.state.is_add_product ? "is-active" : null)} onClick={(e) => { e.preventDefault(); this.setState({ is_new_orders: false, is_all_orders: false, is_statistics: false, is_settings: false, is_add_product: true }) }}>Добавить новый товар</a></li>
                            <li><a className={(this.state.is_statistics ? "is-active" : null)} onClick={(e) => { e.preventDefault(); this.setState({ is_new_orders: false, is_all_orders: false, is_statistics: true, is_settings: false, is_add_product: false }) }}>Статистика</a></li>
                            <li><a className={(this.state.is_settings ? "is-active" : null)} onClick={(e) => { e.preventDefault(); this.setState({ is_new_orders: false, is_all_orders: false, is_statistics: false, is_settings: true, is_add_product: false }) }}>Настройки</a></li>
                        </ul>


                    </aside>
                </div>
                <div className="column">
                    {this.state.is_new_orders ? (<div>
                        <OrderService undone={this.state.is_new_orders}></OrderService>
                    </div>) : null}

                    {this.state.is_all_orders ? (<div>
                        <OrderService all={this.state.is_all_orders}></OrderService>
                    </div>) : null}

                    {this.state.is_statistics ? (<div>
                        <h3>Статистика</h3>
                    </div>) : null}

                    {this.state.is_settings ? (<div>
                        <h3>Настройки</h3>
                    </div>) : null}
                    {this.state.is_add_product ? (<div>
                        <div className="columns">
                            <div className="column is-full has-text-centered">
                            <h2 className="is-size-3 new-arrivals-header has-text-dark">Добавить новый товар</h2>
                            </div>
                        </div>
                        <div className="column">
                            <AddNewProduct/>    
                        </div>
                    </div>
                    ) : null}
                </div>
            </div>)
        }
        else {
            return (<div>
                Пожалуйста войдите под своим аккаунтом администратора, чтоб иметь доступ к этой странице.
            </div>)
        }

    }
}
export default adminPanel;