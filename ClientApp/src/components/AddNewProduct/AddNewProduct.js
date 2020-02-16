import React, { Component } from 'react'
import { getJwt, deleteJwt } from '../Login/helpers';
import jwt from 'jsonwebtoken';
import ImageUploader from 'react-images-upload';
import './AddNewProduct.css'
import axios from 'axios'

import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import Login from '../Login/Login'

class AddNewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Auth: false,
      pictures: [],
      pictureDataUrls: [],
      form: {
        "Category": "Комоды"
      }
    };
    this.onDrop = this.onDrop.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    console.log(name, value);
  }

  handleSubmit(e) {
    e.preventDefault();

    console.log(this.state.form)
    axios.put("/api/Products/add", this.state.form).then(res => {
      window.location = "/"
    }, (error) => {
      console.log(error);
    })
  }
  onDrop(pictureFiles, pictureDataURLs) {
    this.setState({
      pictures: this.state.pictures.concat(pictureFiles),
      pictureDataUrls: pictureDataURLs,
      form: {
        ...this.state.form,
        ImgsBase64: pictureDataURLs
      }
    });
    console.log("data: ", pictureDataURLs);
    console.log("from state: ", this.state.pictureDataUrls);
  }
  componentDidMount() {
    const jwtt = getJwt();
    if (jwtt) {
      this.setState({ Auth: true })
      console.log("JWT add new product-->", jwtt);
      console.log("AUTH add new product:", this.state.Auth);
    }

  }
  render() {
    const { Auth, pictureDataUrls } = this.state;
    if (Auth) {
      return (
        <div>
          <div class="field">
            <label class="label">Название</label>
            <div class="control">
              <input class="input " type="text" name="Name" placeholder="Введите название товара" onChange={(e) => this.handleChange(e)}></input>
            </div>
          </div>


          <div class="field">
            <label class="label">Рубрика</label>
            <div class="control">
              <div class="select">
                <select name="Category" className="form-price" onChange={(e) => this.handleChange(e)}>
                  <option disabled>Выберите рубрику</option>
                  <option>Комоды</option>
                  <option>Часы</option>
                  <option>Столы и стулья</option>
                  <option>Мягкая часть</option>
                  <option>Разноe</option>
                </select>
              </div>
            </div>
          </div>
          <div class="field">
            <label class="label">Цена</label>
            <div class="control">
              <input class="input  form-price" type="number" name="Price" placeholder="Введите цену товара" onChange={(e) => this.handleChange(e)}></input>
            </div>
          </div>

          <div class="field">
            <label class="label">Описание товара</label>
            <div class="control">
              <textarea name="Description" class="textarea" placeholder="Введите описание товара" onChange={(e) => this.handleChange(e)}></textarea>
            </div>
          </div>
          <div class="field">
            <label class="label">Фото</label>
            <div class="control">
              {/* <button className="button">Выбрать файлы...</button> */}
              <ImageUploader
                withIcon={false}
                buttonText='Выберите фото...'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
                label=""
              />
            </div>
          </div>

          <div class="columns is-multiline is-mobile">
            {pictureDataUrls.map(pic => (
              <div class="column photocol is-one-third-dekstop is-two-tablet is-one-third-fullhd  is-full-mobile ">
                <img src={pic} alt="dick_pick" ></img>
              </div>))}
          </div>



          <br></br>

          <div class="field is-grouped">
            <div class="control">
              <button onClick={(e) => this.handleSubmit(e)} class="button is-dark">Добавить</button>
            </div>
            <div class="control">
              <button class="button  is-dark">Отмена</button>
            </div>
          </div>
        </div>
      )
    }
    else {
      return (<div>
          Пожалуйста войдите под своим аккаунтом администратора, чтоб иметь доступ к этой странице. 
        </div>)
    }
  }
}

export default AddNewProduct;