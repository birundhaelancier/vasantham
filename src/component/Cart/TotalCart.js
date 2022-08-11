import React,{useEffect,useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { CouponCode, Get_Shipping, RewardPoints } from '../../Redux/Action/allActions';
import Alert from '@mui/material/Alert';
import Swal from 'sweetalert2';
const TotalCart = (props) => {
    const carts=useSelector(state=>state.StoreProuct.ShoopingCarts)
    const ShippingDetails=useSelector(state=>state.AllReducer.Shipping)
    const Reward=useSelector(state=>state.AllReducer.RewardPoints)
    const Coupon=useSelector(state=>state.AllReducer.Coupon)
    const [FilterData,setFilterData]=useState([])
    let history=useHistory()
    const dispatch=useDispatch()

    const cartTotal = () => {
        return carts?.reduce(function (total, item) {
            return total + (Number(item.quantity || 1) * item.dis_prize)
        }, 0)
    }
    const ProceedCheckout=()=>{
        if(!JSON.parse(localStorage.getItem("UserId"))){
           history.push("/login/cart")
        }else{
            if(Reward.rewardpoint>cartTotal()){
               history.push("/checkout-one")
            }else{
                Swal.fire({
                    icon: 'warning',
                    title: 'Warning',
                    text:`You have only ${Reward.rewardpoint} reward points.       you purchase  ${Reward.rewardpoint} above`,
                    // showConfirmButton: false,
                    // timer: 2000
                })
            }
        }
    }
 

    useEffect(()=>{
        dispatch(Get_Shipping())
        dispatch(CouponCode())
        dispatch(RewardPoints())
    },[])
    useEffect(()=>{
        let Total=cartTotal()
        if(Total>1000){
            setFilterData(ShippingDetails[0])
        }else{
            setFilterData(ShippingDetails[1]) 
        }
    },[cartTotal(),ShippingDetails])
    return (
        <>
                <div className="col-lg-6 col-md-6 col-12">
                    <div className="coupon_code right">
                        <h3>Cart Total</h3>
                        <div className="coupon_inner">
                            <div className="cart_subtotal">
                                <p>Subtotal</p>
                                <p className="cart_amount"> <i class="fa fa-rupee"/> {Number(Coupon?Coupon.Discount:cartTotal() || 0).toFixed(2)}</p>
                            </div>
                            {/* <div className="cart_subtotal ">
                                <p>Delivery Charges</p>
                                <p className="cart_amount"> <i class="fa fa-rupee"/> {FilterData?.price || 0}.00</p>
                            </div>

                            <div className="cart_subtotal">
                                <p>Reward Point</p>
                                <td className="cart_amount"><i class="fa fa-rupee"></i> {Number(Reward.rewardpoint)}</td>
                            </div>

                            <div className="cart_subtotal">
                                <p>Grand Total</p>
                                <td className="cart_amount"><i class="fa fa-rupee"></i> {Math.round(Number(FilterData?.price || 0)+Number(Reward.rewardpoint || 0)+Number(Coupon?Coupon.Discount:cartTotal() || 0))}.00</td>
                            </div> */}

                            {Coupon && <Alert  variant="filled" severity="success" style={{margin:"20px 0px"}}>{Coupon.Details[0]?.title} {Number(Coupon?.Details[0]?.discount)} {Coupon?.Details[0]?.type=="amount"?"Rupees Amount":"Percentage"} Discount</Alert>} 
                            <div className="checkout_btn">

                                <Link onClick={ProceedCheckout} className="theme-btn-one btn-black-overlay btn_sm">
                                    Proceed to Checkout
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
               
        </>
    )
}

export default TotalCart
