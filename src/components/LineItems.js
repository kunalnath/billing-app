import React from "react"
import { connect } from 'react-redux'
import { FaTrashAlt } from 'react-icons/fa'
import { GrAdd } from "react-icons/gr"

function LineItems(props){
  return (
    props.lineItems.map((val, idx) => {
      // let product = `product-${idx}`, quantity = `quantity-${idx}`
      // id={product}
      // id={quantity}
      return (
        <tr key={val.index}>
          <td>
          <div class="col-sm-7">
            <select class="form-control form-control-sm" name="product" data-id={idx}>
              <option value="select">Select...</option>
              {
                  props.product.map((prod)=>{
                      return(
                          <option key={prod._id} value={prod._id}> {prod.name}</option>  
                      )
                  })
              }
              </select>
            </div>
          </td>
          <td>
            <input type="text" name="quantity" data-id={idx} />
          </td>     
          <td>
            {
            idx===0?<button class="btn btn-warning" onClick={()=>props.add()} type="button" > <GrAdd /> </button>
            : <button class="btn btn-danger" onClick={(() => props.delete(val))} > <FaTrashAlt /> </button>
            }
          </td>
        </tr >
      )
    })
  )
}

const mstp=(state)=>{
  return{
      product:state.products
  }
}

export default connect(mstp)(LineItems)