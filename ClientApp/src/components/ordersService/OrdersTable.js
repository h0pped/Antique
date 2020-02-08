import React, {Component} from 'react'
import ProductDescription from '../productdescription/ProductDescription';

class OrdersTable extends Component{
    render(){
        const {error, isloaded, orders} = this.props;
        if(error){
            return(
                <div>Ошибка при загрузке товаров: {error.message}</div>
            )
        } else if (!isloaded) {
            return <div>Загрузка...</div>;
        }
        else{
            return(<div>
                {orders.map(order => (
                    <div>

                    <h3>{order.name}</h3>
                    <br></br>
                    </div>
                    ))}
            </div>)
        }
}}
export default OrdersTable;