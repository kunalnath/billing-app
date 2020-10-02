import React, { useState } from 'react'
// import {Link} from 'react-router-dom'
// import {startGetProductsCrt} from '../actions/productAction'
import { connect } from 'react-redux'
// import SweetAlert from 'react-bootstrap-sweetalert'
// import { TextField } from '@material-ui/core'
// import MultiSelect from "react-multi-select-component"
import { startGetBillsCrt } from '../actions/billAction'
import Button from 'react-bootstrap/Button'
import LineItems from "./LineItems"
import { Alert } from 'reactstrap'

class BillCrtDashboard extends React.Component{
    constructor(){
        super()
        this.state={ 
            lineItems: [{ index: Math.random(), product: "", quantity: "" }],
            customer : '' ,
            date : '' 
        }
    }
    // flagE : false,
    // flagS : false,

    handleChange = (e) => {
        // console.log("e.target",e.target.dataset)
        if (["product", "quantity"].includes(e.target.name)) {
            let lineItems = [...this.state.lineItems]
            lineItems[e.target.dataset.id][e.target.name] = e.target.value
        } else {
            this.setState({ [e.target.name]: e.target.value })
        }
    }

    // handleChange=(e)=>{
    //     this.setState({
    //         [e.target.name]:e.target.value
    //     })
    // }

    // handleProdChange=(e)=>{
    //     this.setState({
    //         [e.target.name]:e.target.value
    //     })
    // }

    // handleDateChange=(e)=>{
    //     this.setState({
    //         [e.target.name]:e.target.value
    //     })  
    // }

    // handleQntyChange=(e)=>{
    //     this.setState({
    //         [e.target.name]:e.target.value
    //     })
    // } 

    handleSubmit=(e)=>{
        e.preventDefault()

        // const productData ={
        //     product : this.state.product,
        //     quantity : this.state.quantity
        // }

        // const arr = []
        // arr.push(productData)

        // const formData ={
        //     customer : this.state.customer,
        //     date : this.state.date,
        //     lineItems : arr
        // }

        const formData = this.state
        
        console.log('Bill Create formData',formData)

        if( this.state.customer == "" || this.state.date == "" || this.state.product==""){
            // this.setState({ flagE : true })
            alert('Please Enter Required Fields')
        }
        else{
            // this.setState({ flagS : true })
            alert('Bill Created Successfully')
        }
        
        this.props.dispatch(startGetBillsCrt(formData))      
        this.setState({ customer : '', product : '', quantity : ''})
    }

    // onRecieveInput=()=>{
    //     this.setState({ flagE : false , flagS : false })
    // }  

    handleNavToList=()=>{
        const redirect=()=>{
            return this.props.history.push('/billList')
        }
        redirect()
    }

    addNewRow = (e) => {
        this.setState((prevState) => ({
            lineItems: [...prevState.lineItems, { index: Math.random(), product: "", quantity: "" }],
        }))
    }

    clickOnDelete(record) {
        this.setState({
            lineItems: this.state.lineItems.filter(r => r !== record)
        })
    }

    // appendInput=()=>{

    //     var newInput = `input-${this.state.inputs.length}`
    //     this.setState(prevState => ({ inputs: prevState.inputs.concat([newInput]) }))
    // }

    // deleteInput=()=>{
        // alert(this.state.inputs.length-1)
        // this.setState(prevState => ({ inputs: prevState.inputs.splice( this.state.inputs.length - 1 , 1 ) }))

        // this.setState({
        //     inputs:this.state.inputs.filter((ele,i)=>)
        // })
    // }

