import React from "react";
import { Link } from "react-router-dom";
// import Img
import img from "../../assets/img/empty-cart.webp";

const EmptyCart = ({ Width }) => {
  return (
    <>
      <section id="empty_cart_area" className="pb-100 pt-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-12 col-12">
              <div className="empaty_cart_area">
                <img src={img} alt="img" style={{ width: "100%" }} />
                <h4 className="pb-3">
                  {Width ? "NO DATA FOUND " : "YOUR CART IS EMPTY"}
                </h4>
                {!Width && (
                  <h5>Sorry Mate... No Item Found Inside Your Cart!</h5>
                )}
                {!Width && (
                  <Link to="/shop" className="btn btn-black-overlay btn_md">
                    Continue Shopping
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EmptyCart;
