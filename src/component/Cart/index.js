import React,{ useEffect, useState } from "react";
import Coupon from './Coupon'
import TotalCart from './TotalCart'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { ImageUrl } from "../../Redux/Utils/baseurl";
import emp_img from '../../assets/img/empty-cart.webp'
import Swal from "sweetalert2";
import { Profile_Details } from "../../Redux/Action/allActions";
const CartArea = () => {
    let dispatch = useDispatch();
    const [QuantityValues, setQuantityValues] = useState({});
    const ShoppingCarts=useSelector(state=>state.StoreProuct.ShoopingCarts)

    const ProfileData=useSelector(state=>state.AllReducer.ProfileData)

    const columnss = [
        { field: 'id', width: 50, headerName: 'Remove'},
        { field: '', width: 130, headerName: 'Image' },
        { field: '', width: 130, headerName: 'Product' },
        { field: '', width: 130, headerName: 'Points Discount' },
        { field: '', width: 130, headerName: 'Price Discount' },
        { field: '', width: 130, headerName: 'Quantity' },
        { field: '', width: 130, headerName: 'Total' },
    ]
    let carts = useSelector((state) => state?.products?.carts);

   useEffect(()=>{
    // dispatch(Profile_Details())
   },[])

    // Remove from Cart
    const rmProduct = (id) => {
        dispatch({ type: "products/removeCart", payload: { id } });
    }
    // Clear
    const clearCarts = () => {
        dispatch({ type: "products/clearCart"});
    }
    // Value Update
  
    const cartValUpdate = (val, index, id, stock) => {
        if (val > stock) {
        Swal.fire({
            icon: 'warning',
            title: 'Warning',
            text: "Stock Exceeded",
            showConfirmButton: false,
            timer: 1000
        })
        } else {
          for (var i = 0; i < ShoppingCarts.length; i++) {
            if (id === ShoppingCarts[i].id) {
              ShoppingCarts[i].quantity = val;
              break;
            }
          }
          localStorage.setItem("carts", JSON.stringify(ShoppingCarts));  
          setQuantityValues((prevState) => ({
            ...prevState,
            ["test" + index]: val,
          }));
        }
      };

   useEffect(()=>{
    localStorage.setItem("carts", JSON.stringify(ShoppingCarts));  
   },[ShoppingCarts])

    return (
        <>
            {ShoppingCarts?.length
                ?
                <section id="cart_area_one" className="ptb-10">
                    <h4 className="text-center pb-3 pt-2">Cart</h4>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="table_desc">
                                    <div className="table_page table-responsive">
                                        <table>
                                            <thead>
                                                <tr>
                                                {columnss.map((data)=>{
                                                    return(
                                                    <th className="product_remove">{data.headerName}</th>
                                                    )
                                                })}
                                               
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {ShoppingCarts?.map((data, index) => (
                                                    <tr key={index}>
                                                        <td className="product_remove">
                                                            <i className="fa fa-trash text-danger" onClick={() => rmProduct(data.id)} style={{ 'cursor': 'pointer' }}></i>
                                                        </td>
                                                        <td className="product_thumb">
                                                            <Link to={`/product-details-one/${data.slug}/${data.id}`}>
                                                                <img src={ImageUrl+data.photo} alt="img" />
                                                            </Link>
                                                        </td>
                                                        <td className="product_name">
                                                            <Link to={`/product-details-one/${data.slug}/${data.id}`}>
                                                                <span>{data.name}</span>
                                                                <div style={{fontSize:"13px"}}><span>Points {" "}{data.points} - Prize <i class="fa fa-inr"/> {(data.discount_price)} </span></div>
                                                            </Link>
                                                        </td>
                                                        <td className="product_name">
                                                            <Link to={`/product-details-one/${data.slug}/${data.id}`}>
                                                            {(data.dis_points*data.quantity).toFixed(2)}
                                                            </Link>
                                                        </td>
                                                        <td className="product-price"><i class="fa fa-inr"/> {(data.dis_prize*data.quantity).toFixed(2)}</td>
                                                        <td className="product_quantity">
                                                            <input min="1" max="100" type="number" onChange={e => cartValUpdate(e.currentTarget.value, index,data.id,data.stock)} value={ QuantityValues["test" + index] ||  data.quantity} />
                                                        </td>
                                                        <td className="product_total"><i class="fa fa-inr" aria-hidden="true"></i> {Math.abs(data.dis_prize * Number( QuantityValues["test" + index] ||  data.quantity)).toFixed(2)}</td>
                                                    </tr>
                                                ))

                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="cart_box_view">
                                        {ShoppingCarts?.map((data,index) => {
                                            return (
                                                <div className="cart_content" style={{marginBottom:"15px"}}>
                                                
                                                    <Link to={`/product-details-one/${data.id}`}>
                                                        <img src={ImageUrl+data.photo} alt="img" />
                                                    </Link>
                                                    <div className="pro_discription">
                                                        <ul>
                                                            <li>
                                                                {/* <div className="table_head">Product Name </div> */}
                                                                <div className="table_val">
                                                                    {data.name}
                                                                    <div style={{fontSize:"13px"}}><span>Points <i class="fa fa-inr"/>{" "}{data.points} - Prize <i class="fa fa-inr"/> {data.discount_price} </span></div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                {/* <div className="table_head">Points</div> */}
                                                                <div className="table_val"> {(data.dis_points*data.quantity).toFixed(2)}</div>
                                                            </li>
                                                            <li>
                                                                {/* <div className="table_head">Price </div> */}
                                                                <div className="table_val"><i class="fa fa-inr" aria-hidden="true"></i> {(data.dis_prize*data.quantity).toFixed(2) }</div>
                                                            </li>
                                                            <li>
                                                                {/* <div className="table_head">Quantity </div> */}
                                                                <div className="table_val">
                                                                    <input min="1" max="100" type="number" style={{textAlign:"center"}} onChange={e => cartValUpdate(e.currentTarget.value, index,data.id,data.stock)} value={ QuantityValues["test" + index] ||  data.quantity} />
                                                                </div>
                                                            </li>
                                                            <li>
                                                               
                                                                <div className="table_val">Total <i class="fa fa-inr" aria-hidden="true"></i> {(data.dis_prize * (data.quantity || 1)).toFixed(2)}</div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div style={{ textAlign: "end" }}>
                                                        <i className="fa fa-trash text-danger" onClick={() => rmProduct(data.id)} style={{ 'cursor': 'pointer',paddingRight:"10px"}}></i>
                                                    </div>
                                                </div>
                                            )
                                        })}

                                    </div>
                                    <div className="cart_submit">
                                        {ShoppingCarts?.length
                                            ? <button className="theme-btn-one btn-black-overlay btn_sm" type="button" onClick={() => clearCarts()}>Clear cart</button>
                                            : null
                                        }
                                    </div>
                                </div>
                            </div>
                            <Coupon />
                            <TotalCart />
                        </div>
                    </div>
                </section>
                : <section id="empty_cart_area" className="ptb-100 parent_vas_div">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-12 col-12">
                                <div className="empaty_cart_area">
                                    <img src={emp_img} alt="img" />
                                    <h2>YOUR CART IS EMPTY</h2>
                                    <h3>Sorry Mate... No Item Found Inside Your Cart!</h3>
                                    <Link to="/" className="btn btn-black-overlay btn_sm">Continue Shopping</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            }
        </>
    )
}

export default CartArea