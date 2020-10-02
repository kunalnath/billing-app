import React from 'react';
import { BrowserRouter as Router, Route ,Link} from 'react-router-dom'
// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'react-dates/initialize' //npm install bootstrap react-dates
import 'react-dates/lib/css/_datepicker.css'
import Container from 'react-bootstrap/Container'
import { connect } from 'react-redux'
import Home from './components/Home'
import SignUpDashboard from './components/SignUpDashboard'
import LoginDashboard from './components/LoginDashboard'
import AccountDashboard from './components/AccountDashboard' 
import CustomerDashboard from './components/CustomerDashboard'
import CustomerCrtDashboard from './components/CustomerCrtDashboard'
import ProductDashboard from './components/ProductDashboard'
import BillingDashboard from './components/BillingDashboard'
import {Navbar,NavbarBrand,Nav,NavItem} from 'reactstrap'
import { BsHouseDoorFill } from "react-icons/bs"
// import { startGetLogout } from './actions/loginAction'
import ProductCrtDashboard  from './components/ProductCrtDashboard' 
import BillCrtDashboard from './components/BillCrtDashboard'
import BillDetDashboard from './components/BillDetDashboard'
import CustUpdDashboard from './components/CustUpdDashboard'
import ProductUpdDashboard from './components/ProductUpdDashboard'
import CustomerDetails from './components/CustomerDetails'
import ProductDetails from './components/ProductDetails'
import logo from './logo2.png'

// class App extends React.Component{
function App(props) {

  // console.log('props in app' , props)
  
  // render(){
  //   console.log('this.props in app.js',this.props)
  return (
    <Router>
      <div >
      <Container >
        <div >
          {/* <ul className="nav justify-content-end">
            <Link className="nav-item" to="/">
              <a className="nav-link active" href="#">Home</a>
            </Link>
            <Link className="nav-item" to="/register">
              <a className="nav-link active" href="#">Sign Up</a>
            </Link>
            <Link className="nav-item" to="/login">
              <a className="nav-link" href="#">Login</a>
            </Link>
          </ul> */}
          <Navbar color="light" light expand="md" className="mb-5">
            <NavbarBrand><img src={logo} alt="Logo" width="96" height="65"/></NavbarBrand>
              <Nav className="ml-auto" navbar>
                {/* <NavItem>
                  <Link className="nav-link text-primary" to="/"><BsHouseDoorFill /></Link>
                </NavItem>
                <NavItem>
                  <Link className="nav-link text-primary" to="/register">Sign Up</Link>
                </NavItem>
                <NavItem>
                  <Link className="nav-link text-primary" to="/login">Login</Link>
                </NavItem> */}

                {
                  Object.keys(props.userInfo).length !== 0 ? (
                    <Nav className="ml-auto" navbar>
                      {/* <NavItem>
                        <Link className="nav-link text-primary" to="/account">Account</Link>
                      </NavItem> */}
                      <NavItem>
                        <Link className="nav-link text-secondary" to="/"><BsHouseDoorFill /></Link>
                      </NavItem>{/* comment afterwards*/}
                      <NavItem>
                        <Link className="nav-link text-secondary" to="#">User Name DD</Link>
                      </NavItem>
                    </Nav>
              
                  ) : (
                    <Nav className="ml-auto" navbar>
                      <NavItem>
                         <Link className="nav-link text-secondary" to="/"><BsHouseDoorFill /></Link>
                      </NavItem>
                      <NavItem>
                        <Link className="nav-link text-secondary" to="/register">Sign Up</Link>
                      </NavItem>
                      <NavItem>
                        <Link className="nav-link text-secondary" to="/login">Login</Link>
                      </NavItem>
                    </Nav>
                  ) }      
              </Nav>
          </Navbar>
         

          {/* <Link className="nav-link text-primary" to="/"><BsHouseDoorFill /></Link> {' '}
          {
                  Object.keys(props.userInfo).length !== 0 ? (
                    <div>
                      <Link to ="/account">Account</Link>
                      <Link to ="#">Log out</Link>
                    </div>

                  ) : (
                    <div>
                      <Link className="nav-link text-primary" to="/register">Sign Up</Link>{' '}
                      <Link className="nav-link text-primary" to="/login">Login</Link>{' '}
                    </div>
                  )
          } */}
          

          <Route path="/" component = {Home} exact={true}/>
          <Route path="/register" component = {SignUpDashboard} />
          <Route path="/login" component = {LoginDashboard} />
          <Route path="/account" component = {AccountDashboard} />
          <Route path='/customer' component={CustomerCrtDashboard} />
          <Route path='/customerList' component={CustomerDashboard} />
          <Route path='/customerDetails/:id' component={CustomerDetails} />
          <Route path='/customerUpdate/:id' render={(props)=> <CustUpdDashboard {...props}/>}/>
          <Route path='/product' component={ProductCrtDashboard} />
          <Route path='/productList' component={ProductDashboard} />
          <Route path='/productDetails/:id' component={ProductDetails} />
          <Route path='/productUpdate/:id' render={(props)=> <ProductUpdDashboard {...props}/>}/>
          <Route path='/bill' component={BillCrtDashboard} />
          <Route path='/billDetails/:id/:idC' component={BillDetDashboard} />
          <Route path='/billList' component={BillingDashboard} />

        </div>
      </Container>
      </div>
    </Router>
  )
}
// }

const mstp =(state)=>{
  return {
    userInfo : state.userInfo,
    customers : state.customers,
    products : state.products
  }
}

export default connect(mstp)(App)
