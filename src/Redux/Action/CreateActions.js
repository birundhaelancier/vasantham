import {
  USER_PROFILE_UPDATE,
  DELETE_WISHLIST,
  ADD_WISHLIST,
  ORDER_CREATE,
  ADD_ADDRESS,
  EDIT_ADDRESS,
  DELETE_ADDRESS,
} from "../Utils/constant";
import { apiurl, findServer } from "../Utils/baseurl";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Profile_Details,
  Get_Wishlist,
  Get_Address_List,
  Farmer_Post_List,
  Order_List,
} from "./allActions";
import moment from "moment";
import { notification } from "antd";
// import { toast } from 'react-toastify';
// import Notification from '../../page/Notification';
export const ProfileUpdate = (data, upload) => async (dispatch) => {
  try {
    const response = await axios({
      method: "post",
      url:
        apiurl + "profileUpdate/" + JSON.parse(localStorage.getItem("UserId")),
      data: {
        first_name: data.f_name,
        last_name: data.l_name,
        email: data.email,
        password: data.new_password,
        image: upload,
      },
    });
    return dispatch({ type: ORDER_CREATE, payload: response.data });
  } catch (err) {
    Swal.fire({
      icon: "warning",
      title: "Failed",
      text: "Something Went wrong",
      showConfirmButton: false,
      timer: 1000,
    });
  }
};

export const DeleteWishlist = (item_id, cartlist) => async (dispatch) => {
  try {
    axios({
      method: "post",
      url: apiurl + "wishlistDelete",
      data: {
        user_id: JSON.parse(localStorage.getItem("UserId")),
        item_id: item_id,
      },
    }).then((response) => {
      dispatch({ type: DELETE_WISHLIST, payload: response.data });
      if (response.data.status === 1) {
        dispatch(Get_Wishlist());
        if (cartlist !== "addcart")
          Swal.fire({
            icon: "success",
            title: "Success",
            text: response.data.response,
            showConfirmButton: false,
            timer: 1000,
          });
      }
      if (response.data.status === 0) {
        if (cartlist !== "addcart")
          // toast.error(response.data.response)
          Swal.fire({
            icon: "warning",
            title: "Failed",
            text: response.data.response,
            showConfirmButton: false,
            timer: 1000,
          });
      }

      return Promise.resolve();
    });
  } catch (err) {
    Swal.fire({
      icon: "warning",
      title: "Failed",
      text: "Something went wrong,not deleted",
      showConfirmButton: false,
      timer: 1000,
    });
  }
};

export const AddWishlist = (item_id) => async (dispatch) => {
  try {
    axios({
      method: "post",
      url: apiurl + "wishlistAdd",
      data: {
        user_id: JSON.parse(localStorage.getItem("UserId")),
        item_id: item_id,
      },
    }).then((response) => {
      dispatch({ type: ADD_WISHLIST, payload: response.data });
      if (response.data.status === 1) {
        dispatch(Get_Wishlist());
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.response,
          showConfirmButton: false,
          timer: 1000,
        });
      }
      if (response.data.status === 0) {
        Swal.fire({
          icon: "warning",
          title: "Failed",
          text: response.data.response,
          showConfirmButton: false,
          timer: 1000,
        });
      }

      return Promise.resolve();
    });
  } catch (err) {
    // notification.error({
    //     message: 'Something wrong,Not Updated User Details',
    // });
  }
};

// export const DeleteWishlist = (item_id,cartlist) => async dispatch => {
//     try {
//         axios({
//             method: 'post',
//             url:apiurl+"wishlistDelete",
//             data:{
//                 "user_id":JSON.parse(localStorage.getItem("UserId")),
//                 "item_id":item_id
//             },
//         })
//         .then((response) => {
//             dispatch({type:DELETE_WISHLIST,payload:response.data})
//             if(response.data.status===1){
//                 dispatch(Get_Wishlist())
//                 if(cartlist!=="addcart")
//                 Swal.fire({
//                     title: 'Success!',
//                     text: response.data.response,
//                     icon: 'success',
//                     showConfirmButton: false,
//                     timer: 1000
//                   })

//                 }
//                 if(response.data.status===0){
//                     if(cartlist!=="addcart")
//                    Swal.fire({
//                         title: 'Failed!',
//                         text: response.data.response,
//                         icon: 'warning',
//                         showConfirmButton: false,
//                         timer: 1000
//                       })
//                     }

//             return Promise.resolve();
//         })

