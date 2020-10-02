import React from 'react'
import { connect } from 'react-redux'
import { startGetProduct } from '../actions/productAction'
import moment from 'moment'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

class ProductDetails extends React.Component{

    componentDidMount(){

        const id = this.props.match.params.id
        this.props.dispatch(startGetProduct(id))

    }

    handleNav=()=>{
        const redirect=()=>{
            return this.props.history.push('/productList')
        }
        redirect()
    }

    render(){
        // console.log("cust id in Details",this.props.match.params.id)
        // console.log('product Details in Details',this.props.details)
        return(
            <div>
                {/* <ul className="nav justify-content-end">
                    <Link className="nav-item" to="/productList">
                        <a className="nav-link" href="#">Back</a>
                    </Link>
                </ul> */}

                <div align="right">
                    <Button onClick={this.handleNav}>Back</Button>
                </div>

                <h1>Product Details</h1><hr/>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label"><b>Product Name</b></label>
                    <div class="col-sm-4">
                        <input className="form-control-plaintext form-control-sm" type="text" value={this.props.details.name} readonly/>
                    </div>
                </div>
                
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label"><b>Price</b></label>
                    <div class="col-sm-4">
                        <input className="form-control-plaintext form-control-sm" type="text" value={this.props.details.price} readonly/>
                    </div>
                </div>
                
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label"><b>Created on</b></label>
                    <div class="col-sm-4">
                        <input className="form-control-plaintext form-control-sm" type="text"
                        value={moment(this.props.details.createdAt).format('dddd MMMM Do YYYY')} readonly/>
                    </div>
                </div>
                
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label"><b>Updated on</b></label>
                    <div class="col-sm-4">
                        <input className="form-control-plaintext form-control-sm" type="text" 
                        value={moment(this.props.details.updatedAt).format('dddd MMMM Do YYYY')} readonly/>
                    </div>
                </div>     
            </div>
        )
    }
}

const mstp=(state)=>{
    return {
        details : state.details
    }  
}

export default connect(mstp)(ProductDetails)