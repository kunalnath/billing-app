import axios from 'axios' 

export const setUser=(userAccnt)=>{
    return {type : 'SET_USER',payload : userAccnt}

}

export const startGetAccount=()=>{
    const token = localStorage.getItem("token")
    console.log('token',token)
    return (dispatch)=>{
        axios.get('http://dct-billing-app.herokuapp.com/api/users/account',{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response)=>{
            const userAccnt = response.data
            console.log('userAccnt',userAccnt) 
            dispatch(setUser(userAccnt))
        })
    }
}
export const startGetLogin = (formData)=>{
    return(dispatch)=>{
        const token = localStorage.getItem("token")
        axios.post('http://dct-billing-app.herokuapp.com/api/users/login',formData)
        .then((response)=>{

            if(response.data.hasOwnProperty('error')){
                alert(response.data.error)
            }
            else{
                // const users = response.data
                // console.log('token Object',users)
                // localStorage.setItem("token", users.token)
                // console.log("local storage",localStorage)
                localStorage.setItem("token", response.data.token)
                axios.get('http://dct-billing-app.herokuapp.com/api/users/account',{
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                      })
                    .then((response)=>{
                        const userAccnt = response.data
                        console.log('userAccnt1',userAccnt) 
                        dispatch(setUser(userAccnt))
                    })  
                    .catch((error)=>{
                        alert(error)
                    })
            }
        })
        .catch((error)=>{
            console.log(error)
        })
    }
} 

// export const startGetLogout=()=>{
//     return (dispatch)=>{
//         localStorage.removeItem('token')
//         dispatch(setUser({}))
//         window.location.href='/'
//     }
// }