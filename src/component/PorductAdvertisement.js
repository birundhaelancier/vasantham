import React, { useState } from "react";
import { isMobile } from "react-device-detect";
import Carosal from "./Carosal";
import Ads from "../assets/img/advertise.png";
import Ads2 from "../assets/img/ads.png";
import { BannerImgs } from "../helpers/ListData";
import { ImageUrl } from "../Redux/Utils/baseurl";
export default function ProdcutAdvertisement({ ImageData }) {
  const [settings, setsettings] = useState({
    arrows: true,
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 2,
    fade: true,
    // slide: 'div',
    slidesToScroll: 1,
    swipeToSlide: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          arrows: false,
          swipeToSlide: true,
        },
      },
    ],
  });
  return (
    <div className={`container ${!isMobile ? "pl-0 pr-0" : "pl-3 pr-3"}`}>
      <Carosal
        customsettings={settings}
        content={ImageData?.map((data, index) => (
          <>
            <img src={ImageUrl + data} key={index} style={{ width: "100%" }} />
          </>
        ))}
      />
    </div>
  );
}
