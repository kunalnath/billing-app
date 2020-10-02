import React from 'react';  
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import { Provider } from 'react-redux' 
import configureStore from './store/configureStore'
import { startGetAccount } from './actions/loginAction'
import { startGetCustomers } from './actions/customerAction'
import { startGetProducts } from './actions/productAction'
import { startGetBill } from './actions/billAction'

// import * as serviceWorker from './serviceWorker';

const store = configureStore()

store.subscribe(()=>{
  console.log(store.getState())
})

console.log('ls',localStorage)

//handle Page Reload
if(localStorage.getItem('token')){
  store.dispatch(startGetAccount())
  store.dispatch(startGetCustomers())
  store.dispatch(startGetProducts())
  store.dispatch(startGetBill())

}

const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
)
ReactDOM.render(jsx,document.getElementById('root'))

// serviceWorker.unregister();
