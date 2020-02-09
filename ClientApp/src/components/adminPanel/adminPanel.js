import React, { Component } from 'react'
import OrderService from '../ordersService/OrderService';

class adminPanel extends Component {
    constructor() {
        super();
        this.state = {
            is_new_orders:true,
            is_all_orders:false,
            is_statistics:false,
            is_settings:false
        }
    }
    render() 
    {
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
                            <li><a className={ (this.state.is_new_orders ?"is-active" : null)} onClick={(e)=>{e.preventDefault(); this.setState({is_new_orders:true,is_all_orders:false,is_statistics:false,is_settings:false})}}>Новые заказы</a></li>
                            <li><a className={ (this.state.is_all_orders ?"is-active" : null)} onClick={(e)=>{e.preventDefault(); this.setState({is_new_orders:false,is_all_orders:true,is_statistics:false,is_settings:false})}}>Завершенные заказы</a></li>
                        </ul>
                    </li>
                    <li><a className={ (this.state.is_statistics ?"is-active" : null)}>Статистика</a></li>
                    <li><a className={ (this.state.is_settings ?"is-active" : null)}>Настройки</a></li>
                </ul>
                
                
            </aside>
            </div>
            <div className="column"> 
            {this.state.is_new_orders?(<div>
                <OrderService></OrderService>
            </div>):null}
                </div>
        </div>)
    }
}
export default adminPanel;