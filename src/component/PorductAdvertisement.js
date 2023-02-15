import React, { useState } from "react";
import { isMobile } from "react-device-detect";
import Carosal from "./Carosal";
import Ads from "../assets/img/advertise.png";
import Ads2 from "../assets/img/ads.png";
import { BannerImgs } from "../helpers/ListData";
export default function ProdcutAdvertisement() {
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
    swipeToSlide: true,
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
  const Urs = [Ads, Ads2];
  return (
    <div className={`container ${!isMobile && "pl-0 pr-0"}`}>
      <Carosal
        customsettings={settings}
        content={BannerImgs.map((data, index) => (
          <>
            <img
              src={data}
              key={index}
              style={{ width: "100%", height: "200px" }}
            />
          </>
        ))}
      />
    </div>
  );
}
