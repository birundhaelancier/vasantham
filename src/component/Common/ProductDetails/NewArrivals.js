import React, { useEffect } from "react";
import Heading from "../../Fashion/Heading";
import { Get_HomeProduct_List } from "../../../Redux/Action/allActions";
import { useDispatch, useSelector } from "react-redux";
import ProductCards from "../Product/ProductCard";
import { Skeleton } from "@mui/material";
import axios from "axios";
import ProductCardOne from "../Product/ProductCardOne";
import Carosal from "../../Carosal";
import Slider from "react-slick";
import ProductCard from "../Product/ProductCard";
const RelatedProducts = (props) => {
  let dispatch = useDispatch();
  const ArrivalList = useSelector((state) => state.AllReducer.Products);
  useEffect(() => {
    dispatch(Get_HomeProduct_List("new"));
  }, []);
  let settings = {
    arrows: true,
    dots: true,
    infinite: false,
    autoplay: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 4,
  };

  return (
    <>
      <section id="product_variation_one" className="pt-4 sort_list container">
        <div className="container-fluid">
          <Heading heading="New Arrivals" />
          {ArrivalList?.length > 0 ? (
            <div>
              <Carosal
                content={ArrivalList?.slice(0, 12).map((data, index) => {
                  return (
                    <div key={index} className={"p-2"}>
                      <ProductCard
                        data={data}
                        customcss={"newarrival"}
                        key={index}
                      />
                    </div>
                  );
                })}
              />
            </div>
          ) : (
            <div className="row pt-4">
              {[...Array(6)].map(() => {
                return (
                  <div className="col-lg-2 col-md-6 col-sm-6 col-xs-6 col-6">
                    <Skeleton variant="rectangular" height={200} />
                    <Skeleton
                      animation="wave"
                      height={15}
                      style={{ marginTop: 8 }}
                    />
                    <div
                      style={{
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Skeleton
                        animation="wave"
                        height={15}
                        width="80%"
                        style={{ marginTop: 8, textAlign: "center" }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default RelatedProducts;
