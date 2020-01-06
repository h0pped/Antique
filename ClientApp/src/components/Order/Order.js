import React, {Component} from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import get from 'lodash.get';
import PropTypes from "prop-types";
import axios from 'axios'
import * as cartActions from '../productservice/reducer';


class Order extends Component{
    constructor(props){
        super(props);
        this.state={
            form: {
                "Delivery":"Новая почта"
              },
            name:null,
            iscreated:false,
            orderid:null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({form:{
            ...this.state.form,
            [name]:value
        }});
        console.log(name,value);
      }
    handleSubmit(event) {
        const order = {
          Name: this.state.form.Name,
          Surname: this.state.form.Surname,
          City: this.state.form.City,
          Number: this.state.form.Number,
          Delivery: this.state.form.Delivery,
          Deliverynum: this.state.form.Deliverynum,
          TotalPrice: this.props.cart.total,
          Products: this.props.cart.products
        }
        console.log("order", order);
        // axios.post("/api/Orders/add", order).then(res=>{
        //   console.log("data",res.data);
        //   this.setState({iscreated:true});
        //   this.props.clearCart();
        // });
        event.preventDefault();
      }
    render(){
        if(this.state.iscreated==true ){
            return(
              <div className="container center-align">
              <h4>Your order was succesfully created!</h4>
                <h5>
                  Our manager will communicate with you as soon as posible!
                  </h5> 
            </div>
               
            )
        }
        else if(this.props.cart.products.length==0){
          return(
            <div className="container center-align">
                 <h4>Your cart is empty :c</h4>
                </div>
          )
        }
        else{
        return(
            <div className="column is-half is-offset-one-quarter has-background-white-ter">
            <div class="field">
                <label class="label">Имя</label>
                <div class="control">
                    <input class="input " type="text" name="Name" placeholder="Введите ваше имя"  onChange={(e)=>this.handleChange(e)}></input>
                 </div>
             </div>
             <div class="field">
                <label class="label">Фамилия</label>
                <div class="control">
                    <input class="input " type="text" name="Surname" placeholder="Введите вашу фамилию"  onChange={(e)=>this.handleChange(e)}></input>
                 </div>
             </div>
             <div class="field">
                <label class="label">Город</label>
                <div class="control">
                    <input class="input " type="text" name="City" placeholder="Введите ваш город"  onChange={(e)=>this.handleChange(e)}></input>
                 </div>
             </div>
             <div class="field">
                <label class="label">Служба доставки</label>
                <div class="control">
                <div class="select">
                <select name="Delivery" className="form-price" onChange={(e)=>this.handleChange(e)}>
                  <option disabled>Выберите службу доставки</option>
                  <option>Новая почта</option>
                  <option>Интайм</option>
                  <option>Укрпочта</option>
                </select>
              </div>
                </div>
             </div>
             <div class="field">
                <label class="label">Номер отделения</label>
                <div class="control">
                    <input class="input " type="text" name="Deliverynum" placeholder="Введите номер отделения"  onChange={(e)=>this.handleChange(e)}></input>
                 </div>
             </div>
             <div class="field">
                <label class="label">Номер телефона</label>
                <div class="control">
                    <input class="input " type="text" name="Number" placeholder="Введите номер телефона"  onChange={(e)=>this.handleChange(e)}></input>
                 </div>
             </div>

            <div className="row">
                    <div className="col s6"><blockquote className="priceheader">Общая стоимость: {this.props.cart.total.toFixed(2)}грн.</blockquote></div>
                    <div className="col s6"><button className="waves-effect waves-light btn green accent-4" onClick={(e)=>this.handleSubmit(e)}>Submit <i className="material-icons small">shopping_cart</i></button></div>
                </div>
          </div>
        );
    }
}
}

const mapState = (state) => {
    return {
        cart: get(state, 'cart')
    }
  }
  
    const mapDispatch = {
      addProductToCart: (model) => {
        return cartActions.AddProductToCart(model);
      },
      deleteProductFromCart:(model)=>{
        return cartActions.deleteProductFromCart(model);
      },
      clearCart:()=>{
        return cartActions.clearCart();
      }
    }



export default connect(mapState, mapDispatch)(Order);