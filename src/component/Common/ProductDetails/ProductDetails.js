import React, { useState,useEffect } from 'react'
import ProductInfo from './ProductInfo'
import RelatedProduct from './RelatedProduct'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch,connect } from "react-redux";
import { useParams } from 'react-router-dom';
import { RatingStar } from "rating-star";
import Swal from 'sweetalert2';
import { Get_Single_Product_List } from '../../../Redux/Action/allActions'
import { ImageUrl } from '../../../Redux/Utils/baseurl';
import { AddWishlist } from '../../../Redux/Action/CreateActions';
import EmptyProductLoading from './EmptyProductLoading';
const ProductDetailsOne = (props) => {
    let dispatch = useDispatch();
    let history=useHistory()
    const [product,setProducts]=useState([])
    const [loading,setloading]=useState(true)
    const [ShopIds,setShopIds]=useState([])
    const [cartChange,setcartChange]=useState(false)
    const [selectpack,setselectpack]=useState()
    const [filterPack,setfilterPack]=useState()
    const [QuantityValues,setQuantityValues]=useState({})
    const Rewards=useSelector(state=>state.AllReducer.RewardPoints)
    const WishList=useSelector(state=>state.AllReducer.WishList)
    const ShoopingCarts=useSelector(state=>state.StoreProuct.ShoopingCarts)
    const ProfileData=useSelector(state=>state.AllReducer.ProfileData)
    let { id,productid } = useParams();
    // dispatch({ type: "products/getProductById", payload: { id } });
    // let product = useSelector((state) => state?.products?.single);

   
       // Add to cart
    const addToCart = async (id,data) => {
        if(JSON.parse(localStorage.getItem("UserId"))){
             if(Rewards?.rewardpoint){
               ProceedAddtoCart(id,data)
             }else{
               Swal.fire({
                 icon: 'warning',
                 title: 'Failed',
                 text: 'Your Reward Points 0',
                 showConfirmButton: false,
                 timer: 1000
             })
           }
       }else{
         history.push("/login")
       }
       }
   
       const ProceedAddtoCart=(id,data)=>{
         let product={
           id: data.id,
           discount_price: Number(data.discount_price),
           previous_price: data.previous_price,
           name: data.name,
           photo: data.photo,
           quantity: count || 1,
           pack: selectpack || "",
           slug: data.slug,
           attributeId: filterPack?.id || "",
           stock: data.stock,
           points:data.point,
           dis_points:Number(DiscountPrice(data.point,"point")),
           dis_prize:Number(DiscountPrice(data.discount_price,"prize")),
         }
           dispatch({ type: "products/addToCart", payload: { product,id } })
       }


      const DiscountPrice=(value,type)=>{
        if(type==="point"){
          return Math.abs(value - (value * (Number(ProfileData?.users?.point_discount) / 100))).toFixed(2)
        }else{
          return Math.abs(value - (value * (Number(ProfileData?.users?.prize_discount) / 100))).toFixed(2)
        }
      }

    // Add to Favorite
    const addToFav = async (id) => {
        var Data = WishList?.filter((item) => {
            return item?.id === id;
          });
          if (JSON.parse(localStorage.getItem("UserId"))) {
            if (Data[0]?.id === id) {
              Swal.fire({
                  icon: 'warning',
                  title: 'Failed',
                  text: 'Already Added in Wishlist',
                  showConfirmButton: false,
                  timer: 1000
              })
            } else {
              dispatch(AddWishlist(id));
            }
          } else {
           history.push("/login")
          }
    }

  
    const colorSwatch = (i) => {
        let data = product.color.find(item => item.color === i)
        setImg(data.img)
    }

    const [count, setCount] = useState(1)

    const [img, setImg] = useState(product?.img)

    const incNum = (id, stock,value) => {
     if (count > product.stock) {
       Swal.fire({
           icon: 'warning',
           title: 'Warning',
           text: "Stock Exceeded",
           showConfirmButton: false,
           timer: 1000
       })
       } else {
        setCount(count + 1)
         
       }
    }

    
    const decNum = () => {
        if (count > 1) {
            setCount(count - 1)
        } else {
            Swal.fire('Sorry!', "Minimum Quantity Reached", 'warning')
            setCount(1)
        }
    }



    const UpdateQty=()=>{
      for (var i = 0; i < ShoopingCarts.length; i++) {
        if (product.id === ShoopingCarts[i].id) {
          ShoopingCarts[i].quantity = count;
          break;
        }
      }
      localStorage.setItem("carts", JSON.stringify(ShoopingCarts));  
    }

    useEffect(()=>{
      UpdateQty()
    },[ShoopingCarts,count])

    const ChangeAttribute=(data)=>{
        setselectpack(data)
        FilterData(data)
    }
    const FilterData=(value)=>{
        var Data=product.data.attribute.filter((data)=>{
            return(data.name===value)
            })
        setfilterPack(Data[0])
     }

    useEffect(()=>{
        dispatch(Get_Single_Product_List(id)).then((res)=>{
            setloading(false)
           setselectpack(res?.payload?.attribute && res?.payload?.attribute[0]?.name)
           setfilterPack(res?.payload?.attribute && res?.payload?.attribute[0])
          })
      },[id])

      useEffect(()=>{
          setProducts(props.SingleProduct)
      },[props.SingleProduct,props?.WishList])

    useEffect(()=>{
        localStorage.setItem("carts",JSON.stringify(ShoopingCarts))
     },[ShoopingCarts])

     useEffect(()=>{
        let Ids=[]
        ShoopingCarts.map((data,index)=>{
        Ids.push(data.id)
      })
      setShopIds(Ids)
      },[ShoopingCarts])
      useEffect(()=>{
        ShoopingCarts?.filter((data) => {
          if(Number(data.id)===Number(productid)){
            setCount(data.quantity)
          }else{
            setCount(1)
          }
         })
    },[id,productid,ShoopingCarts])
    return (
        <>
        {!loading
            ?
            <section id="product_single_one" className="ptb-10 mb-5">
                <div className="container">
                    <div className="row area_boxed">
                    <div className="col-lg-1"></div>
                        <div className="col-lg-3">
                            <div className="product_single_one_img">
                                <img src={ImageUrl+product.photo} alt="img" style={{height:"300px"}} />
                            </div>
                        </div>
                        <div className="col-lg-1">

                         </div>
                        <div className="col-lg-4">
                            <div className="product_details_right_one">
                                <div className="modal_product_content_one">
                                    <h3>{product.name}</h3>
                                    {/* <div className="reviews_rating">
                                        <RatingStar maxScore={5} rating={2} id="rating-star-common" />
                                        <span>({4} Customer Reviews)</span>
                                    </div> */}
                                    <h4><del><i class="fa fa-inr"></i>  {filterPack ? filterPack.price:product?.previous_price}.00</del> {""}<i class="fa fa-inr"></i>  {filterPack ? filterPack?.selling:product.discount_price}.00 </h4>
                                    <p>{product.sort_details}</p>
                                    {/* <div className='size_view'> */}
                                    <div className='re_points' style={{fontSize:"16px"}}>Points {product.point}</div>
                                    {product.attribute?.length>0&& product.stock !==0 &&
                                            <div className="customs_selects" >
                                        <select name="product" className="customs_sel_box product_card_select" style={{minHeight:"30px",width:"60%"}} onChange={(e)=>ChangeAttribute(e.target.value)} value={selectpack}>
                                         {product.attribute?.map((data)=>{
                                             return(
                                               <option value={data.name}>{data.name} - &#x20B9; {data.price}</option>
                                              )})}
                                         </select>
                                          </div>}
                                        {product.stock!==0 && <form id="product_count_form_two">
                                        <div className="product_count_one">
                                            <div className="plus-minus-input">
                                                <div className="input-group-button">
                                                    <button type="button" className="button" onClick={()=>decNum(product.id)}>
                                                        <i className="fa fa-minus"></i>
                                                    </button>
                                                </div>
                                                <input className="form-control" type="number" value={count}  readOnly />
                                                <div className="input-group-button">
                                                    <button type="button" className="button" onClick={()=>incNum(product.id, product.stock)}>
                                                        <i className="fa fa-plus"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>}
                                 

                                    <div className="links_Product_areas">
                                        <ul>
                                            <li>
                                                <a  className="action wishlist" title="Wishlist" onClick={() => addToFav(product.id)}><i
                                                    className="fa fa-heart"></i>Add To Wishlist</a>
                                            </li>
                                            {/* <li>
                                                <a href="#!" className="action compare" onClick={() => addToComp(product.id)} title="Compare"><i
                                                    className="fa fa-exchange"></i>Add To Compare</a>
                                            </li> */}
                                        </ul>
                                        {ShopIds.includes(product.id) ?
                                        <a className="theme-btn-one btn-black-overlay btn_sm" style={{color:"#fff"}} onClick={() =>history.push("/cart")}><i className="fa fa-shopping-cart"/> Go To Cart</a>:
                                        <a className="theme-btn-one btn-black-overlay btn_sm" style={{color:"#fff"}} onClick={() => addToCart(product.id,product)}><i className="fa fa-shopping-cart"/> Buy</a>}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <ProductInfo  Details={product}/>
                </div>
            </section>
            :
            // <div className="container ptb-100">
            //     <div className="row">
            //         <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-12 col-12">
            //             <div className="empaty_cart_area">
            //                 <img src={img} alt="img" />
            //                 <h2>PRODUCT NOT FOUND</h2>
            //                 <h3>Sorry Mate... No Item Found according to Your query!</h3>
            //                 <Link to="/shop" className="btn btn-black-overlay btn_sm">Continue Shopping</Link>
            //             </div>
            //         </div>
            //     </div>
            // </div>
           <EmptyProductLoading/>
        }

            {/* <RelatedProduct /> */}
        </>
    )
}

const mapStateToProps = (state) =>
({
    SingleProduct: state.AllReducer.SingleProduct || [],
    WishList: state.AllReducer.WishList || [],
});
export default connect(mapStateToProps)(ProductDetailsOne);