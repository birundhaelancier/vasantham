import React, { useEffect } from "react";
import Header from "../component/Common/Header";
import Banner from "../component/Electronics/Banner";
import TopPRoduct from "../component/Electronics/TotProduct";
import DealProduct from "../component/Electronics/DealProduct";
import Footer from "../component/Common/Footer";
import NewArrival from "../component/Common/ProductDetails/NewArrivals";
import CategoryComp from "../component/Common/Header/CategoryMobile";
import { isMobile } from "react-device-detect";
import Advertisement from "../component/Advertisement";
import ProdcutAdvertisement from "../component/PorductAdvertisement";
import Advertisement2 from "../component/Advertisement2";
import { useDispatch, useSelector } from "react-redux";
import { AdvertisementDetails } from "../Redux/Action/allActions";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress } from "@mui/material";
import { useState } from "react";
import CategoryProduct from "./CategoryProduct";
import { ImageUrl } from "../Redux/Utils/baseurl";

const Electronics = () => {
  const Advertise = useSelector((state) => state.AllReducer.Advertisement);
  const LoadingType = useSelector((state) => state.AllReducer.LoadingType);
  let dispatch = useDispatch();
  const [countscroll, setcountscroll] = useState(1);
  const [pagescroll, setpagescroll] = useState(1);
  useEffect(() => {
    dispatch(AdvertisementDetails());
  }, []);
  const fetchMoreData = () => {
    if (countscroll < 2) {
      setTimeout(() => {
        setcountscroll(countscroll + 1);
        setpagescroll(countscroll + 1);
      }, 1000);
    }
  };

  return (
    <div style={{ background: "#f2f3f7" }} className="homepage-cont">
      <Header />

      <InfiniteScroll
        dataLength={pagescroll}
        next={fetchMoreData}
        scrollableTarget="scrollableDiv"
        hasMore={countscroll < 2}
        style={{ overflow: "inherit" }}
        loader={
          <div className="spinner text-center mt-2 mb-2" id="#scrollableDiv">
            <CircularProgress color="success" />
          </div>
        }
      >
        {isMobile && <CategoryComp />}
        <Banner />
        <Advertisement />

        <DealProduct />
        {!isMobile && <CategoryComp />}

        <NewArrival />
        <div style={{ margin: !isMobile && "0px 30px" }}>
          <ProdcutAdvertisement
            ImageData={[Advertise?.[0]?.image1, Advertise?.[0]?.image2]}
            content={[Advertise?.[0]?.image1, Advertise?.[0]?.image2]?.map(
              (data, index) => (
                <>
                  <img
                    src={ImageUrl + data}
                    key={index}
                    style={{ width: "100%" }}
                  />
                </>
              )
            )}
          />
        </div>
        {countscroll > 1 && (
          <>
            <TopPRoduct />
            {LoadingType === "category" && <CategoryProduct />}
            <Advertisement2 />
          </>
        )}
      </InfiniteScroll>
      <Footer />
    </div>
  );
};

export default Electronics;
