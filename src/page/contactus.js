import React from "react";
import Header from "../component/Common/Header";
import Footer from "../component/Common/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ImageUrl } from "../Redux/Utils/baseurl";
import { useEffect } from "react";
import { BranchListsApi, Contact_Us } from "../Redux/Action/allActions";
const ContactUs = () => {
  let dispatch = useDispatch();
  const ContactDet = useSelector((state) => state.AllReducer.Branchlists);

  useEffect(() => {
    dispatch(BranchListsApi());
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <h4 className="pt-3 pb-4 text-center">Contact Us</h4>
        <div className="row">
          {ContactDet?.map((item) => {
            return (
              <div className="contact_div">
                <label>{item.branch}</label>
                <label>
                  <i class="fa fa-map-marker" aria-hidden="true"></i>{" "}
                  {item.address}
                </label>
                <label>
                  <i class="fa fa-phone" aria-hidden="true"></i>{" "}
                  <a href={`tel:${item.phone}`}>
                    <tel>{item.phone}</tel>
                  </a>
                </label>
              </div>
            );
          })}
          <div className="contact_div">
            <div>Other</div>
            <label>
              <i class="fa fa-phone" aria-hidden="true"></i> Diwali Surprize :{" "}
              <a href={`tel:${"9047183288"}`}>
                <tel>{"9047183288"}</tel>
              </a>
            </label>
            <label>
              <i class="fa fa-phone" aria-hidden="true"></i> Free Home Delivery
              :{" "}
              <a href={`tel:${"7418134999"}`}>
                <tel>{"7418134999"}</tel>
              </a>
            </label>
            <label>
              <i class="fa fa-phone" aria-hidden="true"></i> Customer Care :{" "}
              <a href={`tel:${"6381594409"}`}>
                <tel>{"6381594409"}</tel>
              </a>
            </label>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
