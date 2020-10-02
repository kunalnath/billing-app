import React from 'react'
import {Link} from 'react-router-dom'
import {startGetCustCrt} from '../actions/customerCrtAction'
import { connect } from 'react-redux'
import SweetAlert from 'react-bootstrap-sweetalert'
import Button from 'react-bootstrap/Button'

class CustomerCrtDashboard extends React.Component{
    constructor(){
        super()
        this.state={
            name : '',
            mobile : '',
            email : '',
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
            mobile : this.state.mobile,
            email : this.state.email
        }

        if( this.state.name == "" || this.state.mobile == "" ){

            this.setState({ flagE : true })
        }
        else{

            this.setState({ flagS : true })
        }
        this.props.dispatch(startGetCustCrt(formData))
        this.setState({ name : '',  mobile : '', email : '' })
    }

    onRecieveInput=()=>{
        // console.log('Ok Clicked')
        this.setState({ flagE : false , flagS : false })

    }

    handleNavToList=()=>{
        const redirect=()=>{
            return this.props.history.push('/customerList')
        }
        redirect()
    }


    render(){
        return(
            <div >
                {/* <ul className="nav justify-content-end">
                    <Link className="nav-item" to="/customerList">
                        <a className="nav-link active" href="#">Customer List</a>
                    </Link>
                </ul> */}
                
                <div align="right">
                    <Button onClick={this.handleNavToList}>Customer List</Button>
                </div>
                <div >
                    <h1>Customer Create</h1><br/>
                    <form onSubmit={this.handleSubmit}>
                {/* <span class="border border-success"> */}
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label"><b>Name *</b></label>
                        <div class="col-sm-4">
                            <input className="form-control form-control-sm" type="text" name="name" value={this.state.name} 
                            onChange={this.handleChange}/>
                        </div>  
                    </div><br/>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label"><b>Mobile *</b></label>
                        <div class="col-sm-4">
                            <input className="form-control form-control-sm" type="text" name="mobile" value={this.state.mobile} 
                            onChange={this.handleChange}/>
                        </div>  
                    </div><br/>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label"><b>Email</b></label>
                        <div class="col-sm-4">
                            <input className="form-control form-control-sm" type="text" name="email" value={this.state.email} 
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
                    Your Customer has been created Succesfully !
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

                    {/* </span> */}
                    <div align="center">
                        <input className="btn btn-info" type='submit' value="Create"/>
                    </div>
                </form>
               
                </div>
            </div>
        )
    }
}

export default connect()(CustomerCrtDashboard)