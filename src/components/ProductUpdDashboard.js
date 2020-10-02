import React from 'react'
// import {Link} from 'react-router-dom'
import {startGetUpdProd} from '../actions/productAction'
import { connect } from 'react-redux'
import SweetAlert from 'react-bootstrap-sweetalert'
import Button from 'react-bootstrap/Button'

class ProductUpdDashboard extends React.Component{
    constructor(props){
        super(props)
        this.state={
            name : props.product.find(ele => ele._id == props.match.params.id).name ,
            price : props.product.find(ele => ele._id == props.match.params.id).price,
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
            price : this.state.price
        }
        // console.log(formData)

        if( this.state.name == "" || this.state.price == "" ){

            this.setState({ flagE : true })
        }
        else{

            this.setState({ flagS : true })
        }
        this.props.dispatch(startGetUpdProd(id,formData))
        this.setState({ name : '',  price : '' })
    }

    onRecieveInput=()=>{
        // console.log('Ok Clicked')
        this.setState({ flagE : false , flagS : false })

        const redirect=()=>{
            return this.props.history.push('/productList')
        }
        redirect()
    }
    handleNavToList=()=>{
        const redirect=()=>{
            return this.props.history.push('/productList')
        }
        redirect()
    }

    render(){
        // console.log('list of products in product Upd',this.props.product)
        return(
            <div>
                {/* <ul className="nav justify-content-end">
                    <Link className="nav-item" to="/productList">
                        <a className="nav-link active" href="#">Back</a>
                    </Link>
                </ul> */}

                <div align="right">
                    <Button onClick={this.handleNavToList}>Back</Button>
                </div>
                
                <h1>Update a Product</h1><br/>
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
                    Your Product has been updated Succesfully !
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
        product:state.products
    }
}

export default connect(mstp)(ProductUpdDashboard)