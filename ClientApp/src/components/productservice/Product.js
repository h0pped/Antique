import React, {Component} from 'react';
import './Product.css'
import {Link} from 'react-router-dom'



class Products extends Component{
    render(){
        const {error, isloaded, products} = this.props;
        if(error){
            return(
                <div>Ошибка при загрузке товаров: {error.message}</div>
            )
        } else if (!isloaded) {
            return <div>Загрузка...</div>;
        }
        else{
            return(
                <div>
                    <div className="columns is-multiline is-mobile">
                    {products.map(product => (
                    <div key={product.id} className="column is-one-third-dekstop is-two-tablet is-one-third-fullhd  is-full-mobile">
                      <div className="card products-card">
                      <div className="card-image products-card-image">
                        <figure className="image products-image">
                          <img className="products-img" src={'/images/'+product.photos[0].path} alt="Placeholder image"></img>
                        </figure>
                      </div>
                      <div className="card-content">
                          <div className="media-content">
                            <p className="title is-4">{product.name}</p>
                            <p className="subtitle is-6 price">{product.price} грн.</p>
                          </div>
                      </div>
                        <footer className="card-footer">
                          <p className="card-footer-item">
                          <Link to={{pathname:`description/${product.id}`}}>Подробнее</Link>
                          </p>
                          <p className="card-footer-item">
                          <a onClick={(e)=>{e.preventDefault(); this.props.addCart(product);}}>Купить</a>
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