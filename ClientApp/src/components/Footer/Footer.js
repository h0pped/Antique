import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import "./Footer.css"

class Footer extends Component{
render(){
    return(
        <footer className="footer is-primary">
        <div className="content has-text-centered is-primary">
            <Link to="/Login"><p className="is-size-5">Войти</p></Link>
        </div>
      </footer>
    )
}
   
}

export default Footer;