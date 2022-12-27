import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { CartListApi } from "../../Redux/Action/allActions";
import BillingsInfo from "./BillingsInfo";
import Payment from "./Payment";
import YourOrders from "./YourOrders";
const Checkout = () => {
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(CartListApi());
  }, []);

  return (
    <>
      <section id="checkout_one" className="pt-4 pb-4">
        <div className="container">
          <div className="row">
            <BillingsInfo />
            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
              <YourOrders />
              <Payment />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;
