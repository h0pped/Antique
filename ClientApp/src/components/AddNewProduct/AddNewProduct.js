import React, {Component } from 'react'
import { getJwt, deleteJwt } from '../Login/helpers';
import jwt from 'jsonwebtoken';

import {Link} from 'react-router-dom'
import  { Redirect } from 'react-router-dom'
import Login from '../Login/Login'

class AddNewProduct extends Component{
    constructor(props){
        super(props);
        this.state={
            Auth:false
        };
    }
    componentDidMount(){
        const jwtt = getJwt();
        if(jwtt){
            this.setState({Auth:true})
            console.log("JWT add new product-->",jwtt);
          console.log("AUTH add new product:",this.state.Auth);
        }

    }
    render(){
        const {Auth} = this.state;
        if(Auth)
        {
            return(
                <div>
                    <div class="field">
  <label class="label">Название</label>
  <div class="control">
    <input class="input" type="text" placeholder="Введите название товара"></input>
  </div>
</div>


<div class="field">
  <label class="label">Рубрика</label>
  <div class="control">
    <div class="select">
      <select>
        <option>Выберите рубрику</option>
      </select>
    </div>
  </div>
</div>

<div class="field">
  <label class="label">Описание товара</label>
  <div class="control">
    <textarea class="textarea" placeholder="Введите описание товара"></textarea>
  </div>
</div>

<div class="field is-grouped">
  <div class="control">
    <button class="button is-dark">Добавить</button>
  </div>
  <div class="control">
    <button class="button  is-dark">Отмена</button>
  </div>
</div>
                </div>
                )
        }
        else{
            return(<div>Пожалуйста войдите под своим аккаунтом, чтоб иметь возможноть добавить товар</div>)
        }
    }
}

export default AddNewProduct;