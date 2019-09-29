import React, { Component } from 'react';
import './Title.css'
import {Link} from 'react-router-dom'

export default class Title extends Component{
    render() {
        return(
            <div className="columns">
                <div className='column is-full'>
                    <hr className='title-style'/>
                    <Link to="/"><h1 className='title is-1 center has-text-dark has-text-centered '>Антикварная Лавка</h1></Link>
                    <hr className='title-style'/>
                </div>
            </div>
        )
    }
}