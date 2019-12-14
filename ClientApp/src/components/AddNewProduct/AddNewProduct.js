import React, {Component } from 'react'
import { getJwt, deleteJwt } from '../Login/helpers';
import jwt from 'jsonwebtoken';

import {Link} from 'react-router-dom'
import  { Redirect } from 'react-router-dom'


class AddNewProduct extends Component{
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
            console.log("JWT add new product-->",jwtt);
          console.log("AUTH add new product:",this.state.Auth);
        }

    }
    render(){
        const {Auth} = this.state;
        if(Auth)
        {
            return(<div>HHHH</div>)
        }
        else{
            return(<Redirect to="/Login"/>)
        }
    }
}

export default AddNewProduct;