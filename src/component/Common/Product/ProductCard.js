import React, { useEffect, useState } from 'react'
import { AiOutlineHeart } from 'react-icons/ai';
import { AiOutlineExpand } from 'react-icons/ai';
import { FaExchangeAlt } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { ImageUrl } from '../../../Redux/Utils/baseurl';
import MyVerticallyCenteredModal from '../../Common/Modal';
import { AddWishlist } from '../../../Redux/Action/CreateActions';
import Swal from "sweetalert2";
import { Profile_Details, RewardPoints } from '../../../Redux/Action/allActions';
const ProductCard = (props) => {
    let dispatch = useDispatch();
    let history= useHistory()
    const [selectpack, setselectpack] = useState(props?.data?.attribute && props?.data?.attribute[0]?.name);
    const [filterPack, setfilterPack] = useState(props?.data?.attribute && props?.data?.attribute[0]);
    const [ShopIds,setShopIds]=useState([])
    const [disable,setdisable]=useState(true)
    const [WishListData,setWishListData]=useState([])
    const Rewards=useSelector(state=>state.AllReducer.RewardPoints)
    const ShoopingCarts=useSelector(state=>state.StoreProuct.ShoopingCarts)
    const WishList=useSelector(state=>state.AllReducer.WishList)
    const ProfileData=useSelector(state=>state.AllReducer.ProfileData)
    const [qtyValue, setqtyValue] = useState(1);
    const [QuantityValues,setQuantityValues]=useState({})
    const [count, setCount] = useState(0);


    useEffect(()=>{
      dispatch(RewardPoints())
      dispatch(Profile_Details())
    },[])
    
    const ChangeAttribute = (data) => {
      setselectpack(data);
      FilterData(data);
    };
  
  
    const FilterData = (value) => {
      var Data = props.data.attribute.filter((data) => {
        return data.name === value;
      });
      setfilterPack(Data[0]);
    };

    const DiscountPrice=(value,type)=>{
      if(type==="point"){
        return Math.abs(value - (value * (Number(ProfileData?.users?.point_discount) / 100))).toFixed(2)
      }else{
        return Math.abs(value - (value * (Number(ProfileData?.users?.prize_discount) / 100))).toFixed(2)
      }
    }


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
        quantity: QuantityValues["test"+id] || 1,
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
    // Add to Favorite
   // Add to Favorite
   const addToFav = (id) => {
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
        dispatch(AddWishlist(id)).then((res)=>{
        })
      }
    } else {
     history.push("/login")
    }
  }
  

const OnChangeQty=(val,product,index)=>{

  setdisable(false)
  setqtyValue(qtyValue+1)
     setQuantityValues((prevState) => ({
        ...prevState,
        ["test" + index]:val,
    }));
  if (val > product.stock) {
    Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: "Stock Exceeded",
        showConfirmButton: false,
        timer: 1000
    })
    } else {
      for (var i = 0; i < ShoopingCarts.length; i++) {
        if (product.id === ShoopingCarts[i].id) {
          ShoopingCarts[i].quantity = val;
          break;
        }
      }
      localStorage.setItem("carts", JSON.stringify(ShoopingCarts));  
    }
}
   
useEffect(()=>{
  let Ids=[]
  ShoopingCarts.map((data,index)=>{
  setQuantityValues((prevState) => ({
    ...prevState,
    ["test" + data.id]: data.quantity || 1,
  }));
  Ids.push(data.id)
})
setShopIds(Ids)
},[ShoopingCarts])

useEffect(()=>{
  let Data=[]
  WishList.map((data)=>{
    Data.push(data?.id)
  })
  setWishListData(Data)
},[WishList])

useEffect(()=>{
    localStorage.setItem("carts",JSON.stringify(ShoopingCarts))
},[ShoopingCarts])

