import React,{useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import { CouponCode, CouponDetails } from '../../Redux/Action/allActions'

const Coupon = () => {
    const carts=useSelector(state=>state.StoreProuct.ShoopingCarts)
    const Coupon=useSelector(state=>state.AllReducer.coupon_code)
    const Reward=useSelector(state=>state.AllReducer.RewardPoints)
    const [coupon,setcoupon]=useState("")
    let dispatch=useDispatch()
    let history=useHistory()

    const cartTotal = () => {
        return carts?.reduce(function (total, item) {
            return total + (Number(item.quantity || 1) * item.dis_points)
        }, 0)
    }
    useEffect(()=>{
        dispatch(CouponCode())
    },[])

    const CheckValdeCoupon=()=>{
        let Total=Math.round(Number(cartTotal()))
        let DiscountAmt=0
        var Data=Coupon.filter((data)=>{
            return data.code_name===coupon
            })
            if(Data.length===0){
                Swal.fire({
                    icon:"warning",
                    title: 'InValid Coupon!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }else{
                Swal.fire({
                    icon:"success",
                    title: 'Valid Coupon!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            if(Data[0]?.type==="amount"){
               DiscountAmt=Math.abs(Number(Total)-Number(Data[0]?.discount))
            }else{
                let calculate=Number(Data[0]?.discount)/100
                DiscountAmt=Total-(Total*calculate)
            }
            let Coupons={
                Discount:DiscountAmt,
                Details:Data
            }
            DiscountAmt && dispatch(CouponDetails(Coupons))
      }
    return (
        <>
            <div className="col-lg-6 col-md-6">
                <div className="coupon_code left">
                    <h3>Coupon</h3>
                    <div className="coupon_inner">
                        <p>Enter your coupon code if you have one.</p>
                        <form onSubmit={(e) => { e.preventDefault();CheckValdeCoupon()}}>
                            <input className="mb-2" placeholder="Coupon code" value={coupon} onChange={(e)=>setcoupon(e.target.value)} type="text" required />
                            <button type="submit" className="theme-btn-one btn-black-overlay btn_sm">Apply coupon</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Coupon