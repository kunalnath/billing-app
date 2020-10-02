
const productsReducer=(state=[],action)=>{

    switch(action.type){
        case 'SET_PRODUCTS' : {
            return [...action.payload]
        }
        case 'REMOVE_PRODUCT':{
            return state.filter( ele => ele._id != action.payload._id)
        }
        default : {
            return [...state]
        }
    }
}

export default productsReducer