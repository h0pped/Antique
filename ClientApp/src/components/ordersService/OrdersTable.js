import React, { Component } from 'react'
import ProductDescription from '../productdescription/ProductDescription';

class OrdersTable extends Component {
    render() {
        const { error, isloaded, orders,undone } = this.props;
        if (error) {
            return (
                <div>Ошибка при загрузке товаров: {error.message}</div>
            )
        } else if (!isloaded) {
            return <div className=" is-size-3 has-text-centered">Загрузка...
            <progress class="progress is-medium is-dark" max="100">45%</progress></div>;
        }
        else {
            if (orders) {

                return (<div>
                    <div className='column is-full is-mobile has-text-centered'>
                    <h2 className="is-size-3 new-arrivals-header has-text-dark">{undone?"Новые заказы":"Все заказы"}</h2>
                        
                        <div className='column is-full has-text-centered'>
                            <table className="table is-fullwidth is-bordered is-hoverable">
                                <thead>
                                    <tr>
                                        <th>Имя</th>
                                        <th>Город</th>
                                        <th>Почта</th>
                                        <th>Сумма Заказа</th>
                                        <th>Подробнее</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order, index) => (
                                        <tr key={index}>
                                            <td>{order.name + " " + order.surname}</td>
                                            <td>{order.city}</td>
                                            <td>{order.delivery + "\t№ " + order.deliveryNum}</td>
                                            <td>{order.totalPrice.toFixed(2)} грн.</td>
                                            <td><button className="button is-black is-outlined is-rounded" ><span class="icon is-small">
                                                <i class="fas fa-bars"></i>
                                            </span></button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>)
            }
            else {
                return (<div className='column is-full has-text-centered'>
                    <h2 className="is-size-3 new-arrivals-header has-text-dark">Заказы отсутствуют</h2>
                </div>)
            }
        }
    }
}
export default OrdersTable;