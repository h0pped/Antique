import React, {Component} from 'react'

class Login extends Component{
    render(){
        return(
            <section class="hero is-fullheight">
  <div class="hero-body">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-5-tablet is-4-desktop is-3-widescreen">
          <form action="" class="box">
            <div class="field">
              <label for="" class="label">Логин</label>
              <div class="control has-icons-left">
                <input type="login" placeholder="anime" class="input" required></input>
                <span class="icon is-small is-left">
                  <i class="fa fa-user"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <label for="" class="label">Пароль</label>
              <div class="control has-icons-left">
                <input type="password" placeholder="******" class="input" required></input>
                <span class="icon is-small is-left">
                  <i class="fa fa-lock"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <button class="button is-success">
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