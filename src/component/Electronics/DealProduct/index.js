import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import ProductCard from "../../Common/Product/ProductCard";
import { useSelector } from "react-redux";
import axios from "axios";
import { apiurl } from "../../../Redux/Utils/baseurl";
import { isMobile } from "react-device-detect";
import Heading from "../../Fashion/Heading";
import { colorSet, DealColors } from "../../../helpers/ListData";
import { useHistory } from "react-router-dom";
const DealProduct = () => {
  let products = useSelector((state) => state?.products?.products);
  products = products?.filter((item) => item?.category === "electronics");
  // const [slideNumber, setSlideNumber] = useState(3)
  const history = useHistory();
  const [viewall, setviewall] = useState(false);
  const [Products, setProducts] = useState([]);
  const [settings, setsettings] = useState({
    arrows: true,
    dots: false,
    margin: 30,
    infinite: false,
    autoplay: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    slide: "div",
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          arrows: true,
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
  });
  useEffect(() => {
    axios({
      method: "post",
      url: apiurl + "homeProduct",
      data: {
        type: "deal",
        user_id: JSON.parse(localStorage.getItem("UserId")),
      },
    }).then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <>
      {Products.length > 0 && (
        <section id="elce_weekly_deal" className="mb-2 today-deal">
          <div className="container">
            <div className="row todaydel-par">
              <div className="col-lg-12">
                <div className="left_heading_three text-center w-100 mt-1">
                  <Heading heading={"Today's Deals"} />
                  <div
                    className="viewall"
                    onClick={() => history.push(`/view-detail/deal`)}
                  >
                    View All
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              {viewall ? (
                <>
                  {Products?.map((data, index) => (
                    <div className={`col-lg-3 col-6 ${isMobile && "p-0"}`}>
                      <ProductCard
                        data={data}
                        key={index}
                        styles={"slider"}
                        deals={true}
                        customcss={"deals"}
                      />
                    </div>
                  ))}
                </>
              ) : (
                <div className={`col-lg-12 ${isMobile && "p-0"}`}>
                  <div className="elce_weekly_slider">
                    <Slider {...settings}>
                      {Products?.map((data, index) => (
                        <ProductCard
                          data={data}
                          key={index}
                          styles={"slider"}
                          deals={true}
                          customcss={"deals"}
                        />
                      ))}
                    </Slider>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default DealProduct;
