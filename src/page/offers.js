import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../component/Common/Footer";
import Header from "../component/Common/Header";
import {
  Get_Single_Product_List,
  OffersLists,
} from "../Redux/Action/allActions";
import offer from "../assets/img/offer.png";
import product_img from "../assets/img/product_img.jpg";
import { useHistory, useParams } from "react-router-dom";
import { ImageUrl } from "../Redux/Utils/baseurl";
export default function Offers() {
  let Offerlists = useSelector((state) => state.AllReducer.Offerlists);
  const Reward = useSelector((state) => state.AllReducer.RewardPoints);
  const ProductDetails = useSelector((state) => state.AllReducer.SingleProduct);
  let dispatch = useDispatch();
  let history = useHistory();
  const [Fiterlists, setFiterlists] = useState([]);
  const [open, setopen] = useState([]);
  const [openId, setopenId] = useState("");
  let { id, productid } = useParams();
  useEffect(() => {
    dispatch(OffersLists(Reward?.rewardpoint));
  }, [Reward?.rewardpoint]);

  useEffect(() => {
    let array = [];
    Offerlists.filter((val) => {
      if (
        Reward?.rewardpoint >= Number(val.slab_details?.point_from) &&
        Reward?.rewardpoint <= Number(val.slab_details?.point_to)
      ) {
        array.push(val);
      }
    });
    setFiterlists(array);
  }, [Offerlists]);

  const MoreDetailsFun = (ids, index) => {
    setopen(!open);
    setopenId(index);
    dispatch(Get_Single_Product_List("product_info/", ids, productid));
  };

  return (
    <div>
      <Header />
      <div className="offer_div">
        <h5 className=" mb-3 pl-3">
          Special Offers Available({Fiterlists?.length || 0})
        </h5>
        {Fiterlists?.length > 0 ? (
          <div className="row">
            {Fiterlists?.map((data, index) => (
              <div className="col-md-4 col-12">
                <div
                  className="offers-child "
                  // onClick={() =>
                  //   history.push(
                  //     `/product-details-one/${Number(
                  //       data.slab_details?.discount
                  //     )}/offer`
                  //   )
                  // }
                >
                  <div>
                    {data.slab_details?.discount_type === "product" && (
                      <div
                        style={{
                          width:
                            data.slab_details?.discount_type === "product" &&
                            "0px",
                          height:
                            data.slab_details?.discount_type === "product" &&
                            "0px",
                        }}
                      >
                        {/* {data.slab_details?.discount_type === "product" ? (
                          <label>FREE OFF</label>
                        ) : (
                          <label>
                            Get {data.slab_details?.discount}{" "}
                            {data.slab_details?.discount_type === "product"
                              ? "₹"
                              : "%"}{" "}
                            OFF
                          </label>
                        )} */}
                      </div>
                    )}

                    <div className="inner-off">
                      <img
                        src={
                          data.slab_details?.discount_type === "product"
                            ? product_img
                            : offer
                        }
                        style={{
                          // width:
                          //   data.slab_details?.discount_type === "product" &&
                          //   "30px",
                          marginRight: "10px",
                        }}
                      />

                      <div className="ofs-div">
                        <label>
                          <b>{data.name}</b>
                        </label>
                        {data.slab_details?.discount_type !== "product" && (
                          <label>
                            <b>
                              Get{" "}
                              {data.slab_details?.discount_type === "product"
                                ? "₹"
                                : "%"}{" "}
                              {data.slab_details?.discount} off
                            </b>{" "}
                          </label>
                        )}

                        <label>
                          Use code <b>{data.name}</b> & get{" "}
                          {data.slab_details?.discount_type === "product"
                            ? "Free"
                            : "%"}{" "}
                          {data.slab_details?.discount_type !== "product" &&
                            data.slab_details?.discount}{" "}
                          off. Minimum order amount: ₹
                          {data.minimum_order_amount}.
                        </label>
                        <label>
                          Off Valid from {data.start_date} to {data.end_date}
                        </label>
                        {data.slab_details?.discount_type === "product" && (
                          <label
                            className="linktag"
                            onClick={() =>
                              MoreDetailsFun(data.slab_details?.discount, index)
                            }
                          >
                            <a>More Details</a>
                          </label>
                        )}
                        {openId === Number(index) && open && (
                          <div>
                            <div className="offpro-div">
                              <img src={ImageUrl + ProductDetails?.photo} />
                              <label>{ProductDetails?.name}</label>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              height: "200px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            No Offers Available
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
