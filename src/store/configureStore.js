import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import userReducer from '../reducers/userReducer'
import loginReducer from '../reducers/loginReducer'
import customerReducer from "../reducers/customerReducer"
import productsReducer from '../reducers/productsReducer'
import billReducer from '../reducers/billReducer'
import detailReducer from '../reducers/detailReducer'
import custDetReducer from '../reducers/custDetReducer'
import prodDetReducer from '../reducers/prodDetReducer'

const configureStore=()=>{
    const store = createStore(combineReducers({
        userInfo : userReducer,
        loginInfo : loginReducer,
        customers : customerReducer,
        products : productsReducer,
        bills : billReducer,
        details : detailReducer,
        custDetails : custDetReducer,
        prodDetails : prodDetReducer

    }),applyMiddleware(thunk))
    return store
}

export default configureStore
