
const customerReducer = (state = [], action) => {
    
    switch(action.type) {
        case 'SET_CUSTOMERS' : {
            return [...action.payload]
        }
        // case 'UPDATE_CUSTOMER' : {
        //     return state.map((customer)=>{
        //         if(customer._id == action.payload.id){
        //             return Object.assign({},customer,action.payload.obj)
        //         }
        //         else{
        //             return Object.assign({},customer)
        //         }
        //     })
        // }
        case 'REMOVE_CUSTOMER':{
            return state.filter( ele => ele._id != action.payload._id)
        } 
        default: {
            return [...state]
        }
    }
}

export default customerReducer