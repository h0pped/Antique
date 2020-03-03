import React, { Component } from 'react'

// import Zoom from 'react-medium-image-zoom'
// import 'react-medium-image-zoom/dist/styles.css'

class ModalWindow extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        const { isVisible, product } = this.props;

        if (isVisible) {

            return (<div className={isVisible ? "modal is-active" : "modal"}>
                <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title is-size-6">Вы действительно хотите удалить товар "{product.name.substr(0,30)}..."? </p>
                        <button class="delete" aria-label="close" onClick={this.props.closeModal}></button>
                    </header>
                    <section class="modal-card-body has-text-centered">
                        {/* <Zoom zoomMargin={30} > */}
                            <img src={"/images/photos/600_"+product.photos[0].path}></img>
                        {/* </Zoom> */}
                        <p className="is-size-6">
                            {product.description.substr(0,100)}...
                        </p>
                        <p className="is-size-6">
                            {product.price} грн.
                        </p>
                 </section>
                    <footer class="modal-card-foot">
                        <button class="button is-danger" onClick={this.props.deleteProduct} >Удалить</button>
                        <button class="button " onClick={this.props.closeModal}>Отмена</button>
                    </footer>
                </div>
            </div>)

        }
        else{
            return(null)
        }
    }
}


export default ModalWindow;
