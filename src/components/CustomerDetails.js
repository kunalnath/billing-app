import React from 'react'
import { connect } from 'react-redux'
import { startGetCustomer } from '../actions/customerAction'
import moment from 'moment'
// import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

class CustomerDetails extends React.Component{

    componentDidMount(){
        const id = this.props.match.params.id
        this.props.dispatch(startGetCustomer(id))

    }

    handleNav=()=>{
        const redirect=()=>{
            return this.props.history.push('/customerList')
        }
        redirect()
    }

    render(){
        // console.log("cust id in Details",this.props.match.params.id)
        // console.log('customer Details in Details',this.props.details)
        return(
            <div>
                {/* <ul className="nav justify-content-end">
                    <Link className="nav-item" to="/customerList">
                        <a className="nav-link" href="#">Back</a>
                    </Link>
                </ul> */}

                <div align="right">
                    <Button onClick={this.handleNav}>Back</Button>
                </div>

                <h1>Customer Details</h1><hr/>
                <form>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label"><b>Customer Name</b></label>
                        <div class="col-sm-4">
                            <input className="form-control-plaintext form-control-sm" type="text" value={this.props.details.name} readonly/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label"><b>Email</b></label>
                        <div class="col-sm-4">
                            <input className="form-control-plaintext form-control-sm" type="text" value={this.props.details.email} readonly/>
                        </div>
                    </div>
                    
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label"><b>Mobile</b></label>
                        <div class="col-sm-4">
                            <input className="form-control-plaintext form-control-sm" type="text" value={this.props.details.mobile} readonly/>
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
                </form>                          
            </div>
        )
    }
}

const mstp=(state)=>{
    return {
        details : state.details
    }  
}

export default connect(mstp)(CustomerDetails)