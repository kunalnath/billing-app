import React from 'react'
import {Link} from 'react-router-dom'
import {startGetProductsCrt} from '../actions/productAction'
import { connect } from 'react-redux'
import SweetAlert from 'react-bootstrap-sweetalert'
import Button from 'react-bootstrap/Button'

class ProductCrtDashboard extends React.Component{
    constructor(){
        super()
        this.state={
            name : '',
            price : '',
            flagE : false,
            flagS : false
        }
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        const formData ={
            name : this.state.name,
            price : this.state.price
        }

        if( this.state.name == "" || this.state.price == "" ){

            this.setState({ flagE : true })
        }
        else{

            this.setState({ flagS : true })
        }
        this.props.dispatch(startGetProductsCrt(formData))
        this.setState({ name : '',  price : '' })
    }

    onRecieveInput=()=>{
        // console.log('Ok Clicked')
        this.setState({ flagE : false , flagS : false })

    }

    handleNavToList=()=>{
        const redirect=()=>{
            return this.props.history.push('/productList')
        }
        redirect()
    }

    render(){
        return(
            <div>
                {/* <ul className="nav justify-content-end">
                    <Link className="nav-item" to="/productList">
                        <a className="nav-link active" href="#">Product List</a>
                    </Link>
                </ul> */}

                <div align="right">
                    <Button onClick={this.handleNavToList}>Product List</Button>
                </div>
                <h1>Product Create</h1><br/>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label"><b>Name *</b></label>
                        <div class="col-sm-4">
                            <input className="form-control form-control-sm" type="text" name="name" value={this.state.name} 
                            onChange={this.handleChange}/>
                        </div>  
                    </div><hr/>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label"><b>Price *</b></label>
                        <div class="col-sm-4">
                            <input className="form-control form-control-sm" type="text" name="price" value={this.state.price} 
                            onChange={this.handleChange}/>
                        </div>  
                    </div><br/>
                    
                    <SweetAlert
                        success
                        title="Success Data!"
                        show={this.state.flagS}
                        onConfirm={(response) => this.onRecieveInput(response)}
                        // onCancel={this.onCancel}
                        >
                    Your Product has been created Succesfully !
                    </SweetAlert>

                    <SweetAlert
                        warning
                        title="Error Data!"
                        show={this.state.flagE}
                        onConfirm={(response) => this.onRecieveInput(response)}
                        // onCancel={this.onCancel}
                        >
                    Please Enter all the required fields !
                    </SweetAlert>
                    
                    <input className="btn btn-info" type='submit' value="Create"/>
                </form>
            </div>
        )
    }
}

export default connect()(ProductCrtDashboard)