import React from 'react'
import { connect } from 'react-redux'
// import {Link} from 'react-router-dom'
import { startGetBillsDet } from '../actions/billAction'
import moment from 'moment'
import Button from 'react-bootstrap/Button'
import { startGetCustomer } from '../actions/customerAction'

class BillDetails extends React.Component{
    
    componentDidMount(){

        const id = this.props.match.params.id
        this.props.dispatch(startGetBillsDet(id))
        this.getCustomer()
    }

    getCustomer=()=>{
        const idC = this.props.match.params.idC
        this.props.dispatch(startGetCustomer(idC))
    }

    handleNav=()=>{
        const redirect=()=>{
            return this.props.history.push('/billList')
        }
        redirect()
    }

    render(){
        console.log('Bill Details in Details',this.props.details)
        console.log("LineItems",this.props.details.lineItems)
        console.log("Type of LineItems",typeof(this.props.details.lineItems))
        console.log("Bill id",this.props.match.params.id)
        console.log("customer id in Bill Obj (idC)",this.props.match.params.idC)
        console.log("List of customers in Bill Details",this.props.customer)
        console.log("prod det",this.props.prodDetails)
        console.log("products list in Bill Details",this.props.products)
        
        return(
            <div>
                {/* <div align="right"><button class="btn btn-link">Log Out</button></div> */}

                <div align="right">
                    <Button onClick={this.handleNav}>Back</Button>
                </div>
                <div align="center"><h2>Bill Receipt</h2></div>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label"><b>Customer Name</b></label>
                    <div class="col-sm-4">
                        <input className="form-control-plaintext form-control-sm" type="text" 
                        value={this.props.custDetails.name} 
                        readonly/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label"><b>Email</b></label>
                    <div class="col-sm-4">
                        <input className="form-control-plaintext form-control-sm" type="text" 
                        value={this.props.custDetails.email} 
                        readonly/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label"><b>Phone No</b></label>
                    <div class="col-sm-4">
                        <input className="form-control-plaintext form-control-sm" type="text" 
                        value={this.props.custDetails.mobile} 
                        readonly/>
                    </div>
                </div>


                <table className='table'>
                    <thead class="thead-light">
                        <tr>
                            <th>Sl No</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Price ( ₹ )</th>
                            <th>Sub Total ( ₹ )</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.props.details.lineItems ? 
                        this.props.details.lineItems.map((product,i)=>{
                            return(
                                <tr key={product._id}>
                                    <td>{i+1}</td>
                                    <td>
                                        {
                                            this.props.products.map(prod => {
                                                if(prod._id === product.product){
                                                    return(      
                                                        <div> {prod.name}</div>
                                                    )
                                                }    
                                            })
                                        }
                                    </td> 
                                    <td>{product.quantity}</td>
                                    <td>{product.price}</td>
                                    <td>{product.subTotal}</td>
                                </tr>
                            )
                        }): ''}
                        
                    </tbody>
                </table>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label"><b>Grand Total ( ₹ )</b></label>
                    <div class="col-sm-4">
                        <input className="form-control-plaintext form-control-sm" type="text" value={this.props.details.total} readonly/>
                    </div>
                </div>      

            </div>
        )
    }
}

const mstp=(state,props)=>{
    const id =  props.match.params.id
    const idC = props.match.params.id
    return{
        details : state.details,
        custDetails : state.custDetails,
        prodDetails : state.prodDetails,
        customer:state.customers,
        products : state.products
    }
}

export default connect(mstp)(BillDetails)