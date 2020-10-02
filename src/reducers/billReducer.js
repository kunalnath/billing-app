
const billReducer=(state=[],action)=>{
    switch(action.type){
        case "SET_BILLS" : {
            return [...action.payload]
        }
        // case "SET_BILLS_CRT_ID" : {
        //     return [...action.payload]
        // }
        case 'REMOVE_BILLS':{
            return state.filter( ele => ele._id != action.payload._id)
        } 
        default : {
            return [...state]
        }
    }
}

export default billReducer