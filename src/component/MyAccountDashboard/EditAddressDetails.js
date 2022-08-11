

import Header from '../../component/Common/Header'
import Layout from '../../component/MyAccountDashboard/Layout'
import Footer from '../../component/Common/Footer'
import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Add_Address, DeleteAddressDetails, EditAddressDetails } from '../../Redux/Action/CreateActions'
import {Get_Address_List,City_List,Profile_Details, BillingDetails } from '../../Redux/Action/allActions'
import { Checkbox } from '@mui/material'
import { Radio } from 'antd'
import Swal from 'sweetalert2'
import Loading from '../../page/Loading/Loading'
import { BILLING_INFORMATION } from '../../Redux/Utils/constant'
import { useHistory, useParams } from 'react-router-dom'
const EditAddressListComp = () => {
    let dispatch=useDispatch()
    let { type,id }=useParams()
    let history=useHistory()
    const [mobileerr,setmobileerr]=useState("")
    const [loading,setloading]=useState(false)
    const [emailerr,setemailerr]=useState("")
    const [pincodeerr,setpincodeerr]=useState("")
    const [addAddress,setaddAddress]=useState()
    const [changeAddress,setchangeAddress]=useState(false)
    const [AddressId,setAddressId]=useState("")
    const [edit,setedit]=useState(false)
    const ShoppingCarts=useSelector(state=>state.StoreProuct.ShoopingCarts)
    const Address_list=useSelector(state=>state.AllReducer.Address_list)
    const CityList=useSelector(state=>state.AllReducer.City_List)
    const [Billing_Info,setBilling_Info]=useState({firstname:"",lastname:"",email:"",mobileno:"",address:"",pincode:"",city:""})


    const ProfileData=useSelector(state=>state.AllReducer.ProfileData)
 
    const OnChangeInfo=(data,key)=>{
     if(key==="pincode"){
        if(Number(data)){
            Billing_Info.pincode=data
        }else{
            Billing_Info.pincode=""
        }
        setBilling_Info((prevState) => ({
            ...prevState,
        }));
     }else{
        if(data&&key==="email"){
            var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            if (re.test(data)) {
              setemailerr("")
            }else{
                setemailerr("Email is Invalid")
            }
         }
         if(data&&key==="pincode"){
            var re = /(^\d{6}$)|(^\d{6}-\d{6}$)/;
            if (re.test(data)) {
              setpincodeerr("")
            }else{
              setpincodeerr("Invalid Pincode")
            }
         }
         if(data&&key==="mobileno"){
            var re = /^(?=.*?[1-9])[0-9()-]+$/;
            if (re.test(data)) {
              setmobileerr("")
            }else{
              setmobileerr("Please Enter Numeric Value only")
            }
         }
       
        setBilling_Info((prevState) => ({
            ...prevState,
            [key]: data,
        }));
    }
       }


      const Add_Address_Detail=(e)=>{
          setloading(true)
          dispatch(Add_Address(Billing_Info)).then((res)=>{
            setloading(false)
            window.scroll(0,0)
            if(res?.payload?.status===1){
                dispatch(Get_Address_List())
                setchangeAddress(false)
                setaddAddress("")
                history.push("/my-account/addresslist") 
                Swal.fire({
                    icon:"success",
                    title: 'Success!',
                    text: res?.payload?.response,
                    showConfirmButton: false,
                    timer: 2000
                  })
                setchangeAddress(false)
             }
             if(res?.payload?.status===0){
                 Swal.fire({
                    icon:"warning",
                    title: 'Failed!',
                    text: res?.payload?.response,
                    showConfirmButton: false,
                    timer: 2000
                  })
             }
         
          })
      }

      useEffect(()=>{
        dispatch(Profile_Details())
        dispatch(Get_Address_List())
        dispatch(City_List())
      },[])

   
     const OnChangeAddressDetails=(id)=>{
        setAddressId(id)
        Address_list.filter((value, index) => {
            if(id===value.id){
                setaddAddress(value)
            }
        })
     }
useEffect(()=>{
    Address_list.filter((value, index) => {
        if(Number(id)===value.id){
            setaddAddress(value)
        }
    })
},[id,Address_list])

      useEffect(()=>{
     
            Object.keys(Billing_Info).map((data)=>{
                Billing_Info[data]=data==="mobileno"?addAddress && addAddress["mobile"]:addAddress && addAddress[data] || ""
            })
            setBilling_Info((prevState) => ({
                ...prevState,
            }));
      
        
      },[addAddress])

      useEffect(()=>{
        dispatch(BillingDetails(Billing_Info))
      },[Billing_Info])

      const EditAddress=(id)=>{
        setedit(true)
        setAddressId(id)
        Address_list.filter((value, index) => {
            if(id===value.id){
                setaddAddress(value)
            }
        })
      }
const UpdateAddress=()=>{
        dispatch(EditAddressDetails(Billing_Info,id)).then((res)=>{
            setloading(false)
            window.scroll(0,0)
            if(res?.payload?.status===1){
                dispatch(Get_Address_List())
                setaddAddress("")
                setAddressId("")
                Swal.fire({
                    icon:"success",
                    title: 'Success!',
                    text: res?.payload?.response,
                    showConfirmButton: false,
                    timer: 2000
                  })
               history.push("/my-account/addresslist")   
             }
             if(res?.payload?.status===0){
                 Swal.fire({
                    icon:"warning",
                    title: 'Failed!',
                    text: res?.payload?.response,
                    showConfirmButton: false,
                    timer: 2000
                  })
             }
        })
      }
      
const DeleteAddress=(id)=>{
        dispatch(DeleteAddressDetails(id)).then((res)=>{
            setloading(false)
            window.scroll(0,0)
            if(res?.payload?.status===1){
                dispatch(Get_Address_List())
                setaddAddress("")
                setAddressId("")
                Swal.fire({
                    icon:"success",
                    title: 'Success!',
                    text: res?.payload?.response,
                    showConfirmButton: false,
                    timer: 2000
                  })
             }
             if(res?.payload?.status===0){
                 Swal.fire({
                    icon:"warning",
                    title: 'Failed!',
                    text: res?.payload?.response,
                    showConfirmButton: false,
                    timer: 2000
                  })
             }
        })
}

    return (
        <>
            <Header />
            <Layout>
            <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="checkout-area-bg bg-white">
                    <div className="check-heading">
                        <h3>Address Details</h3>
                    </div>
                    <div className="check-out-form">
               
                         <form  onSubmit={(e) => { type==="edit"?UpdateAddress():Add_Address_Detail();e.preventDefault();}} autoComplete="off">
                            <div className="row">
                                <div className="col-lg-6 col-md-12 col-sm-=12 col-12">
                                    <div className="form-group">
                                        <label htmlFor="fname">First name<span className="text-danger">*</span> </label>
                                        <input type="text" required className="form-control" id="fname" 
                                           onChange={(data)=>OnChangeInfo(data.target.value,"firstname")} value={Billing_Info.firstname}/>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12 col-sm-=12 col-12">
                                    <div className="form-group">
                                        <label htmlFor="lname">Last name<span className="text-danger">*</span></label>
                                        <input type="text" required className="form-control" id="lname"
                                            onChange={(data)=>OnChangeInfo(data.target.value,"lastname")} value={Billing_Info.lastname}/>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-=12 col-12">
                                    <div className="form-group">
                                        <label htmlFor="cname">Mobile No<span className="text-danger">*</span></label>
                                        <input className="form-control" required type="text" id="number"   minLength={10} pattern={"[1-9]{1}[0-9]{9}"} maxlength={10}
                                             onChange={(data)=>OnChangeInfo(data.target.value,"mobileno")} value={Billing_Info.mobileno}/>
                                        <div style={{color:"red",fontSize:"13px",paddingTop:"5px"}}>{mobileerr}</div> 
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-=12 col-12">
                                    <div className="form-group">
                                        <label htmlFor="email">Email Address<span className="text-danger">*</span></label>
                                        <input className="form-control" required type="email" id="email"
                                            onChange={(data)=>OnChangeInfo(data.target.value,"email")} value={Billing_Info.email}/>
                                        <div style={{color:"red",fontSize:"13px",paddingTop:"5px"}}>{emailerr}</div>    
                                    </div>
                                </div>
                          

                                <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                            <div className="form-group">
                                            <div className="select-input">
                                        <label htmlFor="city">City<span className="text-danger">*</span></label>
                                                   <div>
                                                    <select name="city" id="city" className='w-100'  required onChange={(data) => OnChangeInfo(data.target.value, "city")} value={Billing_Info.city}>
                                                    <option value=""></option>
                                                        {CityList.map((data)=>{
                                                        return( <option value={data.id}>{data.name}</option>
                                                        )})}
                                                    </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                                            <div className="form-group">
                                            <div className="select-input">
                                        <label htmlFor="zip">Pincode<span className="text-danger">*</span></label>

                                                 
                                            <input type="text" required className="form-control" id="pincode"
                                            onChange={(data)=>OnChangeInfo(data.target.value,"pincode")} value={Billing_Info.pincode} minLength={6}  maxlength={6}
                                            />
                                                </div>
                                            </div>
                                        </div>
                               
                                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                    <div className="form-group">
                                        <label htmlFor="faddress">Address<span className="text-danger">*</span></label>
                                        <textarea type="text" rows="5" className="form-control" id="faddress" required
                                           onChange={(data)=>OnChangeInfo(data.target.value,"address")} value={Billing_Info.address}/>
                            
                                    </div>
                                </div>

                             
                            </div>
                            <div  style={{textAlign:"center"}}><button type="submit" className="theme-btn-one btn-black-overlay btn_sm">{type==="edit"?"Update":"Add"} Address</button></div>
                        </form>
                     

                    </div>
                </div>
            </div>
           </div> 
            </Layout>
            <Footer />
            <Loading show={loading}/>
        </>
    )
}

export default EditAddressListComp