import React, { useEffect,useState } from "react";
import { Link, useHistory } from 'react-router-dom'

import { useDispatch,connect, useSelector } from "react-redux";
import img from '../../assets/img/wishlist.png'
import { Get_Wishlist } from '../../Redux/Action/allActions'
import { DeleteWishlist } from '../../Redux/Action/CreateActions'
import { ImageUrl } from '../../Redux/Utils/baseurl'
import Swal from "sweetalert2";
import { notification } from "antd";
const WishlistComp = (props) => {
    let dispatch = useDispatch();
    const [WishListData,setWishListData]=useState([])
    const WishList=useSelector(state=>state.AllReducer.WishList)
    
    const rmProduct = (id) => {
        dispatch(DeleteWishlist(id));
    }
  
    useEffect(()=>{
     dispatch(Get_Wishlist())
    },[])
    useEffect(()=>{
        var Data=WishList.filter((data)=>{
            return data!==null
        })
        setWishListData(Data)
    },[WishList])


    return (
        <>
          {WishListData?.length
                                                ?
            <section id="Wishlist_area" className="pt-3 wish_list_view "  >
                <h4 className="text-center pb-3 pt-3">WishList</h4>
                <div className="container">
                    <div className="row">
                        <div className="col-12 desktop_view_cart">
                            <div className="table_desc">
                                <div className="table_page table-responsive">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th className="product_remove">Remove</th>
                                                <th className="product_thumb">Image</th>
                                                <th className="product_name">Product</th>
                                                <th className="product-price">Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                          {WishListData.map((data, index)=>(
                                                    <tr key={index}>
                                                        <td className="product_remove">
                                                            <i className="fa fa-trash text-danger" onClick={() => rmProduct(data.id)} style={{'cursor':'pointer'}}></i>
                                                        </td>
                                                        <td className="product_thumb">
                                                        <Link to={ `/product-details-one/${data.slug}`}>
                                                                <img src={ImageUrl+data.photo} alt="img"/>
                                                        </Link>
                                                        </td>
                                                        <td className="product_name">
                                                        <Link to={ `/product-details-one/${data.slug}/${data.id}`}>
                                                            {data.name}
                                                        </Link>
                                                        </td>

                                                        <td className="product-price"><i className="fa fa-inr"/> {data.discount_price}.00</td>

                                                    </tr> 
                                                ))}                                  
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                 
             
          </div>
        </div>

           <div className="cart_box_view" style={{padding:"10px"}}>
                                        {WishListData?.map((data,index) => {
                                            return (
                                                <div className="cart_content_par">
                                                <div className="cart_content">
                                                    <Link to={`/product-details-one/${data.slug}/${data.id}`}>
                                                        <img src={ImageUrl+data.photo} alt="img" />
                                                    </Link>
                                                    <div className="pro_discription">
                                                        <ul>
                                                            <li>
                                                                {/* <div className="table_head">Product Name </div> */}
                                                                <div className="table_val">{data.name}</div>
                                                            </li>
                
                                                            <li className="price_cont">
                                                                {/* <div className="table_head">Price </div> */}
                                                                <div className="table_val"><i class="fa fa-inr" aria-hidden="true"></i> {data.discount_price}.00</div>
                                                                <div style={{ textAlign: "end" }}>
                                                                <i className="fa fa-trash text-danger" onClick={() => rmProduct(data.id)} style={{ 'cursor': 'pointer',paddingRight:"10px"}}></i>
                                                                 </div>
                                                            </li>
                                                          
                                                        
                                                        </ul>
                                                    </div>
                                                 
                                                </div>
                                                 
                                               </div>
                                            )
                                        })}

                                    </div>

            </section>

      

            :         <section id="empty_cart_area" className="ptb-100 parent_vas_div">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-12 col-12">
                        <div className="empaty_cart_area">
                            <img src={img} alt="img" style={{width:"70%"}}/>
                            {/* <h2>YOUR WISHLIST IS EMPTY</h2> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
              }
        </>
    )
}


// const mapStateToProps = (state) =>
// ({
//     WishList: state.AllReducer.WishList || []
// });
export default WishlistComp;