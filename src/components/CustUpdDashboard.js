import React from 'react'
// import {Link} from 'react-router-dom'
import { startGetUpdCust } from '../actions/customerAction'
import { connect } from 'react-redux'
import SweetAlert from 'react-bootstrap-sweetalert'
import Button from 'react-bootstrap/Button'

class CustUpdDashboard extends React.Component{
    constructor(props){
        // console.log('props in cons Upd ', props)
        // console.log('name obj in cons upd',props.customer.find(ele => ele._id == props.match.params.id).name)
        super(props)
        this.state={
            name : props.customer.find(ele => ele._id == props.match.params.id).name,
            mobile : props.customer.find(ele => ele._id == props.match.params.id).mobile,
            email : props.customer.find(ele => ele._id == props.match.params.id).email,
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
        const id = this.props.match.params.id
        // console.log(id)
        const formData ={
            name : this.state.name,
            mobile : this.state.mobile,
            email : this.state.email
        }
        console.log(formData)

        if( this.state.name == "" || this.state.mobile == "" ){

            this.setState({ flagE : true })
        }
        else{

            this.setState({ flagS : true })
        }
        this.props.dispatch(startGetUpdCust(id,formData))
        this.setState({ name : '',  mobile : '', email : '' })
    }

    onRecieveInput=()=>{
        // console.log('Ok Clicked')
        this.setState({ flagE : false , flagS : false })

        const redirect=()=>{
            return this.props.history.push('/customerList')
        }
        redirect()
    }

    handleNav=()=>{
        const redirect=()=>{
            return this.props.history.push('/customerList')
        }
        redirect()
    }

    render(){
        // console.log('customer Details in Update Page',this.props.customer)
        return(
            <div>
                {/* <ul className="nav justify-content-end">
                    <Link className="nav-item" to="/customerList">
                        <a className="nav-link active" href="#">Back</a>
                    </Link>
                </ul> */}

                <div align="right">
                    <Button onClick={this.handleNav}>Back</Button>
                </div>
                
                <h1>Update a Customer</h1><br/>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label"><b>Name *</b></label>
                        <div class="col-sm-4">
                            <input className="form-control form-control-sm" type="text" name="name" value={this.state.name} 
                            onChange={this.handleChange}/>
                        </div>  
                    </div><hr/>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label"><b>Mobile *</b></label>
                        <div class="col-sm-4">
                            <input className="form-control form-control-sm" type="text" name="mobile" value={this.state.mobile} 
                            onChange={this.handleChange}/>
                        </div>  
                    </div><hr/>
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
                    Your Customer has been updated Succesfully !
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
                    
                    <input className="btn btn-info" type='submit' value="Update"/>
                </form>
            </div>
        )
    }
}

const mstp=(state)=>{
    return{
        customer:state.customers
    }
}

export default connect(mstp)(CustUpdDashboard)