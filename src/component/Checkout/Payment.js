import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import RazorpayPayment from '../../helpers/RazorPay'
import { CartTotal, Get_Address_List, Profile_Details, RazorpayDetails, RedeemedHistory, RewardPoints, UserOrders } from '../../Redux/Action/allActions'
import { OrderPlaced_Create } from '../../Redux/Action/CreateActions'
import logo from '../../assets/img/vasanth1.jpg'
import Loading from '../../page/Loading/Loading'
import { BILLING_INFORMATION } from '../../Redux/Utils/constant'
const Payment = () => {
    const [open,setopen]=useState(false)
    const [value,setvalue]=useState("")
    const [payment_id,setpayment_id]=useState()
    const ShoppingCarts=useSelector(state=>state.StoreProuct.ShoopingCarts)
    const ProfileDetail=useSelector(state=>state.AllReducer.ProfileData)
    const Address_detail=useSelector(state=>state.AllReducer.Address_list)
    const Cart_Total_Value=useSelector(state=>state.AllReducer.Cart_Total_Value)
    const Razorpay=useSelector(state=>state.AllReducer.KeyDetails)
    const BillingInformation=useSelector(state=>state.AllReducer.BillingInformation)
    const Reward=useSelector(state=>state.AllReducer.RewardPoints)
    const [loading,setloading]=useState(false)
    const Payment=[{id:1,name:"Online"},{id:2,name:"Cash on Delivery"}]
    let history=useHistory()
    let dispatch=useDispatch()
    const cartTotal = () => {
        return ShoppingCarts?.reduce(function (total, item) {
            return total + (Number(item.quantity || 1) * item.dis_prize)
        }, 0)
    }
    const RedeemTotal = () => {
        return ShoppingCarts?.reduce(function (total, item) {
            return total +   item.dis_points
        }, 0)
    }

    useEffect(()=>{
      dispatch(Profile_Details)
      dispatch(RazorpayDetails())
      dispatch(RewardPoints())
      dispatch(Get_Address_List())
      dispatch(CartTotal())
    },[])

    const RemoveItems=()=>{
        localStorage.removeItem("carts")
        dispatch({ type: "products/clearCart"});
    }

   
    const paymentType=(data)=>{
        setvalue(data)
     }
    const handleChange=(pay_id)=>{
        setpayment_id(pay_id)
        setopen(true)
    }

    const Submit=()=>{
        if(Address_detail.length>0){
        if(value){
        if(value==="Online"){
            // setloading(true)
            openPayModal()
        }else{
            setloading(true)
            let product=[]
        ShoppingCarts.forEach((data) => {
            product.push({
                    "id":data.id,
                    "attributeName":data.pack || "",
                    "attributeId":data.attributeId || "",
                    "price":data.dis_prize,
                    "qty":data.quantity
            })
        })
        dispatch(OrderPlaced_Create(product,BillingInformation,value,Cart_Total_Value,Math.round(Number(cartTotal())-Number(Reward?.rewardpoint || 0))>1000?1:2,Reward_Points,Reward || "",cartTotal())).then((res)=>{
            setloading(false)

            if(res?.payload?.status===1){
                history.push("/order-complete")
                RemoveItems()
                setpayment_id("")
                dispatch(UserOrders())
                dispatch(RedeemedHistory(Reward?.rewardpoint,RedeemTotal()))
                Swal.fire({
                    icon:"success",
                    title: 'Success!',
                    text: res?.payload?.response,
                    showConfirmButton: false,
                    timer: 1500
                })
            }else{
                Swal.fire({
                    icon:"warning",
                    title: 'Failed!',
                    text: 'Payment Failed Please try again',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
         })
        }}else{

            Swal.fire({
                icon:"warning",
                title: 'Failed!',
                text:'Please choose payment mode',
                showConfirmButton: false,
                timer: 1500
              })
        }
    }else{
        Swal.fire({
            icon:"warning",
            title: 'Failed!',
            text:"Please filled all mandatory fields",
            showConfirmButton: false,
            timer: 1500
          })

    } 
    }
    const Reward_Points=Reward?.rewardpoint ? (Reward?.rewardpoint>cartTotal()?cartTotal():Reward?.rewardpoint) : 0
    const options = {
        // Razorpay?.information?.key || 
        key:"rzp_test_cDBuRdcX87VjyC",
        amount:Math.abs((Number(Cart_Total_Value)*100)).toFixed(2), //  = INR 1
        name: 'Vasantham',
        description: 'Pay Money',
        image:logo,
        handler: function(response) {
            let product=[]
            ShoppingCarts.forEach((data) => {
                product.push({
                        "id":data.id,
                        "attributeName":data.pack || "",
                        "attributeId":data.attributeId || "",
                        "price":data.dis_prize,
                        "qty":data.quantity
                })
            })
            dispatch(OrderPlaced_Create(product,BillingInformation,value,Cart_Total_Value,Math.abs(Number(cartTotal())-Number(Reward?.rewardpoint || 0),cartTotal())>1000?1:2,Reward_Points,Reward || "",response)).then((res)=>{
                if(res?.payload?.status===1){
                    history.push("/order-complete")
                    RemoveItems()
                    setpayment_id("")
                    setloading(false)
                    dispatch(UserOrders())
                    dispatch(RedeemedHistory(Reward?.rewardpoint,RedeemTotal()))
                }else{
                    Swal.fire({
                        icon:"warning",
                        title: 'Failed!',
                        text: 'Payment Failed Please try again',
                        showConfirmButton: false,
                        timer: 1500
                      })
                }
             })
        },
        prefill: {
            name:ProfileDetail?.users?.first_name,
            contact:ProfileDetail?.users?.phone,
            email:ProfileDetail?.users?.email
        },
        notes: {
            address:"address"
        },
        theme: {
            color: '#007a58',
            hide_topbar: false
        }
      };
      
      const openPayModal = () => {
        var rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response){
            Swal.fire({
                icon:"failed",
                title: 'Failed!',
                text: 'Payment Failed Please try again',
                showConfirmButton: false,
                timer: 1500
            })
        });   
        rzp1.open();
    }

      useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
      }, []);

   useEffect(()=>{
      localStorage.setItem("carts",JSON.stringify(ShoppingCarts))
   },[ShoppingCarts])


    return (
        <>
            <div className="order_review bg-white">
                <div className="check-heading">
                    <h3>Payment</h3>
                </div>
                <div className="payment_method">
                    <form>
                      
                        <div className="accordion" id="accordionExample">
                        {Payment.map((data,index)=>{
                        return(
                            <div className="payment_area_wrappers">
                                <div className="heading_payment" id={`headingOne${index}`}>
                                    <div className="" data-toggle="collapse" data-target={`#collapseOne${index}`} >
                                        <input type="radio" name="payment" id={`html${index}`} value={value}  onChange={(e)=>paymentType(data.name)}/>
                                        <label htmlFor={`html${index}`}>{data.name} </label>
                                    </div>
                                </div>
                                {/* <div id={`collapseOne${index}`} className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                    <div className="payment_body">
                                        <p>{data.name} </p>
                                    </div>
                                </div> */}
                            </div>
                            )})}
                         
                           
                        </div> 
                    </form>
                </div>
                <button className="theme-btn-one btn-black-overlay btn_sm" onClick={Submit}>Place Order</button>
            </div>
            <RazorpayPayment show={open} OrderPlace={handleChange} />
            <Loading show={loading}/>
        </>
    )
}

export default Payment