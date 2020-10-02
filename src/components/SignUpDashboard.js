import React from 'react'
import { connect } from 'react-redux'
import { startGetUser } from '../actions/userAction'
import { Link } from 'react-router-dom'
import SweetAlert from 'react-bootstrap-sweetalert'
import { BsEye , BsEyeSlash } from "react-icons/bs"
import Button from 'react-bootstrap/Button'

class SignUpDashboard extends React.Component{
    constructor(){
        super()
        this.state={
            username : '',
            password : '',
            email : '',     
            businessName : '',
            address : '',
            flagE : false,
            flagS : false,
            vis : false

        }
    }

    handleChange =(e)=>{
        this.setState({
            [e.target.name] : e.target.value
        }) 
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        // alert('submit')
        const formData = {
            username : this.state.username,
            password : this.state.password,
            email : this.state.email,
            businessName : this.state.businessName,
            address : this.state.address

        }
        if( this.state.username == "" || this.state.password == "" || this.state.email == "" ){

            this.setState({ flagE : true })
        }
        else{

            this.setState({ flagS : true })
        }

        this.props.dispatch(startGetUser(formData))
        this.setState({ username:'' , password : '' , email : '' , businessName : '' , address : '' })

    }

    onRecieveInput=()=>{
        // console.log('Ok Clicked')
        this.setState({ flagE : false , flagS : false })

        const redirect=()=>{
            return this.props.history.push('/login')
        }
        redirect()

    }

    handleVis =()=>{
        this.setState((prevState)=>{
            return{
                vis : !prevState.vis
            }
        }) 
    }

    render(){
        return(
            <div>
                <ul className="nav justify-content-end">
                    {/* <Link className="nav-item" to="/">
                    <a className="nav-link" href="#">Home</a>
                    </Link> */}
                </ul>
                <h1>Sign Up</h1><br/>
                <form >  
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label"><b>User Name *</b></label>
                        <div class="col-sm-4">
                            <input className="form-control form-control-sm" type="text" placeholder="User Name" name="username" value={this.state.username} 
                            onChange={this.handleChange}/>
                        </div>  
                    </div><hr/>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label"><b>Password *</b></label>
                        <div class="col-sm-4">
                            {this.state.vis ? <input className="form-control form-control-sm" placeholder="Password" type="text" name="password" value={this.state.password} 
                            onChange={this.handleChange}/> : <input className="form-control form-control-sm" placeholder="Password" type="password" name="password" value={this.state.password} 
                            onChange={this.handleChange}/> }
                        </div>
                        <Button variant="btn btn-outline-primary" onClick={this.handleVis}>{ this.state.vis ? <BsEye /> : <BsEyeSlash />} </Button>
                    </div><hr/>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label"><b>Email *</b></label>
                        <div className="col-sm-4">
                            <input className="form-control form-control-sm" type="text" placeholder="Email" name="email" value={this.state.email} 
                            onChange={this.handleChange}/>
                        </div>  
                    </div><hr/>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label"><b>Business Name</b></label>
                        <div className="col-sm-4">
                            <input className="form-control form-control-sm" type="text" placeholder="Business Name" name="businessName" value={this.state.businessName} 
                            onChange={this.handleChange}/>
                        </div>  
                    </div><hr/>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label"><b>Address</b></label>
                        <div className="col-sm-4">
                            <textarea className="form-control form-control-sm" placeholder="Address" type="text" cols="40" rows="5" 
                            name="address" value={this.state.address} onChange={this.handleChange}/>
                        </div>  
                    </div><br/>

                    <SweetAlert
                        success
                        title="Success Data!"
                        show={this.state.flagS}
                        onConfirm={(response) => this.onRecieveInput(response)}
                        // onCancel={this.onCancel}
                        >
                    Your Registration form has been submitted Succesfully !
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

                    <Button variant="btn btn-primary" onClick={this.handleSubmit}>Register</Button>
                </form>
            </div>
        )
    }
}

const mstp = (state)=>{
    return {
        userInfo : state.userInfo
    }    
}
export default connect(mstp)(SignUpDashboard)