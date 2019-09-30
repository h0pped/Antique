import React, { Component } from 'react';
import './NavBar.css';
import {Link} from 'react-router-dom'

export default class NavBar extends Component{
    render(){
        return(
            <div>
            
         <div className="columns">
             <div className="column is-full has-text-centered">
             <nav className="breadcrumb is-large is-centered" aria-label="breadcrumbs">
                 <ul>
                   <li><Link to="/Комоды">Комоды</Link></li>
                   <li><Link to="/МягкаяЧасть">Мягкая часть</Link></li>
                   <li><Link to="/СтолыИСтулья">Столы и Стулья</Link></li>
                   <li><Link to="/Часы">Часы</Link></li>
                   <li><Link to="/Разное">Разное</Link></li>
                 </ul>
                </nav>
             </div>
                
         </div>   
            </div>
        )    
}
}