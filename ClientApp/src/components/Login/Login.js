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
      this.setState({loading:true,error:false})
      axios.post("/api/Account/token", this.state.form).then(res => {
        const token = res.data.access_token;
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        this.setState({loading:false})
        window.location.reload();
      }, (error) => {
        this.setState({loading:false,error:true})
      })
    }
  }

  componentDidMount() {
    const jwt = getJwt();
    if (jwt) {
      this.props.history.push('/');
      this.state.Auth = true;
    }
  }

  render() {
    return (
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                <form action="" className="box">
                  <div className="field">
                    <label className="label">Авторизация</label>
                    <div className="control has-icons-left">
                      <input type="login" name="Name" placeholder="anime" className="input" required onChange={(e) => this.handleChange(e)}></input>
                      <span className="icon is-small is-left">
                        <i className="fa fa-user"></i>
                      </span>
                    </div>
                    <p className="help is-danger">{this.state.login_error}</p>
                  </div>
                  <div className="field">
                    <label className="label">Пароль</label>
                    <div className="control has-icons-left">
                      <input type="password" name="Password" placeholder="******" className="input" required onChange={(e) => this.handleChange(e)}></input>
                      <span className="icon is-small is-left">
                        <i className="fa fa-lock"></i>
                      </span>
                    </div>
                    <p className="help is-danger">{this.state.password_error}</p>
                  </div>
                  <div className="field">
                    <button className="button is-success" onClick={(e) => this.handleSubmit(e)}>
                      Войти
              </button>
                  </div>
                </form>

                {this.state.loading ? <div className="has-text-centered">
            Загрузка...
                      <progress className="progress is-medium is-dark" max="100">45%</progress>
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