import React from 'react'
import Container from 'react-bootstrap/Container'
import { BrowserRouter as Router, Route,Link } from 'react-router-dom'
import { Card , CardText, CardTitle} from 'reactstrap'
import { BsPersonFill , BsFileText } from "react-icons/bs"
import { MdHttps } from "react-icons/md"
import Button from 'react-bootstrap/Button'
import SweetAlert from 'react-bootstrap-sweetalert'
import { connect } from 'react-redux'

class Home extends React.Component{
    constructor(){
        super()
        this.state={
            isOpen: false,
            flagC : false
        }
    }
    
    navToCust=()=>{
        const redirect=()=>{
            return this.props.history.push('/customer')
        }
        redirect()
    }

    navToProd=()=>{
        const redirect=()=>{
            return this.props.history.push('/product')
        }
        redirect()
    }

    navToBills=()=>{
        const redirect=()=>{
            return this.props.history.push('/bill')
        }
        redirect()
    }

    handleAccount=()=>{
        const redirect=()=>{
            return this.props.history.push('/account')
        }
        redirect()
    }

    handleLogOut=()=>{
        localStorage.clear()
        this.setState({ flagC : true ,  isOpen: !this.state.isOpen})
        console.log('ls in home.js',localStorage)
    }

    onRecieveInput=()=>{
        this.setState({ flagC : false })
        const redirect=()=>{
            return this.props.history.push('/login')
        }
        redirect()
    }

    onCancel=()=>{
        this.setState({ flagC : false })
        const redirect=()=>{
            return this.props.history.push('/')
        }
        redirect()
    }

    toggleOpen = () => this.setState({ isOpen: !this.state.isOpen })

    // DDClose=()=> this.setState({ isOpen: false })

    render(){
        const menuClass = `dropdown-menu${this.state.isOpen ? " show" : ""}`
        return (  
        <Router>
            <Container>
                <div>
                    <div className="dropright" align="right">
                        <button
                            onClick={this.toggleOpen}
                            className="btn btn-light dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropright"
                            aria-haspopup="true"> <BsPersonFill /> {this.props.userInfo.username}
                        </button>
                        <div className={menuClass} aria-labelledby="dropdownMenuButton">
                            <Button variant="btn btn-link"  onClick={this.handleAccount}>Account Details</Button><br/>
                            <Button variant="btn btn-link" onClick={this.handleLogOut}>Log-out</Button>
                        </div>
                    </div>

                    <div align="center">
                        <h1>Welcome To Billing App</h1>
                    </div><br/>
                    <SweetAlert
                        warning
                        showCancel
                        confirmBtnText="Yes, Log Out!"
                        title="Are you sure?"
                        show={this.state.flagC}
                        onConfirm={(response) => this.onRecieveInput(response)}
                        onCancel={this.onCancel} >
                        
                    </SweetAlert>

                    <Card body outline color="primary" className="text-center">
                        <CardTitle><b>Customers</b></CardTitle>
                            <CardText><BsPersonFill /></CardText>
                        <Button variant="btn btn-primary" onClick={this.navToCust} >Create the Customers</Button>
                    </Card>
                    <Card body outline color="primary" className="text-center">
                        <CardTitle><b>Products</b></CardTitle>
                            <CardText><MdHttps/></CardText>
                        <Button variant="btn btn-primary" onClick={this.navToProd} >Create the Products</Button>
                    </Card>
                    <Card body outline color="primary" className="text-center">
                        <CardTitle><b>Receipts</b></CardTitle>
                            <CardText><BsFileText /></CardText>
                        <Button variant="btn btn-primary" onClick={this.navToBills} >Get the Invoices</Button>
                    </Card>
                </div>
            </Container>
        </Router>           
        )
    }  
}
const mstp = (state) =>{
    return{
        userInfo : state.userInfo
    }
}

export default connect(mstp)(Home)