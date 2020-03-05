import React, { Component } from 'react'
import { getJwt } from '../Login/helpers';
import ImageUploader from 'react-images-upload';
import './AddNewProduct.css'
import axios from 'axios'


// import Zoom from 'react-medium-image-zoom'
// import 'react-medium-image-zoom/dist/styles.css'

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
        "Name": "",
        "Price": "",
        "Description": "",
        "Category": "Комоды",
        ImgsBase64: []

      },

      name_error: "",
      price_error: "",
      description_error: "",
      photo_error: "",

      axios_error: false,

      isLoading: false,
    };
    this.onDrop = this.onDrop.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.validate = this.validate.bind(this);
  }
  handleDelete(id) {
    console.log("Delete photo: ", id)
    let pictures = this.state.pictureDataUrls;
    pictures.splice(id, 1);
    this.setState({
      pictureDataUrls: pictures
    })
    this.setState({

    })
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
  validate() {
    let name_error = "";
    let price_error = "";
    let description_error = "";
    let photo_error = "";
    if (this.state.form.Name.length == 0) {
      name_error = "Поле не может быть пустым";
    }
    if (this.state.form.Price.length == 0) {
      price_error = "Поле не может быть пустым";
    }
    if (this.state.form.Description.length == 0) {
      description_error = "Поле не может быть пустым";
    }
    if (this.state.form.ImgsBase64.length == 0) {
      photo_error = "Товар должен иметь фотографии"
    };
    if (name_error || description_error || price_error || photo_error) {
      this.setState({ name_error, description_error, price_error, photo_error });
      return false;
    }
    else {
      this.setState({ name_error, description_error, price_error, photo_error });
      return true;
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.validate()) {
      this.setState({ isLoading: true,axios_error:false });
      axios.put("/api/Products/add", this.state.form).then(res => {
        this.setState({ isLoading: false });
        window.location = "/"
      }, (error) => {
        console.log(error);
        this.setState({ axios_error: true, isLoading: false,axios_error_message:error })

      })
    }
    else {

    }
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
              <input class="input " maxLength="100" type="text" name="Name" placeholder="Введите название товара" onChange={(e) => this.handleChange(e)}></input>
            </div>
            <p class="help is-danger">{this.state.name_error}</p>
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
            <p class="help is-danger">{this.state.price_error}</p>
          </div>

          <div class="field">
            <label class="label">Описание товара</label>
            <div class="control">
              <textarea name="Description" class="textarea" placeholder="Введите описание товара" onChange={(e) => this.handleChange(e)}></textarea>
            </div>
            <p class="help is-danger">{this.state.description_error}</p>
          </div>
          <div class="field">
            <label class="label">Фото</label>
            <p class="help is-danger">{this.state.photo_error}</p>
            <div class="control">
              {/* <button className="button">Выбрать файлы...</button> */}
              <ImageUploader
                withIcon={false}
                buttonText='Выберите фото...'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                maxFileSize={5242880}
                label=""
              />
            </div>

          </div>

          <div class="columns is-multiline is-mobile">
            {pictureDataUrls.map((pic, index) => (
              <div key={index} className="column photocol is-one-third-dekstop is-two-tablet is-one-third-fullhd  is-full-mobile ">
                <div>
                  <div className="tag-div">

                    <button class="tag is-black" onClick={() => this.handleDelete(index)}>Удалить</button>
                  </div>
                  {/* <Zoom zoomMargin={30}> */}
                  <img src={pic} alt="dick_pick" ></img>
                  {/* </Zoom> */}
                </div>
              </div>))}
          </div>



          <br></br>

          <div class="field is-grouped">
            <div class="control">
              <button onClick={(e) => this.handleSubmit(e)} class="button is-dark">Добавить</button>
            </div>
          </div>
          {this.state.isLoading ? <div className="has-text-centered">
            Загрузка...
                      <progress class="progress is-medium is-dark" max="100">45%</progress>
          </div> : null}

          {this.state.axios_error ? <div className="has-text-centered has-text-danger">
              Ошибка во время добавления продукта
          </div> : null}

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