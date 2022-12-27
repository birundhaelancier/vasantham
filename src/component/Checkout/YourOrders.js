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
  const [FilterData, setFilterData] = useState([]);
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
    return ShoppingCarts?.reduce(function (total, item) {
      return (
        total +
        Number(item.qty || 1) *
          Number(Timer(item.date) ? item.deal_point : item?.point)
      );
    }, 0);
  };

  const pointscartTotal = () => {
    return ShoppingCarts?.reduce(function (total, item) {
      return (
        total +
        Number(item.qty || 1) *
          Number(Timer(item.date) ? item.deal_point : item?.point)
      );
    }, 0);
  };

  useEffect(() => {
    dispatch(Get_Shipping());
    dispatch(RewardPoints());
  }, []);

  useEffect(() => {
    let Total = Math.round(
      Number(cartTotal()) - Number(Reward?.rewardpoint || 0)
    );
    if (Total > 1000) {
      setFilterData(ShippingDetails[0]);
    } else {
      setFilterData(ShippingDetails[1]);
    }
  }, [cartTotal(), ShippingDetails, Reward]);

  useEffect(() => {
    const Total = (
      Number(FilterData?.price) +
      Math.abs(Number(Coupon ? Coupon.Discount : Number(cartTotal())))
    ).toFixed(2);
    dispatch(CartTotal(Total));
  }, [FilterData, Coupon, Reward]);

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
                      {data.name}
                      <span className="product-qty">
                        {" "}
                        {Number(
                          Timer(data.date) ? data.deal_point : data?.point
                        )}{" "}
                        x {data.qty}
                      </span>
                    </td>
                    <td>
                      {Number(
                        Timer(data.date) ? data.deal_point : data?.point
                      ) * data.qty}
                    </td>
                  </tr>
                ))}
            </tbody>
            <tfoot>
              {/* {Coupon && <tr>
                                <th>Product Cost</th>
                                <td className="product-subtotal"  align="end"><i class="fa fa-rupee"></i> {Number(cartTotal() || 0)}</td>
                            </tr>} */}
              {/* <tr>
                                <th>SubTotal</th>
                                <td className="product-subtotal"  align="end"><i class="fa fa-rupee"></i> {Number(Coupon?Coupon.Discount:cartTotal() || 0).toFixed(2)}</td>
                            </tr>
                            <tr>
                                <th>Points</th>
                                <td>{(pointscartTotal() || 0).toFixed(2)}</td>
                            </tr>  */}

              {/* <tr>
                                <th>Delivery Charges</th>
                                <td><i class="fa fa-rupee"></i>  {FilterData?.price || 0}.00</td>
                            </tr>  */}

              <tr>
                <th>Grand Total</th>
                <td className="product-subtotal">
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
              {Coupon.Details[0]?.title} {Coupon?.Details[0]?.discount}{" "}
              {Coupon?.Details[0]?.type === "amount"
                ? "Rupees Amount"
                : "Percentage"}{" "}
              Discount
            </Alert>
          )}
        </div>
      </div>
    </>
  );
};

export default YourOrders;
