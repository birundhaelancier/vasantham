import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import RazorpayPayment from "../../helpers/RazorPay";
import razorimg from "../../assets/img/razorpay.jpg";
import cashfree from "../../assets/img/cashfree.avif";
import {
  CartTotal,
  CouponDetails,
  GetLists,
  Get_Address_List,
  PayTypeCashOrPoints,
  Profile_Details,
  RazorpayDetails,
  RedeemedHistory,
  RewardPoints,
  UserOrders,
} from "../../Redux/Action/allActions";
import { OrderPlaced_Create } from "../../Redux/Action/CreateActions";
import logo from "../../assets/img/logo.gif";
import Loading from "../../page/Loading/Loading";
import moment from "moment";
import ModalComp from "../../helpers/Modal";
import ConfirmPopup from "./ConfirmPopup";
import { Radio } from "antd";
import { cartTotalPrice } from "../../helpers/ListData";
import { apiurl } from "../../Redux/Utils/baseurl";
import axios from "axios";
const Payment = ({ PincodeList }) => {
  const [open, setopen] = useState(false);
  const [value, setvalue] = useState("");
  const [showmodal, setshowmodal] = useState(false);
  const [paytype, setpaytype] = useState(false);
  const [payment_id, setpayment_id] = useState();
  const [checkadd, setcheckadd] = useState(false);
  const ShippingDetails = useSelector((state) => state.AllReducer.Shipping);
  // const ShoppingCarts=useSelector(state=>state.StoreProuct.ShoopingCarts)
  const ShoppingCarts = useSelector((state) => state.AllReducer.CartLists);
  const Coupon = useSelector((state) => state.AllReducer.Coupon);
  const ProfileDetail = useSelector((state) => state.AllReducer.ProfileData);
  const Address_detail = useSelector((state) => state.AllReducer.Address_list);
  const payType = useSelector((state) => state.AllReducer.payType);
  const PaymentCheck = useSelector((state) => state.AllReducer.GetListData);
  const RewardStatus = useSelector((state) => state.AllReducer.Reward_status);
  const Cart_Total_Value = useSelector(
    (state) => state.AllReducer.Cart_Total_Value
  );
  const Razorpay = useSelector((state) => state.AllReducer.KeyDetails);
  const BillingInformation = useSelector(
    (state) => state.AllReducer.BillingInformation || {}
  );

  const Reward = useSelector((state) => state.AllReducer.RewardPoints);
  const [loading, setloading] = useState(false);
  const [Payments, setPayments] = useState([
    { id: 1, name: "cash", label: "Cash on delivery" },
    { id: 2, name: "points", label: "Vasantham reward points" },
    { id: 3, name: "online", label: "Online payment" },
  ]);

  let history = useHistory();
  let dispatch = useDispatch();

  const Timer = (val) => {
    let timer = false;
    var timeron = moment() >= moment(val.date);
    const startDate = moment();
    const timeEnd = moment(val.to_date).local();
    const diff = timeEnd.diff(startDate);
    if (timeron && diff > 0) {
      timer = true;
    } else {
      timer = false;
    }
    return timer;
  };

  const attributeFun = (data) => {
    return data?.attribute?.filter((datas) => datas.id === data.aid);
  };

  const cartTotal = () => {
    return ShoppingCarts?.reduce(function (total, item) {
      return (
        total +
        Number(item.qty || 1) *
          (payType === "points"
            ? Number(
                item.aid
                  ? attributeFun(item)?.[0]?.point
                  : Timer(item)
                  ? item.deal_point
                  : item?.point
              )
            : item.aid
            ? attributeFun(item)?.[0]?.selling
            : Timer(item)
            ? item.deal_amount
            : item.discount_price)
      );
    }, 0);
  };
  const RedeemTotal = () => {
    return ShoppingCarts?.reduce(function (total, item) {
      return (
        total +
        Number(item.qty || 1) *
          Number(
            item.aid
              ? attributeFun(item)?.[0]?.point
              : Timer(item)
              ? item.deal_point
              : item?.point
          )
      );
    }, 0);
  };

  useEffect(() => {
    dispatch(Profile_Details);
    dispatch(RazorpayDetails());
    JSON.parse(localStorage.getItem("UserId")) && dispatch(RewardPoints());
    dispatch(Get_Address_List());
    dispatch(CartTotal());
    dispatch(GetLists("online_payment", "get"));
  }, []);

  const RemoveItems = () => {
    localStorage.removeItem("carts");
    dispatch({ type: "products/clearCart" });
  };

  const handleChange = (pay_id) => {
    setpayment_id(pay_id);
    setopen(true);
  };

  const Submit = () => {
    setshowmodal(false);
    if (Address_detail.length > 0 || BillingInformation) {
      if (value) {
        if (value === "online") {
          openPayModal();
        } else {
          setloading(true);
          setcheckadd(false);
          let product = [];
          ShoppingCarts.forEach((data) => {
            product.push({
              id: data.pid,
              attributeName: attributeFun(data)?.[0]?.name || "",
              attributeId: data.aid || "",
              price:
                paytype === "points"
                  ? Number(
                      data.aid
                        ? attributeFun(data)?.[0]?.point
                        : Timer(data)
                        ? data.deal_point
                        : data?.point
                    )
                  : data.aid
                  ? attributeFun(data)?.[0]?.selling
                  : Timer(data)
                  ? data.deal_amount
                  : data.discount_price,
              qty: data.qty,
              reward_point: data.point,
            });
          });
          dispatch(
            OrderPlaced_Create(
              product,
              BillingInformation,
              value,
              Cart_Total_Value,
              ShippingDetails?.[Math.abs(Number(cartTotal())) > 1000 ? 0 : 1]
                ?.id,
              Reward_Points,
              Reward || "",
              cartTotal(),
              Coupon
            )
          ).then((res) => {
            setloading(false);
            if (res?.payload?.status === 1) {
              RemoveItems();
              setpayment_id("");
              // dispatch(UserOrders());
              dispatch(CouponDetails(""));

              if (payType === "points") {
                dispatch(RedeemedHistory(Reward?.rewardpoint, RedeemTotal()));
              }
              Swal.fire({
                icon: "success",
                title: "Success!",
                text: res?.payload?.response,
                showConfirmButton: false,
                timer: 1500,
              });
              history.push("/order-complete");
            } else {
              Swal.fire({
                icon: "warning",
                title: "Failed!",
                text: "Payment Failed Please try again",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
        }
      } else {
        Swal.fire({
          icon: "warning",
          title: "Failed!",
          text: "Please choose payment mode",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "Failed!",
        text: "Please filled all mandatory fields",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  const Reward_Points = Reward?.rewardpoint ? RedeemTotal() : 0;
  const options = {
    key: Razorpay?.information?.key,
    amount: Math.abs(Number(Cart_Total_Value) * 100).toFixed(2), //  = INR 1
    name: "Vasantham",
    description: "Pay Money",
    image: logo,
    handler: function (response) {
      let product = [];
      ShoppingCarts.forEach((data) => {
        product.push({
          id: data.pid,
          attributeName: attributeFun(data)?.[0]?.name || "",
          attributeId: data.aid || "",
          price:
            paytype === "points"
              ? Number(
                  data.aid
                    ? attributeFun(data)?.[0]?.point
                    : Timer(data)
                    ? data.deal_point
                    : data?.point
                )
              : data.aid
              ? attributeFun(data)?.[0]?.selling
              : Timer(data)
              ? data.deal_amount
              : data.discount_price,
          qty: data.qty,
          reward_point: data.point,
        });
      });
      dispatch(
        OrderPlaced_Create(
          product,
          BillingInformation,
          value,
          Cart_Total_Value,
          ShippingDetails?.[Math.abs(Number(cartTotal())) > 1000 ? 0 : 1]?.id,
          Reward_Points,
          Reward || "",
          response,
          Coupon
        )
      ).then((res) => {
        if (res?.payload?.status === 1) {
          RemoveItems();
          setcheckadd(false);
          setpayment_id("");
          setloading(false);
          dispatch(UserOrders());
          dispatch(CouponDetails(""));
          if (payType === "points") {
            dispatch(RedeemedHistory(Reward?.rewardpoint, RedeemTotal()));
          }
          history.push("/order-complete");
        } else {
          Swal.fire({
            icon: "warning",
            title: "Failed!",
            text: "Payment Failed Please try again",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    },
    prefill: {
      name: ProfileDetail?.users?.first_name,
      contact: ProfileDetail?.users?.phone,
      email: ProfileDetail?.users?.email,
    },
    notes: {
      address: "address",
    },
    theme: {
      color: "#007a58",
      hide_topbar: false,
    },
  };

  const openPayModal = () => {
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      Swal.fire({
        icon: "failed",
        title: "Failed!",
        text: "Payment Failed Please try again",
        showConfirmButton: false,
        timer: 1500,
      });
    });
    rzp1.open();
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    localStorage.setItem("carts", JSON.stringify(ShoppingCarts));
  }, [ShoppingCarts]);

  const MiniumOrderCheckFun = async () => {
    let payload = {
      amount: cartTotalPrice(ShoppingCarts),
    };
    await axios({
      method: "post",
      url: apiurl + "minimumAmountOrder",
      data: payload,
    }).then((res) => {
      if (res?.data?.message === "Order placed successfully.") {
        setshowmodal(true);
      } else {
        Swal.fire({
          icon: "warning",
          title: res?.data?.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const PointCheckFun = () => {
    if (payType === "points") {
      if (Reward.rewardpoint > cartTotal()) {
        setshowmodal(true);
      } else {
        Swal.fire({
          icon: "warning",
          title: "Warning",
          text:
            Reward.rewardpoint > 0
              ? `You have only ${
                  Reward.rewardpoint || 0
                } reward points.       you purchase  ${
                  Reward.rewardpoint || 0
                } above`
              : "Your reward point is 0",
        });
      }
    } else {
      MiniumOrderCheckFun();
    }
  };

  const AddressCheckProceed = () => {
    if (Object.keys(BillingInformation && BillingInformation)?.length > 0) {
      if (BillingInformation?.pincode) {
        if (PincodeList.includes(BillingInformation?.pincode)) {
          PointCheckFun();
        } else {
          Swal.fire({
            icon: "warning",
            title: "warning!",
            text: "Delivery not available for your location",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else {
        PointCheckFun();
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "warning!",
        text: "Please provide billing address",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const paymentType = (data) => {
    setvalue(data);
    dispatch(PayTypeCashOrPoints(data === "online" ? "cash" : data));
  };
  useEffect(() => {
    if (Coupon?.Discount || RewardStatus?.reward === 0) {
      setPayments(Payments.splice(0, 1));
    }
  }, [Coupon, RewardStatus]);

  return (
    <>
      <div className="order_review bg-white">
        <div className="check-heading">
          <h3>Payment</h3>
        </div>

        <div className="payment_method">
          <div className="pt-2 pb-3">
            Total Order{" "}
            <b>
              {" "}
              {payType !== "points" ? <i class="fa fa-rupee"></i> : ""}{" "}
              {Cart_Total_Value}
            </b>
          </div>
          <form>
            <div className="accordion" id="accordionExample">
              {Payments.map((data, index) => {
                return (
                  <div className="payment_area_wrappers">
                    <div className="heading_payment" id={`headingOne${index}`}>
                      {PaymentCheck?.online_payment === 0 &&
                      data.name === "online" ? (
                        ""
                      ) : (
                        <div
                          data-toggle="collapse"
                          data-target={`#collapseOne${index}`}
                          class="accordion-collapse collapse show"
                          aria-labelledby={`headingOne${index}`}
                        >
                          <input
                            type="radio"
                            name="payment"
                            // id={`html${index}`}
                            value={value}
                            onChange={(e) => paymentType(data.name)}
                          />
                          <label
                            htmlFor={`html${index}`}
                            style={{ transform: "up" }}
                            onClick={(e) => paymentType(data.name)}
                          >
                            {data.label}{" "}
                          </label>
                        </div>
                      )}
                      {/* {index === 2 && (
                        <div class="collapse" id={`collapseOne${index}`}>
                          <div class="card card-body payment-meth">
                            <div>
                              <img src={razorimg} /> <label>Razorpay</label>
                            </div>
                            <div
                              onClick={() => history.push("/cashfree-payment")}
                            >
                              <img src={cashfree} /> <label>Cash free</label>
                            </div>
                          </div>
                        </div>
                      )} */}
                    </div>
                  </div>
                );
              })}
            </div>
          </form>
        </div>
        <button
          className="theme-btn-one btn-black-overlay btn_sm"
          onClick={AddressCheckProceed}
        >
          Place Order
        </button>
      </div>
      {/* <RazorpayPayment show={open} OrderPlace={handleChange} /> */}
      <Loading show={loading} />

      <ModalComp
        showmodal={showmodal}
        title={
          <div className="header_tit">
            <span>
              {!BillingInformation?.store_name
                ? "Delivery Address"
                : "Pickup Store Details"}
            </span>
          </div>
        }
        size={checkadd ? "md" : "lg"}
        handleClose={(key) => setshowmodal(key)}
      >
        <ConfirmPopup
          Submit={Submit}
          BillingInformation={BillingInformation}
          ConfirmInform={(key) => setcheckadd(key)}
          handleClose={(key) => setshowmodal(key)}
        />
      </ModalComp>
    </>
  );
};

export default Payment;
