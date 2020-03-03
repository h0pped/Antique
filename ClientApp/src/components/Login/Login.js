import React, { Component } from 'react'
import axios from 'axios'
import setAuthorizationToken from './setAuthorizationToken'
import jwt from 'jsonwebtoken';
import { getJwt } from './helpers';



class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        "Name":"",
        "Password":""
      },
      Auth: false,
      loading:false,
      error:false,
      login_error: "",
      password_error: "",
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }
  validate() {
    console.log(this.state.form);
    let login_error = "", password_error = "";
    if (this.state.form.Name.length == 0) {
      login_error = "Поле должно быть заполнено"
     
    }
    if (this.state.form.Password.length == 0) {
      password_error = "Поле должно быть заполнено"
    }
    if (login_error || password_error) {
      this.setState({login_error, password_error});
      return false;
    }
    else {
      this.setState({login_error, password_error});
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
  handleSubmit(e) {
    e.preventDefault();

    if (this.validate()) {
      console.log(this.state.form)
      this.setState({loading:true,error:false})
      axios.post("/api/Account/token", this.state.form).then(res => {
        console.log(res);
        const token = res.data.access_token;
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        this.setState({loading:false})
        window.location.reload();
      }, (error) => {
        console.log(error);
        this.setState({loading:false,error:true})
      })
    }
  }

  componentDidMount() {
    const jwt = getJwt();
    if (jwt) {
      this.props.history.push('/');
      this.state.Auth = true;
      console.log("JWT-->", jwt);
      console.log("AUTH:", this.state.Auth);
    }
  }

  render() {
    return (
      <section class="hero is-fullheight">
        <div class="hero-body">
          <div class="container">
            <div class="columns is-centered">
              <div class="column is-5-tablet is-4-desktop is-3-widescreen">
                <form action="" class="box">
                  <div class="field">
                    <label for="" class="label">Авторизация</label>
                    <div class="control has-icons-left">
                      <input type="login" name="Name" placeholder="anime" class="input" required onChange={(e) => this.handleChange(e)}></input>
                      <span class="icon is-small is-left">
                        <i class="fa fa-user"></i>
                      </span>
                    </div>
                    <p class="help is-danger">{this.state.login_error}</p>
                  </div>
                  <div class="field">
                    <label for="" class="label">Пароль</label>
                    <div class="control has-icons-left">
                      <input type="password" name="Password" placeholder="******" class="input" required onChange={(e) => this.handleChange(e)}></input>
                      <span class="icon is-small is-left">
                        <i class="fa fa-lock"></i>
                      </span>
                    </div>
                    <p class="help is-danger">{this.state.password_error}</p>
                  </div>
                  <div class="field">
                    <button class="button is-success" onClick={(e) => this.handleSubmit(e)}>
                      Войти
              </button>
                  </div>
                </form>

                {this.state.loading ? <div className="has-text-centered">
            Загрузка...
                      <progress class="progress is-medium is-dark" max="100">45%</progress>
          </div> : null}

          {this.state.error ? <div className="has-text-centered has-text-danger">
              Неверный логин или пароль
          </div> : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}


export default Login;