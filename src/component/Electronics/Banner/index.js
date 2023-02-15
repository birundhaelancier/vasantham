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
import Carosal from "../../Carosal";
const Banner = (props) => {
  let dispatch = useDispatch();
  const [Sliderlist, setSliderlist] = useState([]);
  const [settings, setsettings] = useState({
    arrows: true,
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 1,
    fade: true,
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
          arrows: false,
        },
      },
    ],
  });

  useEffect(() => {
    axios({
      method: "get",
      url: apiurl + "slider",
    }).then((response) => {
      setSliderlist(response.data);
    });
  }, []);

  return (
    <section id="furniture_banner" className="banner_slide container p-0">
      {Sliderlist.length > 0 ? (
        <div>
          <Carosal
            customsettings={settings}
            customcss="banner-slider"
            autoplay={true}
            content={Sliderlist.map((data, index) => {
              return (
                <img
                  src={`${ImageUrl}${isMobile ? data?.mobile : data?.photo}`}
                  style={{
                    width: "100%",
                    height: "520px",
                  }}
                />
              );
            })}
          />
        </div>
      ) : (
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={isMobile ? 200 : 320}
        />
      )}
    </section>
  );
};

export default Banner;
