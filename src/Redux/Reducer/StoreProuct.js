import { ADDTOCART,TOTALCART,BILLING_INFORMATION } from "../Utils/constant";
import Swal from "sweetalert2";
import { ImageUrl } from "../Utils/baseurl";
  const initialState = {
    ShoopingCarts:JSON.parse(localStorage.getItem("carts")) || [],
    BillingInformation:[]
  };
  export default function (state = initialState, action) {
    const { type, payload } = action;
    // Add to cart
    let array=[...state.ShoopingCarts]
    if(type=="products/addToCart"){
    let item = state?.ShoopingCarts?.find(i => i.id === parseInt(payload?.id))
    if (item === undefined) {
        array.push(payload?.product)
        Swal.fire({
            title: 'Success!',
            text: 'Successfully added to your Cart',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500
          })
          state.ShoopingCarts = array
    }else{
        Swal.fire({
            title: 'Failed!',
            text: 'This product is already added in your Cart',
            imageUrl: ImageUrl+item.photo,
            imageWidth: 200,
            imageAlt: item.title,
            showConfirmButton: false,
            timer: 1500
          })
      }
    }

    // delete cart
    if(type==="products/removeCart"){
        let { id } = action.payload;
        let arr = state.ShoopingCarts.filter(item => item.id !== parseInt(id))
        state.ShoopingCarts = arr
        Swal.fire({
            icon:"success",
            title: 'Success!',
            text: 'Product Removed Successfully',
            showConfirmButton: false,
            timer: 1500
          })
    }
    if(type==="products/clearCart"){
      state.ShoopingCarts=[]
    }

    if(type==="products/updateCart"){
      let { id,value } = action.payload;
      for (var i = 0; i < state.ShoopingCarts.length; i++) {
        if (Number(id) === state.ShoopingCarts[i].id) {
          state.ShoopingCarts[i].quantity = value;
          break;
        }
      }
    }

    switch (type) {
      case "products/addToCart":
        return { ...state} 
      case "products/removeCart":
        return { ...state}
      case "products/clearCart":
          return { ...state}
      default:
        return state;
    }
    }
  