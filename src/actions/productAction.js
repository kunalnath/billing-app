import axios from "axios"

export const setProducts = (products) =>{
    return {
        type : 'SET_PRODUCTS' , payload : products
    }
}

export const setProduct = (product) =>{
    return {
        type : 'SET_PRODUCT' , payload : product
    }
}

export const removeProd = (newProd)=>{
    return { type : 'REMOVE_PRODUCT' , payload : newProd}
}

//Product list
export const startGetProducts =()=>{

    const token = localStorage.getItem("token")
    return (dispatch)=>{
        axios.get('http://dct-billing-app.herokuapp.com/api/products',{
            headers:{
                        'Authorization': `Bearer ${token}`
                    }
            })
        .then((response)=>{
            const products = response.data
            console.log('response of products',products)
            dispatch(setProducts(products))
        })
    }
}
// Product Create
export const startGetProductsCrt =(formData)=>{

    const token = localStorage.getItem("token")
    return (dispatch)=>{
        axios.post('http://dct-billing-app.herokuapp.com/api/products',formData,{
            headers:{
                        'Authorization': `Bearer ${token}`
                    }
            })
        .then((response)=>{
            const productsCrt = response.data
            console.log('response of products Crt',productsCrt)
            // dispatch(setProducts(products))
        })
    }
}

// Update Product
export const startGetUpdProd = (id,formData)=>{

    const token = localStorage.getItem("token")
    console.log('id in product upd action',id)
    return (dispatch)=>{
        axios.put(`http://dct-billing-app.herokuapp.com/api/products/${id}`,formData,{
            headers:{
                        'Authorization': `Bearer ${token}`
                    }
            })
        .then((response)=>{
            const productsUpd = response.data
            console.log('response of products upd',productsUpd)
            // dispatch(setProducts(products))
        })
    }
}

//Delete Products 
export const removeProducts = (id)=>{

    const token = localStorage.getItem("token")
    // console.log('id in product upd action',id)
    return (dispatch)=>{
        axios.delete(`http://dct-billing-app.herokuapp.com/api/products/${id}`,{
            headers:{
                        'Authorization': `Bearer ${token}`
                    }
            })
        .then((response)=>{
            const product = response.data
            console.log('response of products upd',product)
            dispatch(removeProd(product))
        })
    }
}

//Get a product
export const startGetProduct = (id)=>{

    const token = localStorage.getItem("token")
    return (dispatch)=>{
        axios.get(`http://dct-billing-app.herokuapp.com/api/products/${id}`,{
            headers:{
                        'Authorization': `Bearer ${token}`
                    }
            })
        .then((response)=>{
            const product = response.data
            console.log('Get a product',product)
            dispatch(setProduct(product))
        })
    }
}