//     } catch (err) {
//         // notification.error({
//         //     message: 'Something wrong,Not Updated User Details',
//         // });
//     }
// }

export const OrderPlaced_Create =
  (
    product,
    billing,
    payment,
    total,
    shipping,
    balance_reward,
    rewardpoint,
    payment_res,
    discount
  ) =>
  async (dispatch) => {
    // try {
    const response = await axios({
      method: "post",
      url: apiurl + "order",
      data: {
        user_id: JSON.parse(localStorage.getItem("UserId")),
        firstname: billing?.firstname,
        lastname: billing?.lastname,
        email: billing?.email,
        mobileno: billing?.mobile,
        fulladdress: billing?.address,
        pincode: billing?.pincode,
        city: billing?.city,
        product: product,
        shipping: shipping || "",
        payment: payment === "points" ? "point" : payment,
        payment_id:
          payment_res?.razorpay_payment_id ||
          payment_res?.error?.metadata.payment_id,
        payment_status: payment_res?.error ? "Failed" : "Success",
        amount: total,
        discount: discount || "",
        flag: billing?.store_name ? 1 : 0,
        branch: billing?.store_name ? billing?.id : "",
        amc: "",
        delivery: "",
        installation: "",
        award: "",
        premium: "",
        premium_amt: "",
        payment_method: payment === "points" ? "point" : payment,
        reward: balance_reward || 0,
        total_reward: rewardpoint?.rewardpoint ? balance_reward : 0,
      },
    });
    return dispatch({ type: ORDER_CREATE, payload: response.data });

    // } catch (err) {
    // //    toast.error("Payment Failed please try again")
    // }
  };

export const Add_Address = (data) => async (dispatch) => {
  try {
    const response = await axios({
      method: "post",
      url: apiurl + "addressAdd",
      data: {
        user: JSON.parse(localStorage.getItem("UserId")),
        address: data.address,
        city: data.city,
        pincode: data.pincode,
        type: "home",
        first_name: data.firstname,
        last_name: data.lastname,
        mobile: data.mobileno,
        email: data.email,
      },
    });
    return dispatch({ type: ADD_ADDRESS, payload: response.data });
  } catch (err) {
    Swal.fire({
      icon: "warning",
      title: "Failed",
      text: "Something went wrong",
      showConfirmButton: false,
      timer: 1000,
    });
  }
};

export const EditAddressDetails = (data, id) => async (dispatch) => {
  try {
    const response = await axios({
      method: "post",
      url: apiurl + "addressEdit/" + id,
      data: {
        address: data.address,
        city: data.city,
        pincode: data.pincode,
        type: "home",
        firstname: data.firstname,
        lastname: data.lastname,
        mobile: data.mobileno,
        email: data.email,
      },
    });
    return dispatch({ type: EDIT_ADDRESS, payload: response.data });
  } catch (err) {
    Swal.fire({
      icon: "warning",
      title: "Failed",
      text: "Something went wrong",
      showConfirmButton: false,
      timer: 1000,
    });
  }
};

export const DeleteAddressDetails = (id) => async (dispatch) => {
  try {
    const response = await axios({
      method: "get",
      url: apiurl + "addressDelete/" + id,
    });
    return dispatch({ type: DELETE_ADDRESS, payload: response.data });
  } catch (err) {
    Swal.fire({
      icon: "warning",
      title: "Failed",
      text: "Something went wrong",
      showConfirmButton: false,
      timer: 1000,
    });
  }
};

export const AddToCartApi = (prodcut) => async (dispatch) => {
  try {
    const response = await axios({
      method: "post",
      url: apiurl + "cartInsert",
      data: prodcut,
    });
    return dispatch({ type: "ADD_CART_LIST", payload: response.data });
  } catch (err) {
    Swal.fire({
      icon: "warning",
      title: "Failed",
      text: "Something went wrong",
      showConfirmButton: false,
      timer: 1000,
    });
  }
};

export const ProductDelete = (id) => async (dispatch) => {
  try {
    const response = await axios({
      method: "post",
      url: apiurl + "cartDelete",
      data: {
        uid: JSON.parse(localStorage.getItem("UserId")),
        pid: id,
      },
    });
    return dispatch({ type: "PRODUCT_DELETE", payload: response.data });
  } catch (err) {
    Swal.fire({
      icon: "warning",
      title: "Failed",
      text: "Something went wrong",
      showConfirmButton: false,
      timer: 1000,
    });
  }
};