    render(){
        let { lineItems } = this.state

        console.log('customers',this.props.customer)
        console.log('products',this.props.product)
        console.log('selected Cust',this.state.customer)
        console.log('selected Date',this.state.date)
        console.log('selected qty line item',this.state.quantity)
        console.log('selected prod line item',this.state.product)
        // console.log('bill object ',this.props.bills)

        return(
        
            <div>
                <div align="right">
                    <Button onClick={this.handleNavToList}>Bill List</Button>
                </div>

                <h1 align='center'>Bill Create</h1><br/>
                <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label"><b>Customer *</b></label>
                        <div class="col-sm-4">
                            <select class="form-control form-control-sm" name="customer" >
                                <option value="select">Select...</option>
                                {
                                    this.props.customer.map((customer)=>{
                                        return(
                                            <option key={customer._id} value={customer._id}> {customer.name}</option>  
                                        )  
                                    })
                                }
                            </select>
                        </div>        
                    </div><hr/>
                    {/* value={this.state.name} */}

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label"><b>Bill Date *</b></label>
                        <div class="col-sm-4">
                            <input className="form-control form-control-sm" type="date" name="date" id="date" />
                        </div>  
                    </div>
                    <table class="table">
                        <thead class="thead-light">
                            <tr>
                                <th>Product *</th>
                                <th>Quantity</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <LineItems add={this.addNewRow} delete={this.clickOnDelete.bind(this)} lineItems={lineItems} />
                        </tbody>
                    </table>

                    {/* <Button onClick={ () => this.appendInput() }>Add More</Button>{' '}
                    {this.state.inputs.length != 1 && <Button variant="btn btn-danger" onClick={ () => this.deleteInput() }><FaTrashAlt /></Button>} */}

                    {/* <form>
                        <div>
                            {this.state.inputs.map(input =>
                            <div class="row" >
                                    <div class="col">
                                        <label class="col-sm-5 col-form-label"><b>Product *</b></label>
                                        <div class="col-sm-7">
                                            <select key={input} class="form-control form-control-sm" name="product" onChange={this.handleProdChange}>
                                            <option value="select">Select...</option>
                                            {
                                                this.props.product.map((prod)=>{
                                                    return(
                                                        <option key={prod._id} value={prod._id}> {prod.name}</option>  
                                                    )
                                                })
                                            }
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col" > 
                                        <label className="col-sm-5 col-form-label"><b>Quantity</b></label>
                                        <div class="col-sm-7">
                                            <input key={input} className="form-control form-control-sm" type="text" name="quantity" value={this.state.quantity} 
                                            onChange={this.handleChange}/>
                                        </div><br/>
                                    </div>
                                </div>
                            )}
                        </div>
                    </form> */}
    
                    {/* <div class="row" >
                        <div class="col">
                            <label class="col-sm-5 col-form-label"><b>Product *</b></label>
                            <div class="col-sm-7">
                                <select class="form-control form-control-sm" name="product" onChange={this.handleProdChange}>
                                <option value="select">Select...</option>
                                {
                                    this.props.product.map((prod)=>{
                                        return(
                                            <option key={prod._id} value={prod._id}> {prod.name}</option>  
                                        )
                                    })
                                }
                                </select>
                            </div>
                        </div>
                        <div class="col" > 
                            <label className="col-sm-5 col-form-label"><b>Quantity</b></label>
                            <div class="col-sm-7">
                                <input className="form-control form-control-sm" type="text" name="quantity" value={this.state.quantity} 
                                onChange={this.handleChange}/>
                            </div> 
                        </div>
                    </div><br/> */}

                    {/* <SweetAlert
                        success
                        title="Success Data!"
                        show={this.state.flagS}
                        onConfirm={(response) => this.onRecieveInput(response)}
                        // onCancel={this.onCancel}
                        >
                    Your Invoice has been created Succesfully !
                    </SweetAlert>

                    <SweetAlert
                        warning
                        title="Error Data!"
                        show={this.state.flagE}
                        onConfirm={(response) => this.onRecieveInput(response)}
                        // onCancel={this.onCancel}
                        >
                    Please Enter all the required fields !
                    </SweetAlert> */}
                    <div align='center'><input className="btn btn-info" type="submit" value="Create Bill"></input></div>
                </form>       
            </div>
        )
    }
}

const mstp=(state)=>{
    return{
        customer:state.customers,
        product:state.products,
        bills : state.bills
    }
}

export default connect(mstp)(BillCrtDashboard)