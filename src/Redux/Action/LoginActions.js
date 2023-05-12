import {
  USERLOGIN,
  USER_REGISTER,
  ENQUIRY_REGISTER,
  FORGOT_PASSWORD,
} from "../Utils/constant";
import { apiurl, findServer } from "../Utils/baseurl";
import axios from "axios";

export const User_Login = (data) => async (dispatch) => {
  const response = await axios({
    method: "POST",
    url: apiurl + "login",
    data: {
      phone: data.mobileno || "",
      password: data.password || "",
    },
  });
  return dispatch({ type: USERLOGIN, payload: response.data });
};

export const ForgotPassChange = (data) => async (dispatch) => {
  const response = await axios({
    method: "POST",
    url: apiurl + "forgetpassword",
    data: {
      mobile: data.mobileno || "",
    },
  });
  return dispatch({ type: "FORGOT_PASSWORD", payload: response.data });
};

export const VerificationCode = (data) => async (dispatch) => {
  const response = await axios({
    method: "POST",
    url: apiurl + "checkMobile",
    data: {
      phone: data.mobileno || "",
    },
  });
  return dispatch({ type: "VERIFICATION", payload: response.data });
};

export const ChangePasswordApi = (data) => async (dispatch) => {
  const response = await axios({
    method: "POST",
    url: apiurl + "changePassword",
    data: {
      password: data.password || "",
      id: JSON.parse(localStorage.getItem("UserId")),
    },
  });
  return dispatch({ type: "CHANGE_PASSWORD", payload: response.data });
};

export const User_Register = (data) => async (dispatch) => {
  const response = await axios({
    method: "POST",
    url: apiurl + "register",
    data: {
      phone: data.mobileno || "",
      email: data.email || "",
      password: data.password || "",
      branch: data.branch,
    },
  });
  return dispatch({ type: USER_REGISTER, payload: response.data });
};

export const FarmerRegister_Enquiry = (data) => async (dispatch) => {
  const response = await axios({
    method: "POST",
    url: apiurl + "farmerRegister",
    data: {
      first_name: data.first_name,
      last_name: data.last_name,
      phone: data.phone,
      email: data.email,
      pincode: data.pincode,
      city: data.city,
      total_area: data.total_area,
      floor: data.floor,
      package: data.package,
      address: data.address,
    },
  });
  return dispatch({ type: ENQUIRY_REGISTER, payload: response.data });
};

export const ForgotPassword = (data) => async (dispatch) => {
  const response = await axios({
    method: "POST",
    url: apiurl + "forgetpassword",
    data: {
      email: data.mobileno,
    },
  });
  return dispatch({ type: FORGOT_PASSWORD, payload: response.data });
};

export const UserForgotPassword = (data) => async (dispatch) => {
  const response = await axios({
    method: "POST",
    url: apiurl + "user_password_change",
    data: {
      mobile: data.mobileno,
      password: data.password,
    },
  });
  return dispatch({ type: FORGOT_PASSWORD, payload: response.data });
};
