import React,{useEffect,useState,useRef} from 'react'
import { useHistory, useParams,Link } from 'react-router-dom'
// import img
import img1 from '../../assets/img/invoice.svg'

import { City_List, UserOrders } from '../../Redux/Action/allActions'
import { ImageUrl } from '../../Redux/Utils/baseurl'
import { connect,useDispatch, useSelector } from 'react-redux'
import ReactToPrint from "react-to-print";
import moment from 'moment'
const InvoiceOnes = (props) => {
  const componentRef = useRef();
  const history = useHistory();
  let { id } =useParams()
  const [OrderDetails,setOrderDetails]=useState([])
  const CityList = useSelector(state=>state.AllReducer.City_List)
  let dispatch=useDispatch()
  const routeChange = () => {
    history.goBack()
  };

  useEffect(()=>{
    dispatch(UserOrders())
    dispatch(City_List())
  },[])

  useEffect(()=>{
    props.Orders.filter((data)=>{
     if(data.id===Number(id)){
      setOrderDetails(data)
     }
    })

  },[props.Orders,id])

  const  Billing =OrderDetails?.billing_info
  const OrderDetail=Object.values(OrderDetails?.cart || "") || OrderDetails.cart
  const cartTotal = () => {
    return OrderDetail.reduce(function (total, item) {
        return total + ((item.qty || 1) * (item.attribute_price?item.attribute_price:item.main_price))
    }, 0)
}
const TotalAmt=Number(OrderDetails?.premium_amt || 0)+Number(OrderDetails?.amc || 0)+Number(OrderDetails?.award || 0)+Number(OrderDetails?.installation || 0)

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
  reward:OrderDetails?.reward,
  discount:OrderDetails?.discount || 0,
  total:Math.abs(Number(cartTotal())-Number(OrderDetails?.discount!=="[]" ? OrderDetails?.discount : 0)).toFixed(2),
  deliverycharge:OrderDetails?.shipping?.price || 0,
  total_paid:0
}

  return (
   
    <>
      <section className="theme-invoice-1 pb-100">
        <div className="container">
          <div className="row" ref={componentRef}>
            <div className="col-xl-10 m-auto">
              <div className="back_btn_emial">
                <button className="theme-btn-one btn-black-overlay btn_sm" onClick={routeChange}>
                  <i className="fa fa-arrow-left mr-2"></i>Go Back
                </button>
              </div>
              <div className="invoice-wrapper">
                <div className="invoice-header">
                  <div className="upper-icon">
                    <img src={img1} className="img-fluid" alt="svg" />
                    
                  </div>
                  <div className="row header-content" >
                    <div className="col-md-6">
                      <div className="footerLogo">
                        <img src={"https://elancier.in/vasantham/assets/images/1653572820logo.gif"} alt="logo" className='agalogoImageFooter' style={{width:"43%"}}/>
                      </div>
                      <div className="mt-md-4 mt-3">
                        {/* <h4 className="mb-2">
                        31, MARUTHUPANDIYAR 1ST STREET, <br/>ANANDHA NAGAR,
                                     P&T NAGAR EXTENSION,<br/>
                                     MADURAI- 625017<br/>
                        </h4> */}
                        {/* <a className="mb-0" href="https://dynamic-froyo-597702.netlify.app/#/">info@example.com</a> */}
                      </div>
                    </div>
                    <div className="col-md-6 text-md-right mt-md-0 mt-4">
                      <h2>invoice</h2>
                      <div className="">
                        <h4 className="">
                          <strong>Customer Address</strong>
                        </h4>
                        <h4>{Billing?.bill_first_name} {Billing?.bill_last_name}</h4>
                        <h4>{Billing?.bill_address1}</h4>
                        <h4>{dropdown(Billing?.bill_city)[0]?.name}</h4>
                        <h4>{Billing?.bill_country}-{Billing?.bill_zip}</h4>
                        
                      </div>
                    </div>
                  </div>
                  <div className="detail-bottom">
                    <ul>
                      <li><span>date :</span><h4> {moment(OrderDetails?.created_at).format("DD MMMM , YYYY")}</h4></li>
                      <li><span>Transaction no :</span><h4> {OrderDetails?.transaction_number}</h4></li>
                      <li><span>email :</span><h4>{Billing?.bill_email}</h4></li>
                    </ul>
                  </div>
                </div>
                <div className="invoice-body table-responsive-md">
                <div>
                  <table className="table table-borderless mb-0 mbl" >
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Products</th>
                        <th scope="col">price</th>
                        <th scope="col">Qty</th>
                        <th scope="col">total</th>
                      </tr>
                    </thead>
             {OrderDetail.map((data,index)=>{
                     return(
                    <tbody>
                      <tr>
                        <th scope="row">{index+1}</th>
                        <td>{data.name}</td>
                        <td> <i class="fa fa-inr"/> {data.attribute_price?data.attribute_price:data.main_price}</td>
                        <td>{data.qty}</td>
                        <td><i class="fa fa-inr"/>  {(data.attribute_price?data.attribute_price:data.main_price)*data.qty}</td>
                      </tr>
                   
                    </tbody>
                    )})}      

                    <tfoot>
                    {Object.keys(headings).map((data)=>
                      <tr>
                        <td colSpan="3"></td>
                        <td className="font-bold text-dark" colSpan="1">{headings[data]}</td>
                        <td className="font-bold text-theme"><i class="fa fa-inr"/>  {
                            data==="discount" ? (FooterValues["discount"]!=="[]" ? FooterValues[data] :0)
                            :

                            data==="total_paid" ? Number(FooterValues["total"]) + Number(FooterValues["deliverycharge"]) :

                            (FooterValues[data] && FooterValues[data])|| 0
                        }</td>
                      </tr>
                    )}
                  
                    </tfoot>
                  </table>
                  
                  </div>

                  {/* mobile view */}
                  <div className="offcanvas-add-cart-wrapper mobile_view_cart" style={{padding:0}}>
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
                        Price : <i class="fa fa-inr"/>  {(data.attribute_price?data.attribute_price:data.main_price).toFixed(2) || 0}
                      </span>
                    </div>
                   
                    <div style={{color:"green"}}> Total : <i class="fa fa-inr"/>  {((data.attribute_price?data.attribute_price:data.main_price)*data.qty).toFixed(2)}</div>
                      
                  </div>
                </div>
                
              </li>
            ))}
          </ul>
          <div className='mobile_fields' style={{padding:0}}>
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

          </div>
{/* end */}
                  <div className="invoice-footer text-right">
               
               <div className="buttons">
               <ReactToPrint
       trigger={() =>  <button className="theme-btn-one btn-black-overlay btn_sm ml-2">print</button>}
       content={() => componentRef.current}
     />
   
                
               </div>
             </div>
         

          </div>
                </div>
           
              </div>
            </div>
        </div>
      </section>
    </>
  )
}

const mapStateToProps = (state) =>
({
    Orders: state.AllReducer.Orders || []
});
export default connect(mapStateToProps)(InvoiceOnes);
