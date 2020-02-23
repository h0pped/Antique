import React, { Component } from 'react'

class AddInvoice extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (<div>
            <div className="card">
                <div class="card-content">

                    <p>Введите номер накладной:</p>
                    <div className="columns">

                        <div className="column is-half">
                            <input class="input" type="number" placeholder="Накладная"></input>
                        </div>
                        <div className="column is-one-quarter">
                            <button className="button is-success">Добавить</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
}
export default AddInvoice;