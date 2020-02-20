import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import "./Footer.css"
import { getJwt, deleteJwt } from '../Login/helpers';
import jwt from 'jsonwebtoken';
import axios from 'axios'




class Footer extends Component{
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
            console.log("JWT-->",jwtt);
          console.log("AUTH:",this.state.Auth);
          console.log("decode",jwt.decode(jwtt));
        }
    }
    handleLogOff(event){
        event.preventDefault();
        deleteJwt();
        this.setState({Auth:false})
        window.location.reload();

    }
render(){
    const {Auth} = this.state;
    return(
        <div>

        <footer className="footer is-primary">
        <div className="content has-text-centered is-primary">
            {
                Auth? 
                <div>
                 <Link to="/" onClick={(e)=>this.handleLogOff(e)}><button className="button is-dark">Выйти из аккаунта</button></Link>                
                 </div>
            :<Link to="/Login"><a className="button is-dark">Войти в аккаунт</a></Link>
        }
        </div>
      </footer>
        </div>
    )
}
   
}

export default Footer;