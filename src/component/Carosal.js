import React, { Component, useState } from "react";
import { useEffect } from "react";
import Slider from "react-slick";
export default function Carosal(props) {
  const [settings, setsettings] = useState({
    arrows: true,
    dots: false,
    infinite: true,
    autoplay: false,
    speed: 500,
    autoplaySpeed: 3000,
    swipeToSlide: false,
    // fade: true,
    slidesToShow: 6,
    slidesToScroll: 6,

    // rows: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          arrows: false,
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
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
          swipeToSlide: true,
          swipe: true,
          touchMove: true,
        },
      },
    ],
  });

  useEffect(() => {
    props.customsettings && setsettings(props.customsettings);
  }, [props.customsettings]);
  return (
    <div className={`slider-customcss ${props.customcss}`}>
      <Slider {...settings}>{props.content}</Slider>
    </div>
  );
}
