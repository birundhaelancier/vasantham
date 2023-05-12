import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import {
  CouponCode,
  CouponDetails,
  PayTypeCashOrPoints,
} from "../../Redux/Action/allActions";
import moment from "moment";
const Coupon = () => {
  const carts = useSelector((state) => state.AllReducer.CartLists);
  const Coupon = useSelector((state) => state.AllReducer.coupon_code);
  const Couponss = useSelector((state) => state.AllReducer.Coupon);
  const Reward = useSelector((state) => state.AllReducer.RewardPoints);
  const payType = useSelector((state) => state.AllReducer.payType);
  const [coupon, setcoupon] = useState("");
  let dispatch = useDispatch();

  const attributeFun = (data) => {
    return data?.attribute?.filter((datas) => datas.id === data.aid);
  };

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

  const PointsTotal = () => {
    return carts?.reduce(function (total, item) {
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

  const CheckValdeCoupon = () => {
    dispatch(CouponDetails(""));
    let Total = Math.round(Number(cartTotalPrice()));
    let DiscountAmt = 0;

    let payload = {
      code: coupon,
      uid: JSON.parse(localStorage.getItem("UserId")),
      amount: cartTotalPrice(),
      user_point: PointsTotal(),
    };
    dispatch(CouponCode(payload)).then((data) => {
      const code = data?.payload?.response || data?.payload?.[0];
      if (data?.payload?.status === 0 || data?.payload === "") {
        Swal.fire({
          icon: "warning",
          title: data?.payload?.message || "Promocode Invalid",
          showConfirmButton: false,
          timer: 1500,
        });
        setcoupon("");
      } else {
        Swal.fire({
          icon: "success",
          title:
            data?.payload?.length > 0
              ? "Promocode valid"
              : data?.payload?.message,
          showConfirmButton: false,
          timer: 1500,
        });
        setcoupon("");
        dispatch(PayTypeCashOrPoints("cash"));
        if (code?.slab_details?.discount_type !== "product")
          if (code?.type || code?.slab_details?.discount_type === "amount") {
            DiscountAmt = Math.abs(
              Number(Total) -
                Number(code?.discount || Number(code?.slab_details?.discount))
            );
          } else {
            let calculate =
              Number(code?.discount || Number(code?.slab_details?.discount)) /
              100;
            DiscountAmt = Total - Total * calculate;
          }
        let Coupons = {
          Discount: DiscountAmt,
          Details: code,
          type: code?.slab_details?.discount_type
            ? code?.slab_details?.discount_type
            : code?.type,
          title: code?.name || code?.title,
          discount: code?.discount || Number(code?.slab_details?.discount),
          id: code?.id,
          offer_type: code?.types,
        };
        DiscountAmt && dispatch(CouponDetails(Coupons));
      }
    });
  };

  return (
    <>
      <div className="col-lg-6 col-md-6">
        <div className="coupon_code left">
          <h3>Coupon</h3>
          <div className="coupon_inner">
            <p>Enter your coupon code if you have one.</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                CheckValdeCoupon();
              }}
            >
              <input
                className="mb-2"
                placeholder="Coupon code"
                value={coupon}
                onChange={(e) => setcoupon(e.target.value)}
                type="text"
                required
              />
              <button
                type="submit"
                className="theme-btn-one btn-black-overlay btn_sm"
              >
                Apply coupon
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Coupon;
