import React, { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
// import Img
import img1 from "../../assets/img/success.png";

import spoce from "../../assets/img/space.jpg";
// Icon Import

import { connect, useDispatch, useSelector } from "react-redux";
import { ImageUrl } from "../../Redux/Utils/baseurl";
import { City_List, UserOrders } from "../../Redux/Action/allActions";
// import OrderMobile_View from './MobileView'
import OrderMobile_View from "./OrderMobileView";

const OrderSuccess = (props) => {
  const history = useHistory();
  const RewardStatus = useSelector((state) => state.AllReducer.Reward_status);
  let { id } = useParams();
  let dispatch = useDispatch();
  const [OrderDetails, setOrderDetails] = useState([]);
  const CityList = useSelector((state) => state.AllReducer.City_List);
  const routeChange = () => {
    history.goBack();
  };

  useEffect(() => {
    dispatch(UserOrders());
    dispatch(City_List());
  }, []);

  useEffect(() => {
    props.Orders.filter((data) => {
      if (data.txnid === id) {
        setOrderDetails(data);
      }
    });
  }, [props.Orders, id]);

  const dropdown = (id) => {
    return CityList.filter((data) => {
      return Number(data.id) === Number(id);
    });
  };

  const OrderDetail =
    Object.values(OrderDetails?.cart || "") || OrderDetails.cart;
  const cartTotal = () => {
    return OrderDetail.reduce(function (total, item) {
      return (
        total +
        (item.qty || 1) *
          (OrderDetails?.payment_method === "cash"
            ? item.attribute_price
              ? item.attribute_price
              : item.price
            : item.reward_point)
      );
    }, 0);
  };

  const headings = {
    // // reward:"Points",
    // discount:"Discount",
    // total:"Total",
    subtotal:
      OrderDetails?.payment_method === "cash"
        ? "PRODUCT COST"
        : "PRODUCT POINTS",
    discount: "DISCOUNT",
    subtot: "SUBTOTAL",
    deliverycharge: "DELIVERY CHARGES",
    total_paid:
      OrderDetails?.payment_method === "cash" ? "TOTAL AMOUNT" : "TOTAL POINTS",
  };

  const FooterValues = {
    subtotal: Number(cartTotal()),
    // reward:OrderDetails?.reward || 0,
    discount:
      (OrderDetails?.discount &&
        JSON.parse(OrderDetails?.discount)?.discount) ||
      OrderDetails?.offer_value ||
      0,
    total: OrderDetails?.orderTotal,
    deliverycharge: OrderDetails?.shipping?.price || 0,
    total_paid: OrderDetails?.orderTotal,
    subtot: Math.abs(
      Number(OrderDetails?.orderTotal) -
        Number(OrderDetails?.shipping?.price || 0)
    ),
  };

  const ReturnValue = (payment, data) => {
    if (payment === "cash") {
      return data.attribute_price ? data.attribute_price : data.main_price;
    } else {
      return data.reward_point;
    }
  };

  return (
    <>
      <OrderMobile_View />

      <div className="tables_area desktop_view_cart">
        {/* <img src={invoice} className="img-fluid" alt="svg" /> */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="back_btn_emial">
            <button
              className="theme-btn-one btn-black-overlay btn_sm"
              onClick={routeChange}
            >
              <i className="fa fa-arrow-left mr-2"></i>Go Back
            </button>
          </div>
          <div
            className="buttons"
            style={{ textAlign: "end", padding: "36px 0px 30px 0px" }}
          >
            <Link to={`/invoice-one/${OrderDetails?.id}`}>
              <button className="theme-btn-one btn-black-overlay btn_sm">
                Invoice
              </button>
            </Link>
          </div>
        </div>

        <table
          align="center"
          border="0"
          cellPadding="0"
          cellSpacing="0"
          className="box_table"
          style={{
            padding: "0 30px",
            BackgroundColor: "#fff",
            BoxShadow: " 0px 0px 14px -4px rgba(0, 0, 0, 0.2705882353)",
            width: "100%",
            display: "block",
          }}
        >
          <tbody>
            <tr>
              <td>
                <table
                  align="center"
                  border="0"
                  cellPadding="0"
                  cellSpacing="0"
                >
                  <tbody>
                    <tr>
                      <td>
                        <img
                          src={img1}
                          alt="img"
                          style={{ marginTop: "13px" }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h2 className="title">thank you</h2>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {/* <p>
                          Payment Is Successfully Processsed And Your Order Is
                          On The Way
                        </p> */}
                        <p>
                          <strong>Order ID : </strong>
                          {OrderDetails?.txnid}
                        </p>
                      </td>
                    </tr>
                    <tr></tr>
                    <tr>
                      <td className="payment_div">
                        <div>
                          <strong>Payment : </strong>
                          {OrderDetails?.payment_method}
                        </div>
                        <div>
                          <strong>Status : </strong>
                          {OrderDetails?.order_status}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table
                  border="0"
                  cellPadding="0"
                  cellSpacing="0"
                  className="mt-4"
                >
                  <tbody>
                    <tr>
                      <td>
                        <h2 className="title">YOUR ORDER DETAILS</h2>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table
                  className="order-detail"
                  border="0"
                  cellPadding="0"
                  cellSpacing="0"
                  align="left"
                >
                  <tbody>
                    <tr align="left">
                      <th>IMAGE</th>
                      <th style={{ paddingLeft: " 15px" }}>PRODUCTNAME </th>
                      <th>QUANTITY</th>
                      <th>
                        {OrderDetails?.payment_method === "cash"
                          ? "PRICE"
                          : "POINTS"}
                      </th>
                      <th>TOTAL</th>
                    </tr>
                    {OrderDetail.map((data, index) => {
                      return (
                        <tr>
                          <td style={{ padding: "5px" }}>
                            <img
                              src={ImageUrl + data.photo}
                              alt="img"
                              width="70"
                              height={"70"}
                              style={{ height: "70px" }}
                            />
                          </td>
                          <td valign="top" style={{ paddingLeft: "15px" }}>
                            <h5 style={{ marginTop: "15px" }}>{data.name}</h5>
                          </td>
                          <td valign="top" style={{ paddingLeft: "15px" }}>
                            {/* <h5 style={{ fontSize: "14px", color: "#444", marginTop: "15px", marginBottom: " 0px" }}>Size :
                                                    <span> L</span> </h5> */}
                            <h5
                              style={{
                                fontSize: "14px",
                                color: "#444",
                                marginTop: "10px",
                              }}
                            >
                              QTY : <span>{data.qty}</span>
                            </h5>
                          </td>
                          <td valign="top" style={{ paddingLeft: "15px" }}>
                            <h5
                              style={{
                                fontSize: "14px",
                                Color: "#444",
                                marginTop: "15px",
                              }}
                            >
                              <b>
                                {" "}
                                {ReturnValue(
                                  OrderDetails?.payment_method,
                                  data
                                )}
                              </b>
                            </h5>
                          </td>
                          <td valign="top" style={{ paddingLeft: "15px" }}>
                            <h5
                              style={{
                                fontSize: "14px",
                                Color: "#444",
                                marginTop: "15px",
                              }}
                            >
                              <b>
                                {ReturnValue(
                                  OrderDetails?.payment_method,
                                  data
                                ) * data.qty}
                              </b>
                            </h5>
                          </td>
                        </tr>
                      );
                    })}
                    {Object.keys(headings).map((data) => (
                      <>
                        {/* {FooterValues[data] > 0 && ( */}
                        {["discount", "subtot"].includes(data) &&
                        OrderDetails?.payment_method === "point" ? (
                          ""
                        ) : (
                          <tr>
                            <td
                              colSpan="2"
                              style={{
                                lineHeight: "49px",
                                fontSize: "13px",
                                color: "#000000",
                                paddingLeft: "20px",
                                textAlign: "left",
                                borderRight: " unset",
                              }}
                            >
                              {headings[data]}:
                            </td>
                            <td
                              colSpan="3"
                              className="price"
                              style={{
                                lineHeight: "49px",
                                textAlign: "right",
                                paddingRight: "28px",
                                fontSize: "13px",
                                color: "#000000",
                                TextAlign: "right",
                                borderLeft: "unset",
                              }}
                            >
                              <b>
                                {FooterValues[data] > 0 && (
                                  <span
                                    style={{
                                      color:
                                        data === "discount"
                                          ? "green"
                                          : data === "deliverycharge"
                                          ? "red"
                                          : "",
                                    }}
                                  >
                                    {data === "discount"
                                      ? data?.offer_type === "amount"
                                        ? "- "
                                        : "%"
                                      : data === "deliverycharge"
                                      ? "+ "
                                      : ""}
                                  </span>
                                )}{" "}
                                {(FooterValues[data] && FooterValues[data]) ||
                                  0}
                              </b>
                            </td>
                          </tr>
                        )}
                      </>
                    ))}
                  </tbody>
                </table>
                <table
                  cellPadding="0"
                  cellSpacing="0"
                  border="0"
                  align="left"
                  style={{
                    width: "100%",
                    marginTop: "30px",
                    marginBottom: "30px",
                  }}
                >
                  {Number(OrderDetails?.flag) === 0 ? (
                    <tbody>
                      <tr>
                        <td
                          style={{
                            fontSize: "13px",
                            fontWeight: "400",
                            color: "#444444",
                            letterSpacing: "0.2px",
                            width: " 50%",
                          }}
                        >
                          <h5 className="orderheading">DELIVERY ADDRESS</h5>
                          <p
                            style={{
                              textAlign: "left",
                              fontWeight: "normal",
                              fontSize: "14px",
                              color: "#000000",
                              lineHeight: "21px",
                              marginTop: "0",
                            }}
                          >
                            {OrderDetails?.billing_info?.bill_first_name}{" "}
                            {OrderDetails?.billing_info?.bill_last_name},<br />
                            {OrderDetails?.billing_info?.bill_address1},<br />{" "}
                            {
                              dropdown(OrderDetails?.billing_info?.bill_city)[0]
                                ?.name
                            }{" "}
                            <br />
                            {OrderDetails?.billing_info?.bill_country}-
                            {OrderDetails?.billing_info?.bill_zip}
                            <br />
                            <strong>Mobile No:</strong>
                            {OrderDetails?.billing_info?.bill_phone}
                          </p>
                        </td>
                        <td width="57" height="25" className="user-info">
                          <img src={spoce} alt="img" height="25" width="57" />
                        </td>
                        <td
                          className="user-info"
                          style={{
                            fontSize: "13px",
                            fontWeight: "400",
                            color: "#444444",
                            letterSpacing: "0.2px",
                            width: "50%",
                          }}
                        >
                          <h5 className="orderheading">SHIPPING ADDRESS</h5>
                          <p
                            style={{
                              textAlign: "left",
                              fontWeight: "normal",
                              fontSize: "14px",
                              color: "#000000",
                              lineHeight: "21px",
                              marginTop: "0",
                            }}
                          >
                            {OrderDetails?.shipping_info?.ship_first_name}{" "}
                            {OrderDetails?.shipping_info?.ship_last_name},<br />
                            {OrderDetails?.shipping_info?.ship_address1},<br />{" "}
                            {
                              dropdown(
                                OrderDetails?.shipping_info?.ship_city
                              )[0]?.name
                            }{" "}
                            <br />
                            {OrderDetails?.shipping_info?.ship_country}-
                            {OrderDetails?.shipping_info?.ship_zip}
                            <br />
                            <strong>Mobile No:</strong>
                            {OrderDetails?.shipping_info?.ship_phone}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  ) : (
                    <tbody>
                      <tr>
                        <td>
                          <h5 className="orderheading">PICKUP STORE ADDRESS</h5>
                          <p> {OrderDetails?.billing_info?.bill_address1}</p>
                        </td>
                      </tr>
                    </tbody>
                  )}
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  Orders: state.AllReducer.Orders || [],
});
export default connect(mapStateToProps)(OrderSuccess);
