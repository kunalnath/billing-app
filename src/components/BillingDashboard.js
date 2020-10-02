import React from 'react'
import { connect } from 'react-redux'
// import {Link} from 'react-router-dom'
import { startGetBill } from '../actions/billAction'
import { FaTrashAlt } from 'react-icons/fa'
import moment from 'moment'
import { startRemoveBills } from '../actions/billAction'
import Button from 'react-bootstrap/Button'
import { DateRangePicker } from 'react-dates'

class BillList extends React.Component{
    constructor(){
        super()
        this.state={
            startDate : null,
            endDate : null
        }
    }

    componentDidMount(){
        this.props.dispatch(startGetBill())
    }

    handleRemove=(id)=>{
        this.props.dispatch(startRemoveBills(id))
    }

    handleNavToCrtBill=()=>{
        const redirect=()=>{
            return this.props.history.push('/bill')
        }
        redirect()
    }

    handleNavToLogin=()=>{
        const redirect=()=>{
            return this.props.history.push('/')
        }
        redirect()
    }

    navToBillDet=(id,idC)=>{
        const redirect=()=>{
            return this.props.history.push(`/billDetails/${id}/${idC}`)
        }
        redirect()
    }

    handleEndDate=()=>{
        // alert(moment(this.state.endDate).format('dddd MMMM Do YYYY'))
        alert(this.state.endDate)
        
    }

    render(){
        // console.log("bills list",this.props.bills)
        // console.log("Customer List in Bill List",this.props.customer)
        console.log("Product List  in Bill List",this.props.product)
        console.log('this.props in bill list',this.props)
        // console.log('this.props.custName',this.props.custName)
        const date = new Date('2020-06-16T18:42:13.031Z')

        return(
            <div>
                {/* <div align="right"><button class="btn btn-link">Log Out</button></div> */}

                <div align="right">
                    <Button onClick={this.handleNavToCrtBill}>Create a new Bill</Button>{' '}
                    <Button onClick={this.handleNavToLogin}>Back</Button>
                </div>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label"><b>Please Select Bill Date Range :</b></label>
                    <div class="col-sm-4">
                        <DateRangePicker 
                            startDate = {this.state.startDate}
                            startDateId = "startDateId"
                            endDate = {this.state.endDate}
                            endDateId = "endDateId"
                            onDatesChange = {({ startDate, endDate })=> this.setState({ startDate, endDate })}  
                            focusedInput = {this.state.focusedInput} 
                            isOutsideRange={day => (moment().diff(day) < 0)}
                            onFocusChange = {focusedInput => this.setState({ focusedInput })} 
                        />
                    </div>  
                </div>
                
                {/* <Button onClick={this.handleEndDate}>end Date</Button>
                { date == this.state.endDate 
                // && date > this.state.startDate 
                ? "true": '' } */}

                <h2>List of Bills </h2>
                <table className='table'>
                    <thead class="thead-light">
                        <tr>
                            <th>Sl No</th>
                            <th>Customer Name</th>
                            <th>Product Name</th>
                            <th>Bill Date</th>
                            <th>Qty Of Products</th>
                            <th>Grand Total (₹)</th>
                            <th>Details</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.bills.map((bill,i)=>{
                                // if( new Date(bill.createdAt) <= this.state.endDate && new Date(bill.createdAt) >= this.state.startDate ) 
                                return(
                                        <tr key={bill._id}>
                                            <td>{i+1}</td>
                                            {
                                                this.props.customer.map(cust => {
                                                    if(cust._id === bill.customer){
                                                        return(
                                                        <td>{cust.name}</td>
                                                        )
                                                    }
                                                })    
                                            }
                                            <td>
                                            {
                                                bill.lineItems.map( item =>{
                                                    return(
                                                    <ul>
                                                        {
                                                            this.props.product.map(prod => {
                                                                if(prod._id === item.product){
                                                                    return(
                                                                        <li>{prod.name}</li>
                                                                    )
                                                                }    
                                                            })
                                                        }
                                                    </ul>   
                                                    )
                                                })
                                            }
                                            </td>
                                            <td>{moment(bill.createdAt).format('dddd MMMM Do YYYY')}</td>
                                            <td>
                                                <ul>
                                                {
                                                    bill.lineItems.map((product)=>{
                                                        return(
                                                        <li>{product.quantity}</li>
                                                        )
                                                    })
                                                }
                                                </ul>
                                            </td>
                                            <td>{bill.total}</td>
                                            <td><Button onClick={()=>{this.navToBillDet(bill._id,bill.customer)}}>Bill Details</ Button></td>
                                            <td><button onClick={()=>{this.handleRemove(bill._id)}} class="btn btn-danger"><FaTrashAlt /></button></td>
                                        </tr>
                                    )   
                                // return ""  
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
        bills : state.bills,
        customer : state.customers,
        // custName : state.bills ? state.bills.map( bill => {
        //     state.customers.find(ele => ele._id == bill.customer )
        // }) : '',
        product:state.products
    }
}

export default connect(mstp)(BillList)