import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import get from 'lodash.get';
import PropTypes from "prop-types";
import axios from 'axios'
import * as cartActions from '../productservice/reducer';


class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        "Name": "",
        "Surname": "",
        "City": "",
        "Number": "",
        "Delivery": "Новая почта",
        "Deliverynum": ""
      },
      name: null,
      iscreated: false,
      orderid: null,
      isloading:false,
      name_error: "",
      surname_error: "",
      city_error: "",
      deliverynum_error: "",
      num_error: "",

    }



    this.handleSubmit = this.handleSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }


  validate() {
    let name_error = "";
    let surname_error = "";
    let city_error = "";
    let deliverynum_error = "";
    let num_error = "";

    let digitsRegex = /^[a-zA-Zа-яА-ЯёЁ]*$/;


    if(!digitsRegex.test(this.state.form.Name)){
      name_error="Поле может иметь в себе только буквы"

    }
    if(!digitsRegex.test(this.state.form.Surname)){
      surname_error="Поле может иметь в себе только буквы"

    }
    if(!digitsRegex.test(this.state.form.City)){
      city_error="Поле может иметь в себе только буквы"

    }


    if (this.state.form.Name.length == 0) {
        name_error = "Поле не может быть пустым";
      }
    if (this.state.form.Surname.length == 0) {
      surname_error = "Поле не может быть пустым";
    }
    if (this.state.form.Number.length == 0) {
      num_error = "Поле не может быть пустым";
    }
    if (this.state.form.City.length == 0) {
      city_error = "Поле не может быть пустым";
    }
    if (this.state.form.Deliverynum.length == 0) {
      deliverynum_error = "Поле не может быть пустым";

    };
    if (name_error || surname_error || city_error || deliverynum_error || num_error) {
      this.setState({ name_error, surname_error, city_error, deliverynum_error, num_error });
      return false;
    }
    else {
      this.setState({ name_error, surname_error, city_error, deliverynum_error, num_error });
      return true;
    }
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      form: {
        ...this.state.form,
        [name]: value
      }
    });
  }
  handleSubmit(event) {
    event.preventDefault();

    if (this.validate()) {
      
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
      this.setState({isloading:true});
      axios.post("/api/Orders/", order).then(res => {
        this.setState({ orderid: res.data, iscreated: true,isloading:false })

        this.props.clearCart();
      }).catch(error=>{
        this.setState({error:true,isloading:false});
      });
    }

  }
  render() {
    if (this.state.iscreated == true) {
      const { orderid } = this.state
      return (
        <div className="container has-text-centered">
          <h4>Ваш заказ успешно создан!</h4>
          <h5>
            В ближайшее время с вами свяжется наш менеджер!
                  </h5>
          <br></br>
          <h5>
            Уникальный номер заказа: {orderid}
          </h5>
        </div>

      )
    }
    else if (this.props.cart.products.length != 0) {
      return (
        <div className="column is-half is-offset-one-quarter has-background-white-ter">
          <div className="field">
            <label className="label">Имя</label>
            <div className="control">
              <input className="input " type="text" name="Name" placeholder="Введите ваше имя" onChange={(e) => this.handleChange(e)}></input>
            
            </div>
            <p className="help is-danger">{this.state.name_error}</p>
          </div>
          <div className="field">
            <label className="label">Фамилия</label>
            <div className="control">
              <input className="input " type="text" name="Surname" placeholder="Введите вашу фамилию" onChange={(e) => this.handleChange(e)}></input>
            </div>
            <p className="help is-danger">{this.state.surname_error}</p>
          </div>
          <div className="field">
            <label className="label">Город</label>
            <div className="control">
              <input className="input " type="text" name="City" placeholder="Введите ваш город" onChange={(e) => this.handleChange(e)}></input>
            </div>
            <p className="help is-danger">{this.state.city_error}</p>
            
          </div>
          <div className="field">
            <label className="label">Служба доставки</label>
            <div className="control">
              <div className="select">
                <select name="Delivery" className="form-price" onChange={(e) => this.handleChange(e)}>
                  <option disabled>Выберите службу доставки</option>
                  <option>Новая почта</option>
                  <option>Интайм</option>
                  <option>Укрпочта</option>
                </select>
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label">Номер отделения</label>
            <div className="control">
              <input className="input " type="number" name="Deliverynum" placeholder="Введите номер отделения" onChange={(e) => this.handleChange(e)}></input>
            </div>
            <p className="help is-danger">{this.state.deliverynum_error}</p>

          </div>
          <div className="field">
            <label className="label">Номер телефона</label>
            <div className="control">
              <input className="input " type="number" name="Number" placeholder="Введите номер телефона" onChange={(e) => this.handleChange(e)}></input>
            </div>
            <p className="help is-danger">{this.state.num_error}</p>

          </div>

          <div className="columns ">
            <div className="column "><blockquote className="priceheader">Общая стоимость: {this.props.cart.total.toFixed(2)}грн.</blockquote></div>
          </div>
          <div className="columns  is-centered">
            <div className="column is-narrow"><button disabled={this.state.isloading} className="button is-dark" onClick={(e) => this.handleSubmit(e)}>Подтвердить заказ</button></div>
          </div>
          {this.state.isloading ? <div className="has-text-centered">
            Загрузка...
                      <progress className="progress is-medium is-dark" max="100">45%</progress>
          </div> : null}
          {this.state.error ? <div className="has-text-centered has-text-danger">
              Ошибка во время оформления заказа. Попробуйте ещё раз.
          </div> : null}

        </div>

      );
      
    }
    else {
      return (<div className="has-text-centered"><p className="is-size-3 has-text-black">К сожалению, ваша корзина пустая!</p></div>)
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
  deleteProductFromCart: (model) => {
    return cartActions.deleteProductFromCart(model);
  },
  clearCart: () => {
    return cartActions.clearCart();
  }
}



export default connect(mapState, mapDispatch)(Order);