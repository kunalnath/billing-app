import React from 'react'
import { connect } from 'react-redux'
import { startGetLogin } from '../actions/loginAction'
import {Link} from 'react-router-dom'
import SweetAlert from 'react-bootstrap-sweetalert'
import { BsEye , BsEyeSlash } from "react-icons/bs"
import Button from 'react-bootstrap/Button'

class LoginDashboard extends React.Component{
    constructor(){
        super()
        this.state = {
            email : '',
            password : '',
            flagE : false,
            flagS : false,
            vis : false

        }
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        const formData = {
            email : this.state.email,
            password : this.state.password
        }
        if( this.state.email == "" || this.state.password == "" ){

            this.setState({ flagE : true })
        }
        else{

            this.setState({ flagS : true })
        }

        this.props.dispatch(startGetLogin(formData))
        this.setState({ email : '', password : '' })
        console.log(localStorage)
    }

    onRecieveInput=()=>{
        // console.log('Ok Clicked')
        this.setState({ flagE : false , flagS : false })
        const redirect=()=>{
            return this.props.history.push('/')
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
            {/* <div align="right" ><Link to={`/customer`}>Customer Details</Link></div> */}
            {/* <ul className="nav justify-content-end">
                <Link className="nav-item" to="/customer">
                    <a className="nav-link active" href="#">Customers</a>
                </Link>
                <Link className="nav-item" to="/product">
                    <a className="nav-link" href="#">Products</a>
                </Link>
                <Link className="nav-item" to="/bill">
                    <a className="nav-link" href="#">Bills</a>
                </Link>
            </ul> */}
            <h1>Log in</h1><br/>
            <form onSubmit={this.handleSubmit}>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label"><b>Email *</b></label>
                    <div className="col-sm-4">
                        <input className="form-control form-control-sm" type="text" placeholder="Email" name="email" value={this.state.email} 
                        onChange={this.handleChange}/>
                    </div>  
                </div><hr/>
                
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label"><b>Password *</b></label>
                    <div class="col-sm-4">
                        {this.state.vis ? <input className="form-control form-control-sm" type="text" placeholder="Password" name="password" value={this.state.password} 
                        onChange={this.handleChange}/> : <input className="form-control form-control-sm" placeholder="Password" type="password" name="password" value={this.state.password} 
                        onChange={this.handleChange}/> }
                    </div>
                    <Button variant="btn btn-outline-primary" onClick={this.handleVis}>{ this.state.vis ? <BsEye /> : <BsEyeSlash />} </Button>
                </div><br/>

                <SweetAlert
                    success
                    title="Success Data!"
                    show={this.state.flagS}
                    onConfirm={(response) => this.onRecieveInput(response)}
                    // onCancel={this.onCancel}
                    >
                    Successful login !
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
                
                <Button variant="btn btn-primary" onClick={this.handleSubmit}>Login</Button>
            </form>
        </div>
        )        
    }
}
const mstp = (state)=>{
    return {
        loginInfo : state.loginInfo
    }    
}

export default connect(mstp)(LoginDashboard)