import Alert from "@mui/material/Alert";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CartTotal,
  CouponDetails,
  Get_Shipping,
  RewardPoints,
} from "../../Redux/Action/allActions";
import moment from "moment";
const YourOrders = () => {
  const ShoppingCarts = useSelector((state) => state.AllReducer.CartLists);
  const ShippingDetails = useSelector((state) => state.AllReducer.Shipping);
  const Reward = useSelector((state) => state.AllReducer.RewardPoints);
  const Coupon = useSelector((state) => state.AllReducer.Coupon);
  const payType = useSelector((state) => state.AllReducer.payType);
  const BillingInformation = useSelector(
    (state) => state.AllReducer.BillingInformation || {}
  );
  const [FilterData, setFilterData] = useState([]);
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

  const attributeFun = (data) => {
    return data?.attribute?.filter((datas) => datas.id === data.aid);
  };

  const cartTotalDiscount = () => {
    return ShoppingCarts?.reduce(function (total, item) {
      return (
        total +
        (item.aid
          ? attributeFun(item)?.[0]?.selling
          : Timer(item)
          ? item.deal_amount
          : item.discount_price)
      );
    }, 0);
  };

  useEffect(() => {
    dispatch(Get_Shipping());
    dispatch(RewardPoints());
  }, []);

  useEffect(() => {
    let Total = Math.round(Number(cartTotal()));
    if (payType !== "points" && !BillingInformation?.store_name) {
      if (Total > 1000) {
        setFilterData(ShippingDetails[0]);
      } else {
        setFilterData(ShippingDetails[1]);
      }
    } else {
      setFilterData("");
    }
  }, [cartTotal(), ShippingDetails, Reward, payType, BillingInformation]);

  useEffect(() => {
    const Total = Math.abs(
      Number(FilterData?.price || 0) +
        Number(Coupon ? Coupon.Discount : Number(cartTotal()))
    ).toFixed(2);
    dispatch(CartTotal(Total));
  }, [FilterData, Coupon, Reward, payType]);

  return (
    <>
      <div className="order_review  box-shadow bg-white">
        <div className="check-heading">
          <h3>Your Orders</h3>
        </div>
        <div className="table-responsive order_table">
          <table className="table">
            <thead>
              <tr>
                <th width="70%">Product</th>
                <th width="30%">Total</th>
              </tr>{" "}
            </thead>
            <tbody>
              {ShoppingCarts.length > 0 &&
                ShoppingCarts.map((data) => (
                  <tr>
                    <td>
                      {data.name} -
                      <span className="product-qty">
                        {" "}
                        {payType !== "points" ? (
                          <i class="fa fa-rupee"></i>
                        ) : (
                          ""
                        )}{" "}
                        {payType === "points"
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
                          : data.discount_price}
                        x {data.qty}
                      </span>
                    </td>
                    <td>
                      {payType !== "points" ? <i class="fa fa-rupee"></i> : ""}{" "}
                      {(payType === "points"
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
                        : data.discount_price) * data.qty}
                    </td>
                  </tr>
                ))}
            </tbody>
            <tfoot>
              {Coupon && (
                <tr>
                  <th>Product Cost</th>
                  <td className="product-subtotal" align="end">
                    {payType !== "points" ? <i class="fa fa-rupee"></i> : ""}{" "}
                    {Number(cartTotal() || 0)}
                  </td>
                </tr>
              )}
              <tr>
                <th>SubTotal</th>
                <td className="product-subtotal" align="end">
                  {payType !== "points" ? <i class="fa fa-rupee"></i> : ""}{" "}
                  {Number(Coupon ? Coupon.Discount : cartTotal() || 0).toFixed(
                    2
                  )}
                </td>
              </tr>
              {/* <tr>
                <th>Points</th>
                <td>{(pointscartTotal() || 0).toFixed(2)}</td>
              </tr> */}

              {payType !== "points" && !BillingInformation?.store_name && (
                <tr>
                  <th>Delivery Charges</th>
                  <td>
                    {payType != "points" && <i class="fa fa-rupee"></i>}{" "}
                    {FilterData?.price || 0}.00
                  </td>
                </tr>
              )}

              <tr>
                <th>Grand Total</th>
                <td className="product-subtotal">
                  {payType !== "points" ? <i class="fa fa-rupee"></i> : ""}{" "}
                  {(
                    Number(FilterData?.price || 0) +
                    Math.abs(
                      Number(Coupon ? Coupon.Discount : Number(cartTotal()))
                    )
                  ).toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>

          {Coupon && (
            <Alert
              variant="filled"
              severity="success"
              style={{ marginTop: "20px" }}
            >
              {Coupon.title} {Coupon?.discount}{" "}
              {Coupon?.type === "amount" ? "Rupees Amount" : "Percentage"}{" "}
              Discount
            </Alert>
          )}
        </div>
      </div>
    </>
  );
};

export default YourOrders;
