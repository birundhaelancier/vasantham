import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ImageUrl } from "../../../Redux/Utils/baseurl";
import axios from "axios";
import { apiurl } from "../../../Redux/Utils/baseurl";
import Skeleton from "@mui/material/Skeleton";
import { isMobile } from "react-device-detect";
const Banner = (props) => {
  let dispatch = useDispatch();
  const [Sliderlist, setSliderlist] = useState([]);
  let settings = {
    arrows: false,
    dots: false,
    infinite: true,
    // autoplay: true,
    // autoplaySpeed:1000,
    speed: 1000,
    slidesToShow: 1,
    // slide: 'div',
    slidesToScroll: 1,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {
    axios({
      method: "get",
      url: apiurl + "slider",
    }).then((response) => {
      setSliderlist(response.data);
    });
  }, []);

  return (
    <section id="furniture_banner" className="banner_slide">
      <div
      // className="furniture_slider_box"
      >
        {Sliderlist.length > 0 ? (
          <Slider {...settings}>
            {Sliderlist.map((data, index) => {
              return (
                <div>
                  <div
                  // className="furniture_slider background_bg"
                  // style={{
                  //   backgroundImage: `url(${ImageUrl + data?.photo})`,
                  // }}
                  >
                    <div>
                      <div>
                        <img
                          src={`${ImageUrl}${
                            isMobile ? data?.mobile : data?.photo
                          }`}
                          style={{ width: "100%" }}
                          className="responsive"
                        />
                      </div>
                    </div>
                    {/* <div className="container">
                      <div className="row">
                        <div className="col-lg-9 col-md-9 col-sm-12 col-12">
                          <div className="furniture_slider_content">
                            <h2> {data.title}</h2>
                            <p>{data?.details}</p>
                            <a
                              className="theme-btn-one bg-black btn_sm"
                              onClick={() =>
                                window.open(data.link, isMobile ? "_self" : "")
                              }
                            >
                              Shop Now
                            </a>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              );
            })}
          </Slider>
        ) : (
          <Skeleton variant="rectangular" width={"100%"} height={350} />
        )}
      </div>
    </section>
  );
};

export default Banner;
