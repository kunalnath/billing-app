import axios from 'axios'

export const startGetCustCrt = (formData) =>{

    const token = localStorage.getItem("token")
    return (dispatch)=>{
        axios.post('http://dct-billing-app.herokuapp.com/api/customers',formData,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response)=>{
            const custCrt = response.data
            console.log("cust crt response",custCrt)
        })
    }
}