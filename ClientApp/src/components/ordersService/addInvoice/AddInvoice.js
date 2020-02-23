import React, { Component } from 'react'
import Axios from 'axios';

class AddInvoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoice:null,
            is_added:false
        }
        this.AddInvoice = this.AddInvoice.bind(this);
    }
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]:value
        });
      }
    AddInvoice(i){
        Axios.post("/api/Orders/addInvoice",{
            id:i,
            invoice: this.state.invoice
        }).then(res=>{
            console.log("Invoce added sucessfully", res.data);
            this.setState({is_added:true});
            setTimeout(() => {
               window.location.reload();
              }, 3000);
        }).catch(err=>{
            console.log("Invoce error", err)
        })
    }
    render() {
        const {is_added} = this.state;
        return (<div>
            <div className="card">
                <div class="card-content">
                    <p>Введите номер накладной:</p>
                    <div className="columns">

                        <div className="column is-half">
                            <input class="input" type="number" name="invoice" placeholder="Накладная" onChange={(e)=>this.handleChange(e)}></input>
                        </div>
                        <div className="column is-one-quarter">
                            <button className="button is-success" onClick={()=>this.AddInvoice(this.props.order.id)}>Добавить</button>
                        </div>
                        
                        <div className="column is-one-quarter">
                            {is_added?<p className="has-text-success">Номер ТТН был успешно изменён!</p>:null}
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
}
export default AddInvoice;