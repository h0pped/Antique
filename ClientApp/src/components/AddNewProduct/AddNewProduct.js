import React, { Component } from 'react'
import { getJwt, deleteJwt } from '../Login/helpers';
import jwt from 'jsonwebtoken';
import ImageUploader from 'react-images-upload';
import './AddNewProduct.css'


import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import Login from '../Login/Login'

class AddNewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Auth: false,
      pictures: [],
      pictureDataUrls: []
    };
    this.onDrop = this.onDrop.bind(this);
  }
  onDrop(pictureFiles, pictureDataURLs) {
    this.setState({
      pictures: this.state.pictures.concat(pictureFiles),
      pictureDataUrls: pictureDataURLs
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
              <input class="input" type="text" placeholder="Введите название товара"></input>
            </div>
          </div>


          <div class="field">
            <label class="label">Рубрика</label>
            <div class="control">
              <div class="select">
                <select>
                  <option>Выберите рубрику</option>
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
            <label class="label">Описание товара</label>
            <div class="control">
              <textarea class="textarea" placeholder="Введите описание товара"></textarea>
            </div>
          </div>
          <div class="field">
            <label class="label">Добавить фото</label>
            <div class="control">
              <button className="button">Выбрать файлы...</button>
            </div>
          </div>
              <ImageUploader
                withIcon={false}
                buttonText='Выберите фото...'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
                label=""
              />
              <div class="columns is-multiline is-mobile">
              {pictureDataUrls.map(pic => (
                <div class="column photocol is-one-third-dekstop is-two-tablet is-one-third-fullhd  is-full-mobile ">
                  <img src={pic} alt="dick_pick" height="200px" width="250px"></img>
                </div>))}
              </div>
              


              <br></br>

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
    else {
      return (<div>Пожалуйста войдите под своим аккаунтом, чтоб иметь возможноть добавить товар</div>)
                }
              }
            }
            
export default AddNewProduct;