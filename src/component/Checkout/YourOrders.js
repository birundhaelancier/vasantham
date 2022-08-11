import Alert from '@mui/material/Alert';
import React,{useState} from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CartTotal, CouponDetails, Get_Shipping, RewardPoints } from '../../Redux/Action/allActions'

const YourOrders = () => {
    const ShoppingCarts=useSelector(state=>state.StoreProuct.ShoopingCarts)
    const ShippingDetails=useSelector(state=>state.AllReducer.Shipping)
    const Reward=useSelector(state=>state.AllReducer.RewardPoints)
    const Coupon=useSelector(state=>state.AllReducer.Coupon)
    const [FilterData,setFilterData]=useState([])
    const dispatch=useDispatch()
    const cartTotal = () => {
        return ShoppingCarts?.reduce(function (total, item) {
            return total + (Number(item.quantity || 1) * item.dis_prize)
        }, 0)
    }

    useEffect(()=>{
        dispatch(Get_Shipping())
        dispatch(RewardPoints())
    },[])
 
    useEffect(()=>{
        let Total=Math.round(Number(cartTotal())-Number(Reward?.rewardpoint || 0))
        if(Total>1000){
            setFilterData(ShippingDetails[0])
        }else{
            setFilterData(ShippingDetails[1]) 
        }
    },[cartTotal(),ShippingDetails,Reward])
    
    useEffect(()=>{
        const Total=(Number(FilterData?.price)+(Math.abs(Number(Coupon?Coupon.Discount:Number(cartTotal()))))).toFixed(2)
        dispatch(CartTotal(Total))
    },[FilterData,Coupon,Reward])


    return (
        <>
                     
            <div className="order_review  box-shadow bg-white">
                <div className="check-heading">
                    <h3>Your Orders</h3>
                </div>
                <div className="table-responsive order_table">
                    <table className="table">
                        <thead><tr><th width="70%">Product</th><th width="30%">Total</th></tr> </thead>
                        <tbody>
                        {ShoppingCarts.length>0 && ShoppingCarts.map((data)=>
                            <tr>
                                <td>{data.name}<span className="product-qty"> <i class="fa fa-rupee"></i>{data.dis_prize} x {data.quantity}</span>
                                </td>
                                <td><i class="fa fa-rupee"></i> {data.dis_prize * data.quantity}</td>
                            </tr>
                        )}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>SubTotal</th>
                                <td className="product-subtotal"  align="end"><i class="fa fa-rupee"></i> {Number(Coupon?Coupon.Discount:cartTotal() || 0).toFixed(2)}</td>
                            </tr>
                            {/* <tr>
                                <th>Reward Points</th>
                                <td><i class="fa fa-rupee"></i>  {(Reward?.rewardpoint || 0)}</td>
                            </tr> 
                           <tr>
                                <th>Total</th>
                                <td><i class="fa fa-rupee"></i>  {Math.abs(Number(Coupon?Coupon.Discount:cartTotal())-Number(Reward?.rewardpoint || 0)).toFixed(2)}</td>
                            </tr>  */}
                            <tr>
                                <th>Delivery Charges</th>
                                <td><i class="fa fa-rupee"></i>  {FilterData?.price || 0}.00</td>
                            </tr> 
                            
                            <tr>
                                <th>Grand Total</th>
                                <td className="product-subtotal"><i class="fa fa-rupee"></i> {(Number(FilterData?.price || 0)+(Math.abs(Number(Coupon?Coupon.Discount:Number(cartTotal()))))).toFixed(2)}</td>
                            </tr>
                        </tfoot>
                    </table>
                    
                    {Coupon && <Alert  variant="filled" severity="success" style={{marginTop:"20px"}}>{Coupon.Details[0]?.title} {Coupon?.Details[0]?.discount} {Coupon?.Details[0]?.type=="amount"?"Rupees Amount":"Percentage"} Discount</Alert>}
       

                </div>
            </div>
        </>
    )
}

export default YourOrders