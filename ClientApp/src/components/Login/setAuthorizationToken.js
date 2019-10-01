import axios from 'axios';
import jwt from 'jsonwebtoken';

export default function setAuthorizationToken(token){
    if(token){
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        console.log("TOKEN",jwt.decode(token))
    }
    else{
        delete axios.defaults.headers.common['Authorization'];
    }
}