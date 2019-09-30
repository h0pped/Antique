import React, {Component} from 'react'
import axios from 'axios'
import './ProductDescription.css'

class ProductDescription extends Component{
        constructor(props){
            super(props);
            this.state={
                isloading:true,
                id: props.match.params.id,
                productdata:null
            }
        }
        componentDidMount(){
            const {id} = this.state;
            axios.get("/api/products/"+id).then(res=>{
                this.setState({productdata:res.data});
                console.log(this.state.productdata);
                this.setState({isloading:false});
            })
        }

    
    render(){
        const handleOnDragStart = e => e.preventDefault()
        const{isloading, productdata,id} = this.state
        if(isloading){
            return(
                <h2 className="text-center">Loading...</h2>
            )
        }
        else{
            console.log(productdata);
        return(<div className="columns is-centered div-description" >
            <div key={productdata.id} className="column  has-text-centered">
                      <div className="card is-centered">
                      <div className="card-image">

                       {productdata.photos.map(photo=>(
                             <figure className="image">
                                 <img  src={'/images/'+photo.path} alt="Placeholder image"></img>
                            </figure>
                          ))}
                      </div>
                      <div className="card-content">
                          <div className="media-content">
                            <p className="title is-4">{productdata.name}</p>
                            <p className="subtitle is-6">{productdata.description}</p>
                            <p className="subtitle is-6 price">{productdata.price} грн.</p>
                          </div>
                      </div>
                      </div>
                      </div>
                      
        </div>
        )}
}
}

export default ProductDescription;