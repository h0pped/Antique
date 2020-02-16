import React, {Component} from 'react'
import axios from 'axios'
import setAuthorizationToken from './setAuthorizationToken'
import jwt from 'jsonwebtoken';
import { getJwt } from './helpers';



class Login extends Component{
  constructor(props){
    super(props);
    this.state={
        form:{},
        Auth:false
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
  }
  handleSubmit(e){
    e.preventDefault();
    console.log(this.state.form)
    axios.post("/api/Account/token",this.state.form).then(res=>{
      console.log(res);
      const token = res.data.access_token;
      localStorage.setItem('jwtToken',token);
      setAuthorizationToken(token);
      window.location.reload();
    },(error)=>{
      console.log(error);
    })
  }

  componentDidMount(){
    const jwt = getJwt();
    if(jwt){
      this.props.history.push('/');
      this.state.Auth=true;
      console.log("JWT-->",jwt);
      console.log("AUTH:",this.state.Auth);
    }
  }

    render(){
        return(
            <section class="hero is-fullheight">
  <div class="hero-body">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-5-tablet is-4-desktop is-3-widescreen">
          <form action="" class="box">
            <div class="field">
              <label for="" class="label">Авторизация</label>
              <div class="control has-icons-left">
                <input type="login" name="Name" placeholder="anime" class="input" required onChange={(e)=>this.handleChange(e)}></input>
                <span class="icon is-small is-left">
                  <i class="fa fa-user"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <label for="" class="label">Пароль</label>
              <div class="control has-icons-left">
                <input type="password" name="Password" placeholder="******" class="input" required onChange={(e)=>this.handleChange(e)}></input>
                <span class="icon is-small is-left">
                  <i class="fa fa-lock"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <button class="button is-success" onClick={(e)=>this.handleSubmit(e)}>
                Войти
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>
        )
    }
}


export default Login;