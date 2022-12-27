import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ProductCard from "../../Common/Product/ProductCard";
import { useSelector } from "react-redux";
import axios from "axios";
import { apiurl } from "../../../Redux/Utils/baseurl";
import { isMobile } from "react-device-detect";
const DealProduct = () => {
  let products = useSelector((state) => state?.products?.products);
  products = products?.filter((item) => item?.category === "electronics");
  // const [slideNumber, setSlideNumber] = useState(3)
  let settings = {
    arrows: false,
    dots: false,
    margin: 30,
    infinite: false,
    autoplay: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  const [Products, setProducts] = useState([]);
  useEffect(() => {
    axios({
      method: "post",
      url: apiurl + "homeProduct",
      data: { type: "deal" },
    }).then((response) => {
      setProducts(response.data);
    });
  }, []);
  return (
    <>
      {Products.length > 0 && (
        <section id="elce_weekly_deal" className="mb-2">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="left_heading_three text-center w-100">
                  <h2
                    className={`text-center w-100 pb-2 pt-4 ${
                      isMobile ? "h4" : "h2"
                    }`}
                  >
                    Today's Deals
                  </h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className={`col-lg-12 ${isMobile && "p-0"}`}>
                <div className="elce_weekly_slider">
                  <Slider {...settings}>
                    {Products?.map((data, index) => (
                      <ProductCard data={data} key={index} styles={"slider"} />
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default DealProduct;
