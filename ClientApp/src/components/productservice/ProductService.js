import React, {Component} from 'react';
import Products from './Product.js'
import Pagination from '../Pagination/Pagination'

export default class ProductService extends Component{
    constructor(){
        super();
        this.state = {
            apiUrl: "/api/Products", 
            error:null,
            isloaded: false,
            products:[],
            currentPage:1,
            productsPerPage:12,   
        }
    }

    componentDidMount(){
        console.log(this.props.category);
        let url = this.state.apiUrl;
        
            if(this.props.category){
                console.log(this.props.category);
                 url = this.state.apiUrl+"/GetByCategory/"+this.props.category;

            }
            console.log(url);

        fetch(url)
        .then( res => res.json() )
        .then( json => { this.setState( { products : json, isloaded:true });
        },(error)=>{
            this.setState({isloaded:true, error});
        });
    }

    render(){
            const {products,isloaded,error,currentPage,productsPerPage} = this.state;
            const indexOfLastProduct= currentPage*productsPerPage;
            const indexOfFirstProduct= indexOfLastProduct-productsPerPage;
            const currentProducts= products.slice(indexOfFirstProduct,indexOfLastProduct);
            console.log(products);
            const paginate = (pageNumber) =>{
                if(pageNumber<1||pageNumber>Math.ceil(products.length/productsPerPage))
                {
                    return;
                }
                else
                this.setState({currentPage:pageNumber});
            } 
        return(
            <div>
                <Products products={currentProducts} isloaded={isloaded} error={error}/>
                <Pagination productsPerPage={productsPerPage} totalProducts={products.length} paginate={paginate} currentPage={currentPage}/>
            </div>
            )
    }
}