import {
    GET_SLIDER_LIST,GET_HOMEPRODUCT_LIST,GET_CATEGORY_LISTITEM,GET_PACKAGE ,GET_CITY_LIST,GET_PROFILE_DATA,
    GET_WISH_LIST,GET_SINGLEPRODUCT_LIST,GET_SHIPPING_LIST,GET_COUPONCODE,USER_ORDERS,SEARCH_CATEGORY,
    GET_ADDRESS_LIST,GET_POST_LIST,FARMER_POST_LIST,STOCK_LIST,FAQ_LIST,ORDER_LIST,RELATED_LIST,ADDITIONAL_CHARGES,AMC_PLANS,ADVISOR_VISIT,RAZORPAY_DETAILS,ADVERTISEMENT_DETAIL, BILLING_INFORMATION,NOTIFICATIONS,
    REWARD_POINTS,CATEGORY_LIST,CONTACT_US,MYBILLS,REDEEM_POINT_HISTORY,
    COUPONCODE,CART_TOTAL,REDEEM__HISTORY_POINTS
} from '../Utils/constant';
import { apiurl, findServer } from '../Utils/baseurl';
import axios from 'axios';


export const Get_Slider_List=()=>async (dispatch)=>{
        const response=await axios({
             method:"GET",
             url:apiurl+"slider",
        });
        return dispatch({type:GET_SLIDER_LIST,payload:response.data})
}


export const Get_HomeProduct_List=(type)=>async (dispatch)=>{
    const response=await axios({
         method:"POST",
         url:apiurl+"homeProduct",
         data:{"type":type}
    });
    return dispatch({type:GET_HOMEPRODUCT_LIST,payload:response.data})
}


export const CategoryList_api=(slug)=>async (dispatch)=>{
    const response=await axios({
         method:"GET",
         url:apiurl+"category/"+slug,
    });
    return dispatch({type:GET_CATEGORY_LISTITEM,payload:response.data})
}

export const Package_List=()=>async (dispatch)=>{
    const response=await axios({
         method:"GET",
         url:apiurl+"package",
    });
    return dispatch({type:GET_PACKAGE,payload:response.data})
}

export const City_List=()=>async (dispatch)=>{
    const response=await axios({
         method:"GET",
         url:apiurl+"city",
    });
    return dispatch({type:GET_CITY_LIST,payload:response.data})
}

export const Profile_Details=()=>async (dispatch)=>{
    const response=await axios({
         method:"POST",
         url:apiurl+"profile",
         data:{"id":JSON.parse(localStorage.getItem("UserId"))}
    });
    return dispatch({type:GET_PROFILE_DATA,payload:response.data})
}

export const Get_Wishlist=()=>async (dispatch)=>{
    const response=await axios({
         method:"POST",
         url:apiurl+"wishlist",
         data:{"user_id":JSON.parse(localStorage.getItem("UserId"))}
    });
    return dispatch({type:GET_WISH_LIST,payload:response.data})
}

export const Get_Single_Product_List=(id)=>async (dispatch)=>{
    const response=await axios({
         method:"GET",
         url:apiurl+"product/"+id,
    });
    return dispatch({type:GET_SINGLEPRODUCT_LIST,payload:response.data})
}


export const Get_Shipping=(id)=>async (dispatch)=>{
    const response=await axios({
         method:"GET",
         url:apiurl+"shipping",
    });
    return dispatch({type:GET_SHIPPING_LIST,payload:response.data})
}

export const CouponCode=()=>async (dispatch)=>{
    const response=await axios({
         method:"GET",
         url:apiurl+"promocode",
    });
    return dispatch({type:GET_COUPONCODE,payload:response.data})
}

export const UserOrders=()=>async (dispatch)=>{
    const response=await axios({
         method:"POST",
         url:apiurl+"userOrders",
         data:{"user_id":JSON.parse(localStorage.getItem("UserId"))}
    });
    return dispatch({type:USER_ORDERS,payload:response.data})
}

export const SearchCategory=(data)=>async (dispatch)=>{
    const response=await axios({
         method:"POST",
         url:apiurl+"search",
         data:{"search":data || ""}
    });
    return dispatch({type:SEARCH_CATEGORY,payload:response.data})
}

export const AdvisorVisit=(data)=>async (dispatch)=>{
    const response=await axios({
         method:"POST",
         url:apiurl+"advisorVisit",
         data:{"fid":JSON.parse(localStorage.getItem("UserId")) || ""}
    });
    return dispatch({type:ADVISOR_VISIT,payload:response.data})
}

export const Get_Address_List=()=>async (dispatch)=>{
    const response=await axios({
         method:"GET",
         url:apiurl+"addressList/"+JSON.parse(localStorage.getItem("UserId")),
    });
    return dispatch({type:GET_ADDRESS_LIST,payload:response.data})
}

