import React, { Component } from 'react'

class adminPanel extends Component {
    constructor() {
        super();
        this.state = {
            is_orders:true,
            is_new_orders:true,
            is_all_orders:false,
            is_statistics:false,
            is_settings:false
        }
    }
    render() {
        return (<div className="columns">
            <div className="column is-one-fifth">

            <aside class="menu">
                <p class="menu-label">
                    Панель
                 </p>
                <ul class="menu-list">
                    <li>
                        <a className={ (this.state.is_orders ?"is-active" : null)}>Заказы</a>
                        <ul>
                            <li><a>Новые заказы</a></li>
                            <li><a>Завершенные заказы</a></li>
                        </ul>
                    </li>
                    <li><a>Статистика</a></li>
                    <li><a>Настройки</a></li>
                </ul>
                
                
            </aside>
            </div>

        </div>)
    }
}
export default adminPanel;