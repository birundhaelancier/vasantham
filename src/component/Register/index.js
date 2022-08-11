import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import Swal from 'sweetalert2';
import { useHistory, Link } from "react-router-dom"
import { User_Register } from '../../Redux/Action/LoginActions'
import Loading from '../../page/Loading/Loading'
import { useAuth } from "../../context/auth"
const RegisterArea = () => {
    let dispatch=useDispatch()
    let history=useHistory()
    const [register,setregister]=useState(false)
    const [location,setlocation]=useState(false)
    const [showPass,setshowPass]=useState(false)
    const [loading,setloading]=useState(false)
    const [login,setlogin]=useState(false)
    const [forgot,setforgot]=useState(false)
    const [UserDetail,setUserDetail]=useState({ password:"", mobileno:"",email:"" })
    const  { setAuthTokens }  = useAuth();
    const onChangeData=(e)=>{
        if(e.target.name==="mobileno"){
            if(Number(e.target.value)){
                setUserDetail((prevState) => ({
                    ...prevState,
                    [e.target.name]:e.target.value,
                }));
            }
            else{
                setUserDetail((prevState) => ({
                    ...prevState,
                    [e.target.name]:"",
                }));
            }
        }else{
            setUserDetail((prevState) => ({
                ...prevState,
                [e.target.name]:e.target.value,
            }));
        }
     
    }
    const Submit=(e)=>{
        e.preventDefault();
        setloading(true)
        dispatch(User_Register(UserDetail)).then((res)=>{
            setloading(false)
            ClearState()
            setregister(false)
            if(res.payload.status===1){
                 Swal.fire({
                 icon: 'success',
                 title: "Registration successfully",
                 })
                 history.push("/login")
            }else if(res.payload.status===0){   
                Swal.fire({
                    icon: 'warning',
                    title:"Failed",
                    text: res.payload.response,
                })
            }else{
                Swal.fire({
                    icon: 'warning',
                    title:"Failed",
                    text: Object.values(res?.payload),
                })
            }
            
        }) 
    
    setUserDetail((prevState) => ({
        ...prevState,
    }));
}
    const ClearState=()=>{
        let key=Object.keys(UserDetail)
        key.map((data)=>{
            UserDetail[data]=""
        })
        setUserDetail((prevState) => ({
            ...prevState,
        }));
    }
  
    return (
        <>
            <section id="login_area" className="ptb-60">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3 col-md-12 col-sm-12 col-12 log_acc_form">
                            <div className="account_form">
                                <h3>Register</h3>
                                <form onSubmit={(e) => Submit(e)} autoComplete="off">
                                    <div className="default-form-box">
                                        <label>Mobile Number<span className="text-danger">*</span></label>
                                        <input type={"text"} title={"Please enter exactly 10 digits"} className="form-control"   pattern={"[1-9]{1}[0-9]{9}"} minLength={10} maxLength={10}  name="mobileno" onChange={(e) => onChangeData(e)}  value={UserDetail.mobileno} required />
                                    </div>
                                    <div className="default-form-box">
                                        <label>Email<span className="text-danger">*</span></label>
                                        <input type="email" className="form-control" name="email" pattern=".+@gmail\.com" onChange={(e) => onChangeData(e)}  value={UserDetail.email} required />
                                    </div>
                                    <div className="default-form-box">
                                        <label>Password<span className="text-danger">*</span></label>
                                        <input type="password" className="form-control"name="password" onChange={(e) => onChangeData(e)}  value={UserDetail.password} required minLength="6" maxLength="50" />
                                    </div>
                                    <div className="login_submit">
                                        <button className="theme-btn-one btn-black-overlay btn_md" type="submit">Register</button>
                                    </div>
                                    <div className='login_acc'>
                                        <Link to="/login" className="active">Login Your Account?</Link>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default RegisterArea
