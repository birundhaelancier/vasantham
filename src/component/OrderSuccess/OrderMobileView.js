import React,{useEffect,useState} from 'react'
import { useHistory,useParams } from 'react-router-dom'
// import Img
import img1 from '../../assets/img/success.png'
import { Link } from 'react-router-dom'
import { connect,useDispatch, useSelector } from 'react-redux'
import { ImageUrl } from '../../Redux/Utils/baseurl'
import { City_List, UserOrders } from '../../Redux/Action/allActions'
const OrderMobile_View = (props) => {
    const history = useHistory();
    const CityList=useSelector(state=>state.AllReducer.City_List)
    const routeChange = () => {
        history.goBack()
    };
    let { id } =useParams()
    let dispatch=useDispatch()
    const [OrderDetails,setOrderDetails]=useState([])
    useEffect(()=>{
      dispatch(UserOrders())
      dispatch(City_List())
    },[])
    useEffect(()=>{
      props.Orders.filter((data)=>{
       if(data.txnid===id){
        setOrderDetails(data)
       }
      })
    },[props.Orders,id])
    const  Billing =OrderDetails?.billing_info
    const OrderDetail=Object.values(OrderDetails?.cart ||"") || OrderDetails.cart
    const cartTotal = () => {
      return OrderDetail.reduce(function (total, item) {
          return total + ((item.qty || 1) * (item.attribute_price?item.attribute_price:item.main_price))
      }, 0)
  }
 

  const dropdown=(id)=>{
    return CityList.filter((data)=>{
        return Number(data.id)===Number(id)
 })
}

const headings={
    subtotal:"SubTotal",
    reward:"Points",
    discount:"Discount",
    total:"Total",
    deliverycharge:"Delivery Charges",
    total_paid:"TOTAL PAID"
}

const FooterValues={
    subtotal:Number(cartTotal()),
    reward:OrderDetails?.reward || 0,
    discount:OrderDetails?.discount || 0,
    total:Math.abs(Number(cartTotal())-Number(OrderDetails?.discount!=="[]" ? OrderDetails?.discount : 0)),
    deliverycharge:OrderDetails?.shipping?.price || 0,
    total_paid:0
}
    return (
        <>
            <div className="mobile_view_cart order_success_deta">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div className="back_btn_emial">
                    <button className="theme-btn-one btn-black-overlay btn_sm" onClick={routeChange}>
                        <i className="fa fa-arrow-left mr-2"></i>Go Back
                    </button>
                </div>
                <div className="buttons" style={{textAlign:"end",padding:"36px 0px 30px 0px"}}>
                    <Link to={`/invoice-one/${OrderDetails?.id}`}><button className="theme-btn-one btn-black-overlay btn_sm">Invoice</button></Link>
                </div>
                </div>
              
                
                <div className="head_top_det">
                <div><img src={img1} alt="img" style={{marginTop:"13px"}}/></div>
                <h2 className="title">thank you</h2>
                <p>Payment Is Successfully Processsed And Your Order Is On The Way</p>
                <p>Transaction ID:{OrderDetails?.txnid}</p>
                <h2 className="title">YOUR ORDER DETAILS</h2>
                </div>
             <div className="offcanvas-add-cart-wrapper mobile_view_cart">
          <ul className="offcanvas-cart">
            {OrderDetail&& OrderDetail?.map((data, index) => (
              <li className="offcanvas-wishlist-item-single" key={index}>
                <div className="offcanvas-wishlist-item-block">
                  <Link
                    to={`/product-details-one/${data.slug}`}
                    className="offcanvas-wishlist-item-image-link"
                  >
                    <img
                      src={ImageUrl+data.photo}
                      alt="img"
                      className="offcanvas-wishlist-image"
                    />
                  </Link>
                  <div className="offcanvas-wishlist-item-content">
                    <Link
                      to={`/product-details-one/${data.slug}`}
                      className="offcanvas-wishlist-item-link"
                    >
                      {data.name}
                    </Link>
                    <div className="offcanvas-wishlist-item-details">
                      <span className="offcanvas-wishlist-item-details-quantity">
                        Quantity : {data.qty || 0}
                      </span>
                    </div>
                    <div className="offcanvas-wishlist-item-details">
                      <span className="offcanvas-wishlist-item-details-quantity">
                        Price : <i class="fa fa-inr"/> {data.attribute_price?data.attribute_price:data.main_price}.00
                      </span>
                    </div>
                   
                    <div style={{color:"green"}}> Total: <i class="fa fa-inr"/> {(data.attribute_price?data.attribute_price:data.main_price)*data.qty}.00</div>
                      
                  </div>
                </div>
                
              </li>
            ))}
          </ul>
          </div>
          <div className='mobile_fields'>
          {Object.keys(headings).map((data)=>{
            return(
          <>
            <span>{headings[data]}:</span>
        <span><i class="fa fa-inr"/> {
         data==="discount" ? (FooterValues["discount"]!=="[]" ? FooterValues[data] :0):
         data==="total_paid" ? (Number(FooterValues["total"]) + Number(FooterValues["deliverycharge"]) || 0) :
         FooterValues[data] && FooterValues[data] || 0
          }</span>
          </>
          )})}
          </div>


              <div className="row">
                <div className="col-lg-6">
                    <div className="myaccount-content" style={{marginBottom:"10px",padding:"15px"}}>
                        <h4 className="title"> DELIVERY ADDRESS</h4>
                     
                                                    <p>
                                                 {OrderDetails?.billing_info?.bill_first_name}{" "}{OrderDetails?.billing_info?.bill_last_name},<br />
                                                 {OrderDetails?.billing_info?.bill_address1},<br /> {dropdown(OrderDetails?.billing_info?.bill_city)[0]?.name} <br />{OrderDetails?.billing_info?.bill_country}-{OrderDetails?.billing_info?.bill_zip}<br/>
                                                 <strong>Mobile No:</strong>{OrderDetails?.billing_info?.bill_phone}
                                                    </p>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="myaccount-content"  style={{marginBottom:"10px",padding:"15px"}}>
                        <h4 className="title">SHIPPING ADDRESS</h4>
                           <p
                            style={{ textAlign: "left", fontWeight: "normal", fontSize: "14px", color: "#000000", lineHeight: "21px", marginTop: "0" }}>
                              {OrderDetails?.billing_info?.bill_first_name}{" "}{OrderDetails?.billing_info?.bill_last_name},<br />
                                                 {OrderDetails?.billing_info?.bill_address1},<br /> {dropdown(OrderDetails?.billing_info?.bill_city)[0]?.name} <br />{OrderDetails?.billing_info?.bill_country}-{OrderDetails?.billing_info?.bill_zip}<br/>
                                                 <strong>Mobile No:</strong>{OrderDetails?.billing_info?.bill_phone}
                            </p>
                    </div>
                </div>
            </div>   

          
            </div>
        </>
    )
}

const mapStateToProps = (state) =>
({
    Orders: state.AllReducer.Orders || []
});
export default connect(mapStateToProps)(OrderMobile_View);
