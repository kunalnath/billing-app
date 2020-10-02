import axios from 'axios'

// export const setUser =(user)=>{
//     return {
//         type : 'SET_USER' , payload : user
//     }
// }

export const startGetUser = (formData) =>{
    console.log(formData)
    return (dispatch)=>{
        axios.post('http://dct-billing-app.herokuapp.com/api/users/register',formData)
        .then((response)=>{
            const user = response.data
            console.log(user)
        })
    }
}