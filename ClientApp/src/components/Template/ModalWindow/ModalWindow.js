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
        const { isVisible, product,is_deleted,delete_error } = this.props;

        if (isVisible) {

            return (<div className={isVisible ? "modal is-active" : "modal"}>
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title is-size-6">Вы действительно хотите удалить товар "{product.name.substr(0,30)}..."? </p>
                        <button className="delete" aria-label="close" onClick={this.props.closeModal}></button>
                    </header>
                    <section className="modal-card-body has-text-centered">
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
                    <footer className="modal-card-foot">
                        <button className="button is-danger" onClick={this.props.deleteProduct} >Удалить</button>
                        <button className="button " onClick={this.props.closeModal}>Отмена</button>
                        {is_deleted?<p className="has-text-success">Товар был успешно удалён</p>:null}
                        {delete_error?<p className="has-text-danger">Ошибка во время удаления товара</p>:null}
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
