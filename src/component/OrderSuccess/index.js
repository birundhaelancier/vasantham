import React,{useEffect,useState} from 'react'
import { useHistory,useParams,Link } from 'react-router-dom'
// import Img
import img from '../../assets/img/common/delivery_success.png'
import img1 from '../../assets/img/email/success.png'

import invoice from '../../assets/img/invoice/invoice.svg'
import spoce from '../../assets/img/email/space.jpg'
// Icon Import
import facebook from '../../assets/img/email/facebook.png'
import youtube from '../../assets/img/email/youtube.png'
import twitter from '../../assets/img/email/twitter.png'
import gplus from '../../assets/img/email/gplus.png'
import linkedin from '../../assets/img/email/linkedin.png'
import pinterest from '../../assets/img/email/pinterest.png'
import { connect,useDispatch, useSelector } from 'react-redux'
import { ImageUrl } from '../../Redux/Utils/baseurl'
import { City_List, UserOrders } from '../../Redux/Action/allActions'
// import OrderMobile_View from './MobileView'
import OrderMobile_View from './OrderMobileView'

const OrderSuccess = (props) => {
    const history = useHistory();

    let { id } =useParams()
    let dispatch=useDispatch()
    const [OrderDetails,setOrderDetails]=useState([])
    const CityList=useSelector(state=>state.AllReducer.City_List)
    const routeChange = () => {
        history.goBack()
    };

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

    const dropdown=(id)=>{
        return CityList.filter((data)=>{
            return Number(data.id)===Number(id)
     })
    }

    const  Billing =OrderDetails?.billing_info
    const OrderDetail=Object.values(OrderDetails?.cart ||"") || OrderDetails.cart
    const cartTotal = () => {
      return OrderDetail.reduce(function (total, item) {
          return total + ((item.qty || 1) * (item.attribute_price?item.attribute_price:item.main_price))
      }, 0)
  }

  const headings={
    subtotal:"SubTotal",
    // reward:"Reward Points",
    discount:"Discount",
    total:"Total",
    deliverycharge:"Delivery Charges",
    total_paid:"TOTAL PAID"
}

const FooterValues={
    subtotal:Number(cartTotal()),
    // reward:OrderDetails?.reward || 0,
    discount:OrderDetails?.discount || 0,
    total:Math.abs(Number(cartTotal())-Number(OrderDetails?.discount!=="[]" ? OrderDetails?.discount : 0)),
    deliverycharge:OrderDetails?.shipping?.price || 0,
    total_paid:0
}
    return (
        <>
              <OrderMobile_View/>
           
             
            <div className="tables_area desktop_view_cart">
            {/* <img src={invoice} className="img-fluid" alt="svg" /> */}
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
              
    
                <table align="center" border="0" cellPadding="0" cellSpacing="0" className="box_table"
                    style={{ padding: "0 30px", BackgroundColor: "#fff", BoxShadow:" 0px 0px 14px -4px rgba(0, 0, 0, 0.2705882353)", width: "100%", display: "block" }}>
                    <tbody>
                        <tr>
                            <td>
                                <table align="center" border="0" cellPadding="0" cellSpacing="0">
                                    <tbody>
                                        {/* <tr>
                                            <td>
                                                <img src={img} alt="img" style={{ marginBottom: "30px" }} />
                                            </td>
                                        </tr> */}
                                        <tr >
                                            <td >
                                                <img src={img1} alt="img" style={{marginTop:"13px"}}/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h2 className="title">thank you</h2>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p>Payment Is Successfully Processsed And Your Order Is On The Way</p>
                                                <p><strong>Transaction ID : </strong>{OrderDetails?.txnid}</p>
                                            </td>
                                        </tr>
                                        <tr>
                                        </tr>
                                        <tr>
                                            <td className='payment_div'>
                                               <div><strong>Payment : </strong>{OrderDetails?.payment_method}</div>
                                               <div><strong>Status : </strong>{OrderDetails?.order_status}</div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table border="0" cellPadding="0" cellSpacing="0" className="mt-4">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <h2 className="title">YOUR ORDER DETAILS</h2>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table className="order-detail" border="0" cellPadding="0" cellSpacing="0" align="left">
                                    <tbody>
                                        <tr align="left">
                                            <th>IMAGE</th>
                                            <th style={{ paddingLeft: " 15px" }}>PRODUCTNAME </th>
                                            <th>QUANTITY</th>
                                            <th>PRICE</th>
                                            <th>TOTAL</th>
                                        </tr>
                                        {OrderDetail.map((data,index)=>{
                                          return(
                                        <tr>
                                            <td style={{ padding: "5px" }}>
                                                <img src={ImageUrl+data.photo} alt="img" width="70" height={"70"} style={{height:"70px"}}/>
                                            </td>
                                            <td valign="top" style={{ paddingLeft: "15px" }}>
                                                <h5 style={{ marginTop: "15px" }}>{data.name}</h5>
                                            </td>
                                            <td valign="top" style={{ paddingLeft: "15px" }}>
                                                {/* <h5 style={{ fontSize: "14px", color: "#444", marginTop: "15px", marginBottom: " 0px" }}>Size :
                                                    <span> L</span> </h5> */}
                                                <h5 style={{ fontSize: "14px", color: "#444", marginTop: "10px" }}>QTY : <span>{data.qty}</span></h5>
                                            </td>
                                            <td valign="top" style={{ paddingLeft: "15px" }}>
                                                <h5 style={{ fontSize: "14px", Color: "#444", marginTop: "15px" }}><b><i class="fa fa-inr"/> {data.attribute_price?data.attribute_price:data.main_price}</b></h5>
                                            </td>
                                            <td valign="top" style={{ paddingLeft: "15px" }}>
                                                <h5 style={{ fontSize: "14px", Color: "#444", marginTop: "15px" }}><b><i class="fa fa-inr"/> {(data.attribute_price?data.attribute_price:data.main_price)*data.qty}</b></h5>
                                            </td>
                                        </tr>
                                          )})}
                                       {Object.keys(headings).map((data)=>
                                        <tr>
                                            <td colSpan="2"
                                                style={{ lineHeight: "49px", fontSize: "13px", color: "#000000", paddingLeft: "20px", textAlign: "left", borderRight: " unset" }}>
                                                {headings[data]}:</td>
                                            <td colSpan="3" className="price"
                                                style={{ lineHeight: "49px", textAlign: "right", paddingRight: "28px", fontSize: "13px", color: "#000000", TextAlign: "right", borderLeft: "unset" }}>
                                                <b><i class="fa fa-inr"/> {

                                                data==="discount" ? (FooterValues["discount"]!=="[]" ? FooterValues[data] :0)
                                                :

                                                data==="total_paid" ? (Number(FooterValues["total"]) + Number(FooterValues["deliverycharge"]) || 0) :
                                              
                                                FooterValues[data] && FooterValues[data] || 0
                                                }
                                                
                                                </b></td>
                                        </tr>
                                       )}
                                       
                                       
                                    </tbody>
                                </table>
                                <table cellPadding="0" cellSpacing="0" border="0" align="left"
                                    style={{ width: "100%", marginTop: "30px", marginBottom: "30px" }}>
                                    <tbody>
                                        <tr>
                                            <td
                                                style={{ fontSize: "13px", fontWeight: "400", color: "#444444", letterSpacing: "0.2px", width: " 50%" }}>
                                                <h5
                                                    style={{ fontSize: "16px", fontWeight: "500", color: "#000", lineHeight: "16px", paddingBottom: "13px", borderBottom: "1px solid #e6e8eb", letterSpacing: "-0.65px", marginTop: "0", marginBottom: "13px" }}>
                                                    DELIVERY ADDRESS</h5>
                                                    <p
                                                    style={{ textAlign: "left", fontWeight: "normal", fontSize: "14px", color: "#000000", lineHeight: "21px", marginTop: "0" }}>
                                                    {OrderDetails?.billing_info?.bill_first_name}{" "}{OrderDetails?.billing_info?.bill_last_name},<br />
                                                    {OrderDetails?.billing_info?.bill_address1},<br /> {dropdown(OrderDetails?.billing_info?.bill_city)[0]?.name} <br />{OrderDetails?.billing_info?.bill_country}-{OrderDetails?.billing_info?.bill_zip}<br/>
                                                    <strong>Mobile No:</strong>{OrderDetails?.billing_info?.bill_phone}
                                                    </p>
                                            </td>
                                            <td width="57" height="25" className="user-info"><img
                                                src={spoce} alt="img" height="25" width="57" /></td>
                                            <td className="user-info"
                                                style={{ fontSize: "13px", fontWeight: "400", color: "#444444", letterSpacing: "0.2px", width: "50%" }}>
                                                <h5
                                                    style={{ fontSize: "16px", fontWeight: "500", color: "#000", lineHeight: "16px", paddingBottom: "13px", borderBottom: "1px solid #e6e8eb", letterSpacing: "-0.65px", marginTop: "0", marginBottom: "13px" }}>
                                                    SHIPPING ADDRESS</h5>
                                                    <p
                                                    style={{ textAlign: "left", fontWeight: "normal", fontSize: "14px", color: "#000000", lineHeight: "21px", marginTop: "0" }}>
                                                    {OrderDetails?.shipping_info?.ship_first_name}{" "}{OrderDetails?.shipping_info?.ship_last_name},<br />
                                                    {OrderDetails?.shipping_info?.ship_address1},<br /> {dropdown(OrderDetails?.shipping_info?.ship_city)[0]?.name} <br />{OrderDetails?.shipping_info?.ship_country}-{OrderDetails?.shipping_info?.ship_zip}<br/>
                                                    <strong>Mobile No:</strong>{OrderDetails?.shipping_info?.ship_phone}
                                                    </p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>


              
            </div>
          
        </>
    )
}

const mapStateToProps = (state) =>
({
    Orders: state.AllReducer.Orders || []
});
export default connect(mapStateToProps)(OrderSuccess);
