import React, { Component } from 'react';
import ProductService from '../productservice/ProductService';
import './Home.css'
import {Link} from 'react-router-dom'

import { connect } from 'react-redux';
import Slider from 'infinite-react-carousel/lib/index';


class Home extends Component {
  constructor() {
    super();
    this.state = {
      products: []
    }
  }
  updateData = (value) => {
    this.setState({ products: value })
  }

  render() {
    const { products } = this.state;
    const SliderSettings = {
      autoplay: false,
      adaptiveHeight: true,
      arrows: true,
    };
    return (
      <div className="App ">
        <div className="slider-maindiv">
          <Slider {...SliderSettings} >
            <div className="homeCarouseldiv">
              <img src="/images/pictures/carousel-1.jpg" alt="Placeholder image"></img>
            </div>
            <div className="homeCarouseldiv">
              <img src="/images/pictures/carousel-2.jpg" alt="Placeholder image"></img>
            </div>
            <div className="homeCarouseldiv">
              <img src="/images/pictures/carousel-3.jpg" alt="Placeholder image"></img>
            </div>
          </Slider>
        </div>
        <div className="topics-div has-text-centered ">

          <div className="columns is-mobile">
            <div className="column  is-one-third-mobile is-one-third-tablet is-one-third-desktop is-one-third-widescreen is-one-third-fullhd">
              <Link to="Комоды">
              <div className="topic">
                <img src="/images/pictures/topic-furniture.jpg" alt="Placeholder image"></img>

                <div className="topics-text" >
                  <p className="topics-text-font has-text-white">Комоды и шкафы</p>
                </div>
              </div>
              </Link>
            </div>
            <div className="column is-one-third-mobile is-one-third-tablet is-one-third-desktop is-one-third-widescreen is-one-third-fullhd">
            <Link to="/МягкаяЧасть">
             
              <div className="topic">
                <img src="/images/pictures/topic-sofa.jpg" alt="Placeholder image"></img>

                <div className="topics-text" >
                  <p className="topics-text-font has-text-white">Мягкая часть</p>
                </div>
              </div>
              </Link>
            </div>
            <div className="column is-one-third-mobile is-one-third-tablet is-one-third-desktop is-one-third-widescreen is-one-third-fullhd">
              <Link to="/СтолыИСтулья">
              <div className="topic">
                <img src="/images/pictures/topic-table.jpg" alt="Placeholder image"></img>

                <div className="topics-text" >
                  <p className=" topics-text-font has-text-white">Столы и стулья</p>
                </div>
              </div>
              </Link>
            </div>
          </div>

          <div className="columns is-mobile">
          <div className="column is-one-third-mobile is-one-third-tablet is-one-third-desktop is-one-third-widescreen is-one-third-fullhd">
              <Link to="/Часы">
              <div className="topic">
                <img src="/images/pictures/topic-clock.jpg" alt="Placeholder image"></img>

                <div className="topics-text" >
                  <p className="topics-text-font has-text-white">Часы</p>
                </div>
              </div>
              </Link>
            </div>
            <div className="column is-one-third-mobile is-one-third-tablet is-one-third-desktop is-one-third-widescreen is-one-third-fullhd">
             <Link to="/Разное">
              <div className="topic">
                <img src="/images/pictures/topic-different.png" alt="Placeholder image"></img>

                <div className="topics-text" >
                  <p className="topics-text-font has-text-white topics-p">Разное</p>
                </div>
              </div>
             </Link>
            </div>
            <div className="column is-one-third-mobile is-one-third-tablet is-one-third-desktop is-one-third-widescreen is-one-third-fullhd">
              <Link to="/Статус">
              <div className="topic">
                <img src="https://i.pinimg.com/originals/07/76/f8/0776f8ccc9b90af73c282068fe454d7a.jpg" alt="Placeholder image"></img>

                <div className="topics-text" >
                  <p className="topics-text-font has-text-white">Статус заказа</p>
                </div>
              </div>
            </Link>
            </div>
          </div>
        </div>


        <div className="columns new-arrivals-column">
          <div>
          </div>
          <div className='column is-full has-text-centered'>
            <h2 className="is-size-3 new-arrivals-header has-text-dark">Новые поступления</h2>
            <ProductService updateData={this.updateData}></ProductService>
          </div>
        </div>
      </div>
    );
  }
}
export default connect()(Home);