import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  CouponCode,
  Get_Shipping,
  PayTypeCashOrPoints,
  RewardPoints,
} from "../../Redux/Action/allActions";
import Alert from "@mui/material/Alert";
import Swal from "sweetalert2";
import moment from "moment";
import { Radio } from "antd";
import ModalComp from "../../helpers/Modal";
const TotalCart = (props) => {
  // const carts=useSelector(state=>state.StoreProuct.ShoopingCarts)
  const ShippingDetails = useSelector((state) => state.AllReducer.Shipping);
  const carts = useSelector((state) => state.AllReducer.CartLists);
  const Reward = useSelector((state) => state.AllReducer.RewardPoints);
  const Coupon = useSelector((state) => state.AllReducer.Coupon);
  const [paytype, setpaytype] = useState(false);
  const payType = useSelector((state) => state.AllReducer.payType);
  const [FilterData, setFilterData] = useState([]);
  let history = useHistory();
  const dispatch = useDispatch();
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
    return carts?.reduce(function (total, item) {
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

  const cartTotalPrice = () => {
    return carts?.reduce(function (total, item) {
      return (
        total +
        Number(item.qty || 1) *
          (item.aid
            ? attributeFun(item)?.[0]?.selling
            : Timer(item)
            ? item.deal_amount
            : item.discount_price)
      );
    }, 0);
  };

  const PayTypefun = () => {
    setpaytype(false);
    // if (payType === "points") {
    //   if (Reward.rewardpoint > cartTotal()) {
    //     history.push("/checkout");
    //   } else {
    //     Swal.fire({
    //       icon: "warning",
    //       title: "Warning",
    //       text:
    //         Reward.rewardpoint > 0
    //           ? `You have only ${
    //               Reward.rewardpoint || 0
    //             } reward points.       you purchase  ${
    //               Reward.rewardpoint || 0
    //             } above`
    //           : "Your reward point is 0",
    //     });
    //   }
    // } else {
    history.push("/checkout");
    // }
  };

  const ProceedCheckout = () => {
    if (!JSON.parse(localStorage.getItem("UserId"))) {
      history.push("/login/cart");
    } else {
      PayTypefun();
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

  const PayType = (val) => {
    dispatch(PayTypeCashOrPoints(val));
  };

  return (
    <>
      <div className="col-lg-6 col-md-6 col-12">
        <div className="coupon_code right">
          <h3>Cart Total</h3>
          <div className="coupon_inner">
            <div className="cart_subtotal">
              <p>{`Total ${"points"}`}</p>
              <p className="cart_amount">
                {" "}
                {Number(cartTotal() || 0).toFixed(2)}
              </p>
            </div>
            <div className="cart_subtotal">
              <p>{`${
                Number(Coupon?.Details?.discount)
                  ? "Product cost"
                  : "Total price"
              }`}</p>
              <p className="cart_amount">
                <i class="fa fa-inr" />
                {Number(cartTotalPrice() || 0).toFixed(2)}
              </p>
            </div>

            {Coupon?.Discount && (
              <>
                <div className="cart_subtotal">
                  <p>Coupon</p>
                  <p className="cart_amount">
                    {" "}
                    {Number(Coupon?.Details?.discount).toFixed(2)}
                  </p>
                </div>
                <div className="cart_subtotal">
                  <p>Total price</p>
                  <p className="cart_amount">
                    <i class="fa fa-inr" />
                    {Number(Coupon?.Discount)?.toFixed(2)}
                  </p>
                </div>
              </>
            )}

            {Coupon && (
              <Alert
                variant="filled"
                severity="success"
                style={{ margin: "20px 0px" }}
              >
                {Coupon.Details?.title} {Number(Coupon?.Details?.discount)}{" "}
                {Coupon?.Details?.type == "amount"
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
      <ModalComp
        showmodal={paytype}
        title={
          <div className="header_tit">
            <span>Do you want continue with points value?</span>
          </div>
        }
        size={"xs"}
        handleClose={(key) => setpaytype(key)}
      >
        <div className="m-4">
          <div>
            <Radio
              checked={payType === "points" ? true : false}
              onChange={() => PayType("points")}
            >
              {" "}
              Points
            </Radio>
          </div>
          <div>
            <Radio
              checked={payType === "cash" ? true : false}
              onChange={() => PayType("cash")}
            >
              {" "}
              Cash
            </Radio>
          </div>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
            onClick={() => {
              setpaytype(false);
              PayType("cash");
              history.push("/checkout");
            }}
          >
            No
          </button>
          <button
            type="button"
            class="btn btn-primary"
            onClick={() => {
              PayTypefun();
            }}
          >
            {"Yes"}
          </button>
        </div>
      </ModalComp>
    </>
  );
};

export default TotalCart;