console.log(WishListData.includes(props.data.id),"kkkkkkkk")
    return (
        <>
            <div className="product_wrappers_one">
                <div className="thumb">
                    <Link to={`/product-details-one/${props.data.slug}/${props.data.id}`} className="image">
                        <img src={ImageUrl+props.data.photo} alt="Product" />
                        <img className="hover-image" src={ImageUrl+props.data.photo}
                            alt="Product" />
                    </Link>
                    {/* <span className="badges">
                        <span className={(['hot', 'new', 'sale'][Math.round(Math.random() * 2)])}>{props.data.slug}</span>
                    </span> */}
                    <div className="actions">
                    {/* change_clr_wis */}
                        <a  className={`action wishlist ${WishListData.includes(props.data.id)?"change_clr_wis":""}`}   title="Wishlist" onClick={() => addToFav(props.data.id)}><AiOutlineHeart /></a>
                    </div>

                </div>
                <div className="content">
                    <h5 className="title">
                        <Link to={`/product-details-one/${props.data.slug}/${props.data.id}`}>{props.data.name}</Link>
                        <div className='re_points'>Points {props.data.point}</div>
                    </h5>
                    
                    <span className="price">
                        <span className="new"> <i class="fa fa-rupee"></i> { filterPack ? filterPack.selling:props.data.discount_price}.00</span>
                    </span>

                </div>

                {/* qty */}
                {props?.data?.stock && props?.data?.stock !== 0 ? 
            <div className="add_cart_qty" style={{ justifyContent: "center",display:"flex",alignItems:"center" }}>
                <input 
                  min="1"
                  max="100"
                  type="number"
                  style={{
                    width: "30%",
                    minHeight: "30px",
                    textAlign: "center",
                    padding: "0px 0px 0px 10px",
                    
                    
                  }}
                  onChange={(e) =>OnChangeQty(e.target.value,props.data,props.data.id)}

                  value={QuantityValues["test"+props.data.id]?QuantityValues["test"+props.data.id]:1}
                />

                {props.data.attribute.length > 0 &&
                <div
                  className="customs_selects"
                  style={{ padding: "0px 0px 0px 8px", width: "65%" }}
                >
                  <select
                    name="product"
                    className="customs_sel_box product_card_select"
                    style={{ minHeight: "30px" }}
                    onChange={(e) => ChangeAttribute(e.target.value)}
                    value={selectpack}
                  >
                    {props.data.attribute.map((data) => {
                      return (
                        <option value={data.name}>
                         {data.name} -  &#x20B9; {data.price}
                          {/* fdfdfd <i class="fa fa-caret-down" aria-hidden="true"></i> */}
                        </option>
                      );
                    })}
                  </select>
                </div>
}
                {/* <form
                  id="product_count_form_two"
                  className="custom_mar"
                  style={{ paddingTop: "0px" }}
                >
                  <div className="product_count_one">
                    <div
                      className="plus-minus-input"
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <div className="input-group-button">
                        <button
                          type="button"
                          className="button"
                          onClick={() => decNum(props.data.id)}
                        >
                          <i className="fa fa-minus"></i>
                        </button>
                      </div>
                      <input
                        className="form-control"
                        type="number"
                        value={qtyValue}
                        readOnly
                      />
                      <div className="input-group-button">
                        <button
                          type="button"
                          className="button"
                          onClick={() =>
                            incNum(props.data.id, props.data.stock)
                          }
                        >
                          <i className="fa fa-plus"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </form> */}
              {/* )} */}
              </div>:""}
              {/* qty end */}
                <div style={{ textAlign: "center" }}>
                    {ShopIds.includes(props.data.id) ?

                    <button type="button" className="add-to-cart cart-btn" onClick={() =>history.push("/cart")}><i className="fa fa-shopping-cart"/> Go to cart</button>:

                    <button type="button" className="add-to-cart cart-btn" style={{width:"90px"}} onClick={() => addToCart(props.data.id,props.data)}><i className="fa fa-shopping-cart"/> Buy</button>

                    }
                    </div>
            </div>
              
            {/* <MyVerticallyCenteredModal data={props.data} show={modalShow} onHide={() => setModalShow(false)} /> */}
        </>
    )
}

export default ProductCard