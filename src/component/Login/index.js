import React,{useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch } from "react-redux";
import Swal from 'sweetalert2';
import { useHistory } from "react-router-dom"
import { User_Login } from '../../Redux/Action/LoginActions'
import Loading from '../../page/Loading/Loading'
import { useAuth } from "../../context/auth"
import { Profile_Details, RewardPoints } from '../../Redux/Action/allActions';
const LoginArea = () => {

    let dispatch=useDispatch()
    let { type } = useParams()
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
        setUserDetail((prevState) => ({
            ...prevState,
            [e.target.name]:e.target.value,
        }));
    }
    const Submit=(e)=>{
        e.preventDefault();
        setloading(true)
        dispatch(User_Login(UserDetail)).then((res)=>{
            setloading(false)
            setregister(false)
            if(res.payload.status===1){
                 Swal.fire({
                 icon: 'success',
                 title: "Login Successfully",
                 showConfirmButton: false,
                 timer: 1500
                })
            ClearState()
            type==="cart" ? history.push('/cart') : history.push('/')
            setAuthTokens(res.payload.response) 
            dispatch(Profile_Details())
            dispatch(RewardPoints())
            }else if(res.payload.status===0){   
                Swal.fire({
                    icon: 'warning',
                    title: res.payload.response,
                    showConfirmButton: false,
                    timer: 1500
                })
            }else{
                Swal.fire({
                    icon: 'warning',
                    title:"Failed",
                    text: Object.values(res?.payload),
                    showConfirmButton: false,
                    timer: 1500
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
        <div className='parent_vas_div'>
            <section id="login_area" className="ptb-60 mtb-20">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3 col-md-12 col-sm-12 col-12 log_acc_form">
                            <div className="account_form">
                                <h3>Login</h3>
                                <form onSubmit={(e)=>{Submit(e)}} autoComplete="off">
                                    <div className="default-form-box">
                                        <label>Mobile Number or email<span className="text-danger">*</span></label>
                                        <input type="text" name="mobileno" className="form-control" required 
                                            onChange={(e) => onChangeData(e)}  value={UserDetail.mobileno}
                                        />
                                    </div>
                                    <div className="default-form-box">
                                        <label>Password<span className="text-danger">*</span></label>
                                        <input type={showPass?"text":"password"} name="password" className="form-control" required minLength="6" maxLength="25" onChange={(e) => onChangeData(e)}  value={UserDetail.password}/>
                                        <i onClick={()=>setshowPass(!showPass)} class={showPass ? 'fa fa-eye icon_eye' : 'fa fa-eye-slash icon_eye'}></i>
                                    </div>
                                    <div className="login_submit text-end">
                                        <button className="theme-btn-one btn-black-overlay btn_md " type="submit">login</button>
                                    </div>
                                    {/* <div className="remember_area">
                                        <div className="form-check">
                                            <input type="checkbox" className="form-check-input" id="materialUnchecked"/>
                                            <label className="form-check-label" htmlFor="materialUnchecked">Remember me</label>
                                        </div>
                                    </div> */}
                                    <div className='text-center pt-3 active'><Link to="/register" className="active  w-100">Create Your Account?</Link></div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Loading show={loading}/>
        </div>
    )
}

export default LoginArea
