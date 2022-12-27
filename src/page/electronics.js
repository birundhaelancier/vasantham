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

const Electronics = () => {
  let history = useHistory();
  return (
    <>
      <Header />
      <CategoryComp />
      <Banner />
      <DealProduct />
      <NewArrival />
      <InstgramSlider />
      <TopPRoduct />
      <Footer />
    </>
  );
};

export default Electronics;
