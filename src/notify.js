// // // import { useEffect, useState } from "react";
// // // import addNotification from "react-push-notification";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import { NotificationsApi } from "./Redux/Action/allActions";
// // // import moment from "moment";
// // // const DesktopNotication = () => {
// // //   const Notifications = useSelector((state) => state.AllReducer.Notify);
// // //   let dispatch = useDispatch();
// // //   const [timer, settimer] = useState(false);
// // //   const [Datas, setDatas] = useState(false);
// // //   const buttonClick = () => {
// // //     addNotification({
// // //       title: "Vasantham Hyper Mart",
// // //       subtitle: Datas?.title,
// // //       message: Datas?.description,
// // //       theme: "darkblue",
// // //       icon: "",
// // //       native: true, // when using native, your OS will handle theming.
// // //     });
// // //   };

// // //   useEffect(() => {
// // //     dispatch(NotificationsApi());
// // //   }, []);

// // //   useEffect(() => {
// // //     Notifications.map((data) => {
// // //       if (moment() === moment(data.created_at || data.updated_at)) {
// // //         setDatas(data);

// // //         settimer(true);
// // //       } else {
// // //         settimer(false);
// // //       }
// // //     });
// // //   }, [Notifications]);
// // //   return <div className="page">{timer && buttonClick()}</div>;
// // // };

// // // export default DesktopNotication;
// // import React from "react";
// // import { useState, useEffect } from "react";
// // import { connect } from "react-redux";
// // // import { cash_data } from "../../../../store/Action/UserFatchData";
// // // import { dropinComponents } from "./dropinComponents.js";

// // const Cashfree1 = ({ dispatch, res }) => {
// //   const [orderToken, setOrderToken] = useState("3D3S3KLoiTRp9lVwzUvo");
// //   const [components, setComponents] = useState([]);

// //   const [payment, setpayment] = useState({
// //     order_id: "4158",
// //     order_amount: 15.0,
// //     order_currency: "INR",
// //     order_note: "Additional order info",
// //     customer_details: {
// //       customer_id: "12345",
// //       customer_email: "abc@cashfree.com",
// //       customer_phone: "9816512345",
// //     },
// //   });

// //   useEffect(() => {
// //     let comp = [];
// //     // dropinComponents.map((name, index) => {
// //     //   return comp.push(name.id);
// //     // });
// //     setComponents(comp);
// //     // dispatch(cash_data(payment))
// //     // window.location.href =
// //     //   "https://payments-test.cashfree.com/order/#3D3S3KLoiTRp9lVwzUvo";
// //   }, []);
// //   return <></>;
// // };

// // // const mapStateToProps = (state) => ({
// // //   res: state.Cash,
// // // });
// // // TEST3428174fb8cde136b79a865924718243
// // // export default connect(mapStateToProps)(Cashfree1);

// import React from 'react'

// export default function Payment() {
//   return (
//     <div>
//       <span class="payment-session">Payment Session Id:</span>  <input type="text" placeholder="payment_session" id="paymentSessionId" value="session_XaAxBAAZLPQa1-ppTvfwfCRh4nd4rpsHm99RBWBiN79fim_42A81DX94ADJ2LoQUyp4-Umz4DD-xDoY4C_55aj6f0M7Y-DuBG_RZ0meTYcpN" class="inputText">
// <p>
//   <p class="payment-session">Choose components</p>
//   <input class="drops" type="checkbox" value="order-details" checked>
//   Order Details
//   </input>
//   <input class="drops" type="checkbox" value="card" checked>
//   Card
//   </input>
//   <input class="drops" type="checkbox" value="upi">
//   UPI
//   </input>
//   <input class="drops" type="checkbox" value="app">
//   Wallets
//   </input>
//   <input class="drops" type="checkbox" value="netbanking">
//   Netbanking
//   </input>
// <input class="drops" type="checkbox" value="paylater">
//   Paylater
//   </input>
// <input class="drops" type="checkbox" value="credicardemi">
//   Credit Card EMI
//   </input>
// <input class="drops" type="checkbox" value="cardlessemi">
//   Cardless EMI
//   </input>
// </p>
// <div class="style-container" style="display:none">
// <p class="order-token">Style your Dropin</p>
//   <input class="style-dropin" type="text"
//    id="backgroundColor"      placeholder="Background Color"></input>
// <input class="style-dropin" type="text"     id="theme" placeholder="Theme"/>
// <input class="style-dropin" type="text"  id="color" placeholder="Color"/>
// <input class="style-dropin" type="text"  id="errorColor" placeholder="Error Color"/>
// <input class="style-dropin" type="text" id="fontSize" placeholder="Font Size"/>
// <input class="style-dropin" type="text" id="fontFamily" placeholder="Font Family"/>
// </div>
// <button class="btn-render" >Render</button>
// </div>
// <hr/>
// <div class="dropin-parent" id="drop_in_container">
//   Your drop will come here
// </div>
// <</div>
//     </div>
//   )
// }
