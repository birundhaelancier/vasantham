import {
    USERLOGIN,USER_REGISTER,ENQUIRY_REGISTER,FORGOT_PASSWORD 
} from '../Utils/constant';
import { apiurl, findServer } from '../Utils/baseurl';
import axios from 'axios';
// import { notification } from 'antd';

export const User_Login=(data)=>async (dispatch)=>{
        const response=await axios({
             method:"POST",
             url:apiurl+"login",
             data:{
                "phone":data.mobileno || "",
                "password":data.password || ""      
             },
        });
    return dispatch({type:USERLOGIN,payload:response.data})
}

export const User_Register=(data)=>async (dispatch)=>{
    const response=await axios({
         method:"POST",
         url:apiurl+"register",
         data:{
            "phone":data.mobileno || "",
            "email":data.email || "",
            "password":data.password || ""      
         },
    });
    return dispatch({type:USER_REGISTER,payload:response.data})
}

export const FarmerRegister_Enquiry=(data)=>async (dispatch)=>{
    const response=await axios({
         method:"POST",
         url:apiurl+"farmerRegister",
         data:{
            "first_name":data.first_name,
            "last_name":data.last_name,
            "phone":data.phone,
            "email":data.email,
            "pincode":data.pincode,
            "city":data.city,
            "total_area":data.total_area,
            "floor":data.floor,
            "package":data.package,
            "address":data.address   
         },
    });
    return dispatch({type:ENQUIRY_REGISTER,payload:response.data})
}


export const ForgotPassword=(data)=>async (dispatch)=>{
    const response=await axios({
         method:"POST",
         url:apiurl+"forgetpassword",
         data:{
           "email":data.mobileno
         },
    });
    return dispatch({type:FORGOT_PASSWORD,payload:response.data})
}



// export const ProfileUpdate = (data,upload) => async dispatch => {
//     try {
//         axios({
//             method: 'post',
//             url: baseUrl + 'users/profileupdate',
//             data:{
//              "phone":"9911991191",
//              "password":"123456"      
//             },
//         })
//         .then((response) => {
//             dispatch({type:PROFILE_UPDATE,payload:response.data.response})
//             if(response.data.status==="Success"){
//                 notification.success({
//                     message:response.data.message,
//                   });
//                   dispatch(User_signin_Details(data))
//                   dispatch(ProfileGet_Api())
//                 }
//                 if(response.data.status==="Failure"){
//                     notification.success({
//                         message:response.data.message,
//                       });
//                     }
//             return Promise.resolve();
//         })
        
//     } catch (err) {
//         notification.error({
//             message: 'Something wrong,Not Updated User Details',
//           });
//     }
// }
