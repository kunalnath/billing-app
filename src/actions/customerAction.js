import axios from 'axios'

// SET_Customers 
export const setCustomers = (customers) => {
    return { type: 'SET_CUSTOMERS', payload: customers }
}

//Set Customer
export const setCustomer = (customer) => {
    return { type: 'SET_CUSTOMER', payload: customer }
}

export const removeCust = (newCust)=>{
    return { type : 'REMOVE_CUSTOMER' , payload : newCust}
}

// export const setUpdCustomer=(id,obj)=>{
//     return { type : 'UPDATE_CUSTOMER', payload : {id,obj} }
// }

//Remove Customer
export const removeCustomers = (id) => {
    const token = localStorage.getItem("token")
    return (dispatch) => {
        axios.delete(`http://dct-billing-app.herokuapp.com/api/customers/${id}`,{
            headers:{
                        'Authorization': `Bearer ${token}`
                    }
            })
        .then((response) => {
                const customers = response.data
                // console.log('after remove of customer',customers) 
                dispatch(removeCust(customers))
    
        })
    }
}

// GET_Customers List
export const startGetCustomers = () => {

    const token = localStorage.getItem("token")
    // console.log(token)
    return (dispatch) => {
        axios.get('http://dct-billing-app.herokuapp.com/api/customers',{
            headers:{
                        'Authorization': `Bearer ${token}`
                    }
            })
        .then((response) => {
                const customers = response.data
                console.log('response of customers',customers) 
                dispatch(setCustomers(customers))
    
        })
    }
} 

//Update Customer
export const startGetUpdCust = (id,formData) => {

    const token = localStorage.getItem("token")
    console.log(token)
    return (dispatch) => {
        axios.put(`http://dct-billing-app.herokuapp.com/api/customers/${id}`,formData,{
            headers:{
                        'Authorization': `Bearer ${token}`
                    }
            })
        .then((response) => {
                const customers = response.data
                console.log('update customer',customers) 
                // dispatch(setUpdCustomer(id,customers))
    
        })
    }
}

//GET a Customer
export const startGetCustomer = (id) => {

    const token = localStorage.getItem("token")
    // console.log(token)
    return (dispatch) => {
        axios.get(`http://dct-billing-app.herokuapp.com/api/customers/${id}`,{
            headers:{
                        'Authorization': `Bearer ${token}`
                    }
            })
        .then((response) => {
                const customer = response.data
                console.log('Get a customer',customer) 
                dispatch(setCustomer(customer))
    
        })
    }
}

