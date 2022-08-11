import { ADDTOCART,TOTALCART } from "../Utils/constant";
  const initialState = {
    ShoopingCarts: [],
    CartTotal:0
  };
  export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case ADDTOCART:
        return { ...state, ShoopingCarts: payload } 
      case TOTALCART:
        return { ...state, CartTotal: payload }                                     
      default:
        return state;
    }
  }
  