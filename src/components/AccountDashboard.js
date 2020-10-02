import React from 'react'
import { connect } from 'react-redux'

class AccountDashboard extends React.Component{
    render(){
        console.log('userInfo in Account Details Page',this.props.userInfo)
        return(
            <div>
                <h1>Account Details</h1><hr/>
                <form>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label"><b>User Name</b></label>
                        <div class="col-sm-4">
                            <input className="form-control-plaintext form-control-sm" type="text" value={this.props.userInfo.username} readOnly/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label"><b>Email</b></label>
                        <div class="col-sm-4">
                            <input className="form-control-plaintext form-control-sm" type="text" value={this.props.userInfo.email} readOnly/>
                        </div>
                    </div>
                    
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label"><b>Business Name</b></label>
                        <div class="col-sm-4">
                            <input className="form-control-plaintext form-control-sm" type="text" value={this.props.userInfo.businessName} readOnly/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label"><b>Address</b></label>
                        <div class="col-sm-4">
                            <input className="form-control-plaintext form-control-sm" type="text" value={this.props.userInfo.address} readOnly/>
                        </div>
                    </div>
                    
                </form>

            </div>
        )
    }
}
const mstp=(state)=>{
    return{
        userInfo : state.userInfo
    }
}
export default connect(mstp)(AccountDashboard) 