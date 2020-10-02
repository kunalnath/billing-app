import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { FaPen, FaTrashAlt } from 'react-icons/fa'
// import { GrAdd } from "react-icons/gr"
import {startGetCustomers , removeCustomers } from '../actions/customerAction'
import Button from 'react-bootstrap/Button'  
// import { startGetUpdCust } from '../actions/customerAction' 
import Swal from 'sweetalert2'

class CustomerList extends React.Component{
    constructor(){
        super()
        this.state={
            // name:'',
            // mobile:'',
            // email:'',
            nameFilter : '',
            filteredValue : ''
        }
    }
    componentDidMount(){
        this.props.dispatch(startGetCustomers())
    }

    handleRemove=(id)=>{
        // Swal.fire({
        //     icon: 'error',
        //     title: 'Are you sure?',
        //     text: 'You want to remove this employee',
        //     showCancelButton: true,
        //     confirmButtonColor: '#3085d6',
        //     cancelButtonColor: '#d33',
        //     confirmButtonText: 'Yes!'
        // })
        // .then((result) => {
            // if(result.isConfirmed) {
                this.props.dispatch(removeCustomers(id)) // test it 
                
    //             , () => {
    //                 Swal.fire({
    //                     title: 'Successfully removed employee', 
    //                     icon: 'success',
    //                     timer: 2000
    //                 })
    //             }
                
    //         } 
    // }
    // )
}

    handleNavToCrtCust=()=>{
        const redirect=()=>{
            return this.props.history.push('/customer')
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
            return this.props.history.push(`/customerUpdate/${id}`)
        }
        redirect()
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleChangeFilter=(e)=>{
        // console.log('filter name',e.target.value) 
        this.setState({
            [e.target.name] : e.target.value,
            filteredValue : this.props.customer.filter(ele => ele.name.split(' ')[0] == e.target.value)
        })
    }

    handleDetails=(id)=>{
    
        const redirect=()=>{
            return this.props.history.push(`/customerDetails/${id}`)
        }
        redirect()
    }
  
    render(){     
        // console.log('this.props.customers',this.props.customer) 
        // console.log('nameFilter',this.state.nameFilter)
        // console.log('filtered value',this.state.filteredValue)
        return(
            <div>
                {/* <ul className="nav justify-content-end">
                    <Link className="nav-item" to="/customer">
                        <a className="nav-link active" href="#">Add a Customer</a>
                    </Link>
                    <Link className="nav-item" to="/login"> 
                        <a className="nav-link" href="#">Back</a>
                    </Link>
                </ul> */}

                <div align="right">
                    <Button onClick={this.handleNavToCrtCust}>Add a Customer</Button>{' '}
                    <Button onClick={this.handleNavToLogin}>Back</Button>
                </div><br/>

                <div align="right">
                    <div class="col-sm-3">
                        <input className="form-control form-control-sm" placeholder="Search" type="text" name="nameFilter" value={this.state.nameFilter} 
                        onChange={this.handleChangeFilter}/>
                    </div>
                </div>
    
                <h1>Customer List</h1><br/>
                {/* <div align = "right"><button class="btn btn-warning"><GrAdd /></button></div> */}
                <table className='table'>
                    <thead class="thead-light">
                        <tr>
                            <th>Sl No</th>
                            <th>Name</th>
                            <th>Mobile</th>
                            <th>Email</th>
                            <th>View Details</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.customer.filter(ele => ele.name.split(' ')[0] == this.state.nameFilter) != "" ?
                            this.state.filteredValue.map((ele,i)=>{
                                    return(
                                        <tr key={ele._id}>
                                            <td>{i+1}</td>
                                            <td>{ele.name}</td>
                                            <td>{ele.mobile}</td>
                                            <td>{ele.email}</td>
                                            <td><Button onClick={()=>{this.handleDetails(ele._id)}}>Show Details</Button></td>
                                            <td><button class="btn btn-default" onClick={()=>{this.navToUpdScreen(ele._id)}}><FaPen /></button>{' '}
                                            <button onClick={()=>{this.handleRemove(ele._id)}} class="btn btn-danger"><FaTrashAlt /></button></td>         
                                        </tr>
                                    )
                                })

                        : 
                            this.props.customer.map((ele,i)=>{
                                    return(
                                        <tr key={ele._id}>
                                            <td>{i+1}</td>
                                            <td>{ele.name}</td>
                                            <td>{ele.mobile}</td>
                                            <td>{ele.email}</td>
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
        customer:state.customers
    }
}
export default connect(mstp)(CustomerList)