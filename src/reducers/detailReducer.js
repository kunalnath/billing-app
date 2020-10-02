
const detailReducer = (state={},action) =>{
    switch(action.type){

        case "SET_PRODUCT" : {
            return {...action.payload}
        }
        case "SET_BILL" : {
            return {...action.payload}
        }
        case "SET_CUSTOMER" : {
            return {...action.payload}
        }
        default : {
            return {...state}
        }
    }
}
export default detailReducer