// former actions
export const Get_Post_List=()=>async (dispatch)=>{
    const response=await axios({
         method:"GET",
         url:apiurl+"postList"
    });
    return dispatch({type:GET_POST_LIST,payload:response.data})
}

export const Farmer_Post_List=()=>async (dispatch)=>{
    const response=await axios({
         method:"GET",
         url:apiurl+"farmerPostList/"+JSON.parse(localStorage.getItem("UserId")),
    });
    return dispatch({type:FARMER_POST_LIST,payload:response.data})
}

export const Stock_List=()=>async (dispatch)=>{
    const response=await axios({
         method:"POST",
         url:apiurl+"stockList",
         data:{"fid":JSON.parse(localStorage.getItem("UserId"))|| ""}
    });
    return dispatch({type:STOCK_LIST,payload:response.data})
}


export const Faq_List=()=>async (dispatch)=>{
    const response=await axios({
         method:"GET",
         url:apiurl+"faq",
    });
    return dispatch({type:FAQ_LIST,payload:response.data})
}

export const Order_List=()=>async (dispatch)=>{
    const response=await axios({
         method:"POST",
         url:apiurl+"orders",
         data:{"fid":JSON.parse(localStorage.getItem("UserId"))|| ""}
    });
    return dispatch({type:ORDER_LIST,payload:response.data})
}

export const Related_Products=(id)=>async (dispatch)=>{
    const response=await axios({
         method:"POST",
         url:apiurl+"relatedProduct",
         data:{"id":id}
    });
    return dispatch({type:RELATED_LIST,payload:response.data})
}

export const Advisor_Charges=()=>async (dispatch)=>{
    const response=await axios({
         method:"GET",
         url:apiurl+"additionalCharges",
    });
    return dispatch({type:ADDITIONAL_CHARGES,payload:response.data})
}



export const RazorpayDetails=()=>async (dispatch)=>{
    const response=await axios({
         method:"GET",
         url:apiurl+"razorpayDetails",
    });
    return dispatch({type:RAZORPAY_DETAILS,payload:response.data})
}

export const AdvertisementDetails=()=>async (dispatch)=>{
    const response=await axios({
         method:"GET",
         url:apiurl+"homeAds",
    });
    return dispatch({type:ADVERTISEMENT_DETAIL,payload:response.data})
}

export const BillingDetails=(value)=>async (dispatch)=>{
    return dispatch({type:BILLING_INFORMATION,payload:value})
}

export const RewardPoints=()=>async (dispatch)=>{
    const response=await axios({
         method:"post",
         url:"https://vasanthamhypermart.in/api/getrewards",
         data:{
            "mobile":JSON.parse(localStorage.getItem("data"))?.phone
         }
    });
    return dispatch({type:REWARD_POINTS,payload:response.data})
}


export const RedeemedHistory=(total_point,redeem_point)=>async (dispatch)=>{
    const response=await axios({
         method:"post",
         url:"https://vasanthamhypermart.in/api/redeemedhistory",
         data:{
            "mobile":JSON.parse(localStorage.getItem("data"))?.phone,
            "redeem":redeem_point || "",
            "previous":total_point || ""
         }
    });
    return dispatch({type:REDEEM__HISTORY_POINTS,payload:response.data})
}

export const CouponDetails=(value)=>async (dispatch)=>{
    return dispatch({type:COUPONCODE,payload:value})
}

export const Category_List=()=>async (dispatch)=>{
    const response=await axios({
         method:"get",
         url:apiurl+"category",
    });
    return dispatch({type:CATEGORY_LIST,payload:response.data})
}

export const Contact_Us=()=>async (dispatch)=>{
    const response=await axios({
         method:"get",
         url:"https://elancier.xyz/vasantham_stores/chit/app/settings.php",
    });
    return dispatch({type:CONTACT_US,payload:response.data.Response})
}


export const RedeemedHistoryApi=()=>async (dispatch)=>{
    const response=await axios({
         method:"post",
         url:"https://vasanthamhypermart.in/api/pointsearnedhistory",
         data:{
            "mobile":JSON.parse(localStorage.getItem("data"))?.phone,
         }
    });
    return dispatch({type:REDEEM_POINT_HISTORY,payload:response?.data?.success?.redeemed})
}

export const MyBillsApi=()=>async (dispatch)=>{
    const response=await axios({
         method:"post",
         url:"https://vasanthamhypermart.in/api/salesbycustomer",
         headers:{
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
         },
         data:{
            mobile:JSON.parse(localStorage.getItem("data"))?.phone
         }
    });
    return dispatch({type:MYBILLS,payload:response?.data?.success?.orders})
}



export const CartTotal=(value)=>async (dispatch)=>{
    return dispatch({type:CART_TOTAL,payload:value})
}


export const NotificationsApi=()=>async (dispatch)=>{
    const response=await axios({
         method:"get",
         url:"https://vasanthamhypermart.in/vasantham/api/notification",
    });
    return dispatch({type:NOTIFICATIONS,payload:response?.data})
}