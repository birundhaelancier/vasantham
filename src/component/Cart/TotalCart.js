import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  CouponCode,
  Get_Shipping,
  RewardPoints,
} from "../../Redux/Action/allActions";
import Alert from "@mui/material/Alert";
import Swal from "sweetalert2";
import moment from "moment";
const TotalCart = (props) => {
  // const carts=useSelector(state=>state.StoreProuct.ShoopingCarts)
  const ShippingDetails = useSelector((state) => state.AllReducer.Shipping);
  const carts = useSelector((state) => state.AllReducer.CartLists);
  const Reward = useSelector((state) => state.AllReducer.RewardPoints);
  const Coupon = useSelector((state) => state.AllReducer.Coupon);
  const [FilterData, setFilterData] = useState([]);
  let history = useHistory();
  const dispatch = useDispatch();
  const Timer = (val) => {
    let timer = false;
    const startDate = moment();
    const timeEnd = moment(val).local();
    const diff = timeEnd.diff(startDate);
    if (diff > 0) {
      timer = true;
    } else {
      timer = false;
    }
    return timer;
  };
  const cartTotal = () => {
    return carts?.reduce(function (total, item) {
      return (
        total +
        Number(item.qty || 1) *
          Number(Timer(item.date) ? item.deal_point : item.point)
      );
    }, 0);
  };

  const Discount_price = () => {
    return carts?.reduce(function (total, item) {
      return (
        total +
        Number(item.qty || 1) *
          Number(Timer(item.date) ? item.deal_point : item.point)
      );
    }, 0);
  };

  const ProceedCheckout = () => {
    if (!JSON.parse(localStorage.getItem("UserId"))) {
      history.push("/login/cart");
    } else {
      if (Reward.rewardpoint > Discount_price()) {
        history.push("/checkout-one");
      } else {
        Swal.fire({
          icon: "warning",
          title: "Warning",
          text: `You have only ${Reward.rewardpoint} reward points.       you purchase  ${Reward.rewardpoint} above`,
          // showConfirmButton: false,
          // timer: 2000
        });
      }
    }
  };

  useEffect(() => {
    dispatch(Get_Shipping());
    dispatch(CouponCode());
    JSON.parse(localStorage.getItem("UserId")) && dispatch(RewardPoints());
  }, []);
  useEffect(() => {
    let Total = cartTotal();
    if (Total > 1000) {
      setFilterData(ShippingDetails[0]);
    } else {
      setFilterData(ShippingDetails[1]);
    }
  }, [cartTotal(), ShippingDetails]);
  return (
    <>
      <div className="col-lg-6 col-md-6 col-12">
        <div className="coupon_code right">
          <h3>Cart Total</h3>
          <div className="coupon_inner">
            <div className="cart_subtotal">
              <p>Subtotal</p>
              <p className="cart_amount">
                {" "}
                {Number(Coupon ? Coupon.Discount : cartTotal() || 0).toFixed(2)}
              </p>
            </div>

            {Coupon && (
              <Alert
                variant="filled"
                severity="success"
                style={{ margin: "20px 0px" }}
              >
                {Coupon.Details[0]?.title}{" "}
                {Number(Coupon?.Details[0]?.discount)}{" "}
                {Coupon?.Details[0]?.type == "amount"
                  ? "Rupees Amount"
                  : "Percentage"}{" "}
                Discount
              </Alert>
            )}
            <div className="checkout_btn">
              <Link
                onClick={ProceedCheckout}
                className="theme-btn-one btn-black-overlay btn_sm"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalCart;
