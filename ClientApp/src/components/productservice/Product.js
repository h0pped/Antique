import React, { Component } from 'react';
import './Product.css'
 import { Link } from 'react-router-dom'
import ModalWindow from '../Template/ModalWindow/ModalWindow'
import axios from 'axios';


class Products extends Component {
  constructor(){
    super()
    this.state={
      product:{},
      isVisible:false,
      is_deleted:false,
      delete_error:false
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
    axios.delete(url).then(data=>{
      this.setState({is_deleted:true})
      setTimeout(() => {
        window.location.reload();
       }, 2000);
    }).catch(error=>{
      this.setState({delete_error:true})
    });
  }
  handleDeleteProductModal(prod){
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
                <progress className="progress is-medium is-dark" max="100">45%</progress>
      </div>;
    }
    else if(products.length ==0){
      return <div>
        К сожалению, товаров в данной рубрике нет
      </div>
    }
    else {
      return (
        <div>
                <ModalWindow closeModal={this.closeModal} is_deleted={this.state.is_deleted} delete_error={this.state.delete_error} isVisible={this.state.isVisible} product={this.state.product} deleteProduct={this.deleteProduct}></ModalWindow>

          <div className="columns is-multiline is-mobile">

            {products.map((product,index) => (
              <div key={product.id} className="column is-one-third-dekstop is-two-tablet is-one-third-fullhd  is-full-mobile">

                <div className="card products-card">
                  {auth ? <div>
                    <a>
                    <span className="tag is-black" onClick={()=>this.handleDeleteProductModal(product)}>Удалить</span>
                    </a>
                  </div> : null}

                  <div className="card-image products-card-image">
                    <figure className="image products-image">
                      <img className="products-img" src={'/images/photos/600_' + product.photos[0].path} alt="Placeholder image"></img>
                    </figure>
                  </div>
                  <div className="card-content">
                    <div className="media-content">
                  <p className="title is-4">{product.name.substr(0,50)}{product.name.length>50?"...":null}</p>
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