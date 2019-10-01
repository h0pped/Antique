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

    }
render(){
    const {Auth} = this.state;
    return(
        <footer className="footer is-primary">
        <div className="content has-text-centered is-primary">
            {
             Auth? 
             <div>
                 <Link to="/Login"><a className="button is-dark">Добавить новый товар</a></Link>  
                 <br/>
                 <br/>
            <Link to="/" onClick={(e)=>this.handleLogOff(e)}><a className="button is-dark">Выйти</a></Link>                
                 </div>
            :<Link to="/Login"><a className="button is-dark">Войти</a></Link>
            
            }
            
        </div>
      </footer>
    )
}
   
}

export default Footer;