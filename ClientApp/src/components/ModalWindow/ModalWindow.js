import React, { Component } from 'react'

class ModalWindow extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        const { isVisible,product } = this.props;

        return (<div className={isVisible?"modal is-active":"modal"}>
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Вы действительно хотите удалить товар? </p>
                    <button class="delete" aria-label="close"></button>
                </header>
                <section class="modal-card-body">
                    ontent
          </section>
                <footer class="modal-card-foot">
                    <button class="button is-success" onClick={this.props.closeModal} >Save changes</button>
                    <button class="button">Cancel</button>
                </footer>
            </div>
        </div>)
    }
}


export default ModalWindow;
