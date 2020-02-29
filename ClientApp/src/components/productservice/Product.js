import React, { Component } from 'react';
import './Product.css'
import { Link } from 'react-router-dom'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import ModalWindow from '../ModalWindow/ModalWindow'
import axios from 'axios';


class Products extends Component {
  constructor(){
    super()
    this.state={
      product:{},
      isVisible:false
    }
    this.handleDeleteProductModal = this.handleDeleteProductModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    
  }
  closeModal(){
    this.setState({isVisible:false})
  }
  deleteProduct(){
    let url = this.props.url;
    url+="/delete/"+this.state.product.id;
    console.log("Delete product url: "+url);
    axios.delete(url).then(data=>{
      window.location.reload();
    }).catch(error=>console.log(error));
  }
  handleDeleteProductModal(prod){
    console.log("DeleteProduct: ",prod)
    this.setState({product:prod, isVisible:true})
    }
  render() {
    const { error, isloaded, products, auth } = this.props;
    if (error) {
      return (
        <div>Ошибка при загрузке: {error.message}</div>
      )
    } else if (!isloaded) {
      return <div>
                Загрузка...
                <progress class="progress is-medium is-dark" max="100">45%</progress>
      </div>;
    }
    else {
      return (
        <div>
                <ModalWindow closeModal={this.closeModal} isVisible={this.state.isVisible} product={this.state.product} deleteProduct={this.deleteProduct}></ModalWindow>

          <div className="columns is-multiline is-mobile">

            {products.map((product,index) => (
              <div key={product.id} className="column is-one-third-dekstop is-two-tablet is-one-third-fullhd  is-full-mobile">

                <div className="card products-card">
                  {auth ? <div>
                    <a>
                    <span class="tag is-black" onClick={()=>this.handleDeleteProductModal(product)}>Удалить</span>
                    </a>
                  </div> : null}

                  <div className="card-image products-card-image">
                    <Zoom zoomMargin={30}>
                    <figure className="image products-image">
                      <img className="products-img" src={'/images/photos/600_' + product.photos[0].path} alt="Placeholder image"></img>
                    </figure>
                    </Zoom>
                  </div>
                  <div className="card-content">
                    <div className="media-content">
                      <p className="title is-4">{product.name}</p>
                      <p className="subtitle is-6 price">{product.price} грн.</p>
                    </div>
                  </div>
                  <footer className="card-footer">
                    <p className="card-footer-item">
                      <Link to={{ pathname: `description/${product.id}` }}>Подробнее</Link>
                    </p>
                    <p className="card-footer-item">
                      <a onClick={(e) => { e.preventDefault(); this.props.addCart(product); }}>Купить</a>
                    </p>
                  </footer>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
  }
}
export default Products;