import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { FaPen, FaTrashAlt } from 'react-icons/fa'
// import { GrAdd } from "react-icons/gr"
import {startGetProducts, removeProducts} from '../actions/productAction'
import Button from 'react-bootstrap/Button'

class ProductList extends React.Component{
    constructor(){
        super()
        this.state={
            //   name:'',
            //   mobile:'',
            //   email:'',
            nameFilter : '',
            filteredValue : ''
        }
    }
    componentDidMount(){
        this.props.dispatch(startGetProducts())
    }

    handleNavToCrtProd=()=>{
        const redirect=()=>{
            return this.props.history.push('/product')
        }
        redirect()
    }

    handleNavToLogin=()=>{
        const redirect=()=>{
            return this.props.history.push('/')
        }
        redirect()
    }

    navToUpdScreen=(id)=>{
        const redirect=()=>{
            return this.props.history.push(`/productUpdate/${id}`)
        }
        redirect()
    }

    handleChangeFilter=(e)=>{
        // console.log('filter name',e.target.value)
        this.setState({
            [e.target.name] : e.target.value,
            filteredValue : this.props.product.filter(ele => ele.name.split(' ')[0] == e.target.value)
        })
    }

    handleRemove=(id)=>{
        this.props.dispatch(removeProducts(id))
    }

    handleDetails=(id)=>{
    
        const redirect=()=>{
            return this.props.history.push(`/productDetails/${id}`)
        }
        redirect()
    }

    render(){     
        // console.log('this.props.product',this.props.product)
        // console.log('nameFilter',this.state.nameFilter)
        // console.log('filtered value',this.state.filteredValue)
        return(
            <div>
                {/* <ul className="nav justify-content-end">
                    <Link className="nav-item" to="/product">
                        <a className="nav-link active" href="#">Add a product</a>
                    </Link>
                    <Link className="nav-item" to="/login">
                        <a className="nav-link" href="#">Back</a>
                    </Link>
                </ul> */}

                <div align="right">
                    <Button onClick={this.handleNavToCrtProd}>Add a Product</Button>{' '}
                    <Button onClick={this.handleNavToLogin}>Back</Button>
                </div><br/>

                <div align="right">
                    <div class="col-sm-3">
                        <input className="form-control form-control-sm" placeholder="Search" type="text" name="nameFilter" value={this.state.nameFilter} 
                        onChange={this.handleChangeFilter}/>
                    </div>
                </div>
                
                <h1>Product List</h1><br/>
                {/* <div align = "right"><button class="btn btn-warning"><GrAdd /></button></div> */}
                <table className='table'>
                    <thead class="thead-light">
                        <tr>
                            <th>Sl No</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>View Details</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {this.props.product.map((ele,i)=>{
                            return(
                                <tr key={ele._id}>
                                    <td>{i+1}</td> 
                                    <td>{ele.name}</td>
                                    <td>{ele.price}</td>
                                    <td><button class="btn btn-info">Show Details</button></td> 
                                    <td><button class="btn btn-default" onClick={()=>{this.navToUpdScreen(ele._id)}}><FaPen /></button>{' '}<button class="btn btn-danger"><FaTrashAlt /></button></td>         
                                </tr>
                            )
                        })} */}
                        {this.props.product.filter(ele => ele.name.split(' ')[0] == this.state.nameFilter) != "" ?
                            this.state.filteredValue.map((ele,i)=>{
                                    return(
                                        <tr key={ele._id}>
                                        <td>{i+1}</td> 
                                        <td>{ele.name}</td>
                                        <td>{ele.price}</td>
                                        <td><Button onClick={()=>{this.handleDetails(ele._id)}}>Show Details</Button></td> 
                                        <td><button class="btn btn-default" onClick={()=>{this.navToUpdScreen(ele._id)}}><FaPen /></button>{' '}
                                        <button onClick={()=>{this.handleRemove(ele._id)}} class="btn btn-danger"><FaTrashAlt /></button></td>         
                                    </tr>
                                    )
                                })

                        : 
                            this.props.product.map((ele,i)=>{
                                    return(
                                        <tr key={ele._id}>
                                        <td>{i+1}</td> 
                                        <td>{ele.name}</td>
                                        <td>{ele.price}</td>
                                        <td><Button onClick={()=>{this.handleDetails(ele._id)}}>Show Details</Button></td> 
                                        <td><button class="btn btn-default" onClick={()=>{this.navToUpdScreen(ele._id)}}><FaPen /></button>{' '}
                                        <button onClick={()=>{this.handleRemove(ele._id)}} class="btn btn-danger"><FaTrashAlt /></button></td>         
                                    </tr>
                                    )
                                })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
const mstp=(state)=>{
    return{
        product:state.products
    }
}
export default connect(mstp)(ProductList)