import React, { useEffect } from "react";
import Header from "../component/Common/Header";
import Banner from "../component/Electronics/Banner";
import TopPRoduct from "../component/Electronics/TotProduct";
import DealProduct from "../component/Electronics/DealProduct";
import InstgramSlider from "../component/Common/Instagram";
import Footer from "../component/Common/Footer";
import NewArrival from "../component/Common/ProductDetails/NewArrivals";
import CategoryComp from "../component/Common/Header/CategoryMobile";
import { useHistory } from "react-router-dom";
import { isMobile } from "react-device-detect";
import Advertisement from "../component/Advertisement";
import ProdcutAdvertisement from "../component/PorductAdvertisement";
import Advertisement2 from "../component/Advertisement2";

const Electronics = () => {
  let history = useHistory();
  return (
    <div style={{ background: "#f2f3f7" }}>
      <Header />
      {isMobile && <CategoryComp />}
      <Banner />
      <Advertisement />

      <DealProduct />
      {!isMobile && <CategoryComp />}

      <NewArrival />
      <div style={{ margin: !isMobile && "0px 30px" }}>
        <ProdcutAdvertisement />
      </div>
      <InstgramSlider />
      <TopPRoduct />
      <Advertisement2 />

      <Footer />
    </div>
  );
};

export default Electronics;
