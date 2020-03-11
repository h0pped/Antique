import React, { Component } from 'react'
import axios from 'axios'
import ImageUploader from 'react-images-upload';
import { getJwt } from '../Login/helpers';

class ProductUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Auth: false,

            isloading: true,
            product: null,
            id: props.match.params.id,
            is_error: false,
            pictures: [],
            pictureDataUrls: [],
            productid: null,

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
            is_updated: false,
        }
        this.onDrop = this.onDrop.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.validate = this.validate.bind(this);

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

    componentDidMount() {
        const jwtt = getJwt();
        if (jwtt) {
            this.setState({ Auth: true,isloading:false })
            const { id } = this.state;
            console.log(id);
            axios.get("/api/products/" + id).then(res => {
                this.setState({
                    product: res.data, isloading: false, form: {
                        "Name": res.data.name,
                        "Price": res.data.price,
                        "Description": res.data.description,
                        "Category": res.data.category.name,
                        ImgsBase64: []
                    }
                });
            }).catch(error => {
                this.setState({ isloading: false, is_error: true });
            });
        }
        else{
            this.setState({ Auth: false,isloading:false })

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
    }
    handleSubmit(e) {
        e.preventDefault();
        if (this.validate()) {
            console.log(this.state.form);
            this.setState({ isLoading: true, axios_error: false });
            axios.post("/api/Products/editTest/" + this.state.id, this.state.form).then(res => {
                this.setState({ isLoading: false, is_updated: true });
                setTimeout(() => {
                    window.location.replace("/");
                }, 2000);
            }, (error) => {
                this.setState({ axios_error: true, isLoading: false, axios_error_message: error })

            })
        }
        else {

        }
    }
    render() {
        const { isloading, is_error, pictureDataUrls, Auth } = this.state
        if (isloading) {
            return (<div>

                Загрузка...
                <progress className="progress is-medium is-dark" max="100">45%</progress>
            </div>
            )
        }
        else if (is_error) {
            return (<div className="has-text-centered">
                <p className="has-text-danger is-size-3">Ошибка при загрузке данных</p>
            </div>
            )
        }
        else {
            if (Auth) {

                return (<div>
                    <div className="has-text-centered">
                        <p className="is-size-4 has-text-black">Редактирование Товара</p>
                    </div>
                    <div className="field">
                        <label className="label">Название</label>
                        <div className="control">
                            <input className="input " value={this.state.form.Name} maxLength="100" type="text" name="Name" placeholder="Введите название товара" onChange={(e) => this.handleChange(e)}></input>
                        </div>
                        <p className="help is-danger">{this.state.name_error}</p>
                    </div>
                    <div className="field">
                        <label className="label">Рубрика</label>
                        <div className="control">
                            <div className="select">
                                <select name="Category" className="form-price" onChange={(e) => this.handleChange(e)}>
                                    <option disabled>Выберите рубрику</option>
                                    <option value="Комоды">Комоды</option>
                                    <option value="Часы">Часы</option>
                                    <option value="Столы И cтулья">Столы и стулья</option>
                                    <option value="Мягкая Часть">Мягкая часть</option>
                                    <option value="Разное">Разноe</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Цена</label>
                        <div className="control">
                            <input className="input  form-price" value={this.state.form.Price} type="number" name="Price" placeholder="Введите цену товара" onChange={(e) => this.handleChange(e)}></input>
                        </div>
                        <p className="help is-danger">{this.state.price_error}</p>
                    </div>

                    <div className="field">
                        <label className="label">Описание товара</label>
                        <div className="control">
                            <textarea name="Description" value={this.state.form.Description} className="textarea" placeholder="Введите описание товара" onChange={(e) => this.handleChange(e)}></textarea>
                        </div>
                        <p className="help is-danger">{this.state.description_error}</p>
                    </div>
                    <div className="field">
                        <label className="label">Фото</label>
                        <p className="help is-danger">{this.state.photo_error}</p>
                        <div className="control">
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

                    <div className="columns is-multiline is-mobile">
                        {pictureDataUrls.map((pic, index) => (
                            <div key={index} className="column photocol is-one-third-dekstop is-two-tablet is-one-third-fullhd  is-full-mobile ">
                                <div>
                                    <div className="tag-div">

                                        <button className="tag is-black" onClick={() => this.handleDelete(index)}>Удалить</button>
                                    </div>
                                    {/* <Zoom zoomMargin={30}> */}
                                    <img src={pic} alt="dick_pick" ></img>
                                    {/* </Zoom> */}
                                </div>
                            </div>))}

                    </div>
                    <div className="field is-grouped">
                        <div className="control">
                            <button onClick={(e) => this.handleSubmit(e)} className="button is-dark">Редактировать</button>
                        </div>
                    </div>
                    {this.state.isLoading ? <div className="has-text-centered">
                        Загрузка...
                      <progress className="progress is-medium is-dark" max="100">45%</progress>
                    </div> : null}

                    {this.state.is_error ? <div className="has-text-centered has-text-danger">
                        Ошибка во время редактирования продукта
          </div> : null}
                    {this.state.is_updated ? <div className="has-text-centered has-text-success">
                        Продукт был успешно отредактирован!
          </div> : null}

                </div>)
            }
            else {
                return (<div>
                    Пожалуйста войдите под своим аккаунтом администратора, чтоб иметь доступ к этой странице.
                </div>)
            }
        }
    }
}
export default ProductUpdate;