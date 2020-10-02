import axios from 'axios'

export const setBills =(bills)=>{
    return {
        type : "SET_BILLS", payload : bills
    }
}

export const removeBill = (newBill)=>{
    return {
        type : 'REMOVE_BILLS' , payload : newBill
    }
}

//Set Billls Detail
export const setBillsDet =(bill)=>{
    return {
        type : "SET_BILL", payload : bill
    }
}


//Bill List
export const startGetBill =()=>{

    const token = localStorage.getItem("token")
    return (dispatch)=>{
        axios.get('http://dct-billing-app.herokuapp.com/api/bills',{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response)=>{
            const bills = response.data
            console.log('response of bill',bills)
            dispatch(setBills(bills))

        })
    }
}


//Remove Bills
export const startRemoveBills =(id)=>{

    const token = localStorage.getItem("token")
    return (dispatch)=>{
        axios.delete(`http://dct-billing-app.herokuapp.com/api/bills/${id}`,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response)=>{
            const bills = response.data
            console.log('response of bill after delete',bills)
            dispatch(removeBill(bills))

        })
    }
}

//Bill Create
export const startGetBillsCrt =(formData)=>{

    const token = localStorage.getItem("token")
    return (dispatch)=>{
        axios.post('http://dct-billing-app.herokuapp.com/api/bills',formData,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response)=>{
            const billsCrt = response.data
            console.log('response of bill Crt',billsCrt)
            console.log('id of the bill',billsCrt._id)
            // dispatch(setBillsCrtId(billsCrt._id))

        })
    }
}

//Bill Details for a customer
export const startGetBillsDet =(id)=>{

    const token = localStorage.getItem("token")
    return (dispatch)=>{
        axios.get(`http://dct-billing-app.herokuapp.com/api/bills/${id}`,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response)=>{
            const billsDet = response.data
            console.log('response of bill Details',billsDet)
            console.log('id of the bill Details',billsDet._id)
            dispatch(setBillsDet(billsDet))

        })
    }
}

