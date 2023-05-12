import React, { useEffect, useState } from "react";
import ProdcutAdvertisement from "../component/PorductAdvertisement";
import Header from "../component/Common/Header";
import Footer from "../component/Common/Footer";
import { useDispatch, useSelector } from "react-redux";
import { GetLists } from "../Redux/Action/allActions";
import { FestivalUrl } from "../Redux/Utils/baseurl";
import ProductCard from "../component/Common/Product/ProductCard";
import fes8 from "../assets/fes8.jpg";

import fes4 from "../assets/fes4.jpg";
import fes5 from "../assets/fes5.jpg";
import fes6 from "../assets/fes6.jpg";
import { isMobile } from "react-device-detect";
export default function Festival() {
  const GetListData = useSelector((state) => state.AllReducer.GetListData);
  let dispatch = useDispatch();
  useEffect(() => {
    let payload = {
      festival_id: 3,
    };
    dispatch(GetLists("festivalList", "post", payload));
  }, []);
  const [settings, setsettings] = useState({
    arrows: true,
    dots: false,
    infinite: false,
    autoplay: false,
    speed: 500,
    autoplaySpeed: 3000,
    swipeToSlide: false,
    // fade: true,
    slidesToShow: 3,
    slidesToScroll: 3,

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

  return (
    <>
      <Header />
      <div className="container">
        <div>
          {GetListData?.bannerImage?.slice(0, 2)?.map((data, index) => (
            <div>
              <img src={FestivalUrl + data?.image1} style={{ width: "100%" }} />
              <img src={FestivalUrl + data?.image2} style={{ width: "100%" }} />
            </div>
          ))}
        </div>
        {/* <TopPRoduct /> */}{" "}
        <div>
          <div className="title_off">{GetListData?.festival?.festivalname}</div>
          <div className="row mb-2">
            <div className="col-md-6">
              <div className="row">
                {GetListData?.datas?.length > 0 &&
                  GetListData?.datas?.slice(0, 3).map((data, index) => (
                    <div className={"col-md-4 col-6 p-2"}>
                      <ProductCard
                        data={data}
                        customcss={"feature-product"}
                        key={index}
                      />
                    </div>
                  ))}
              </div>
            </div>

            <div className="col-md-6">
              <div>
                <img
                  src={FestivalUrl + GetListData?.bannerImage?.[2]?.image1}
                  style={{ width: "100%", height: "365px" }}
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="row">
                {GetListData?.datas?.length > 0 &&
                  GetListData?.datas?.slice(4, 10).map((data, index) => (
                    <div className={"col-md-2 col-6 p-2"}>
                      <ProductCard
                        data={data}
                        customcss={"feature-product"}
                        key={index}
                      />
                    </div>
                  ))}
              </div>
            </div>
            {/*  */}

            <div className={`col-md-12 ${isMobile ? "p-0" : "pl-4 pr-4"}`}>
              <ProdcutAdvertisement
                content={[
                  GetListData?.bannerImage?.[3]?.image1,
                  GetListData?.bannerImage?.[3]?.image2,
                ]?.map((data, index) => (
                  <>
                    <img
                      src={FestivalUrl + data}
                      key={index}
                      style={{ width: "100%", height: "260px" }}
                    />
                  </>
                ))}
              />
            </div>
            {/*  */}
          </div>
        </div>
        {/*  */}
        <div>
          {/* <div className="title_off">{GetListData?.festival?.festivalname}</div> */}
          <div className="row mb-2">
            <div className="col-md-6">
              <div>
                <img
                  src={FestivalUrl + GetListData?.bannerImage?.[2]?.image2}
                  style={{ width: "100%", height: "365px" }}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="row">
                {GetListData?.datas?.length > 0 &&
                  GetListData?.datas
                    ?.slice(0, isMobile ? 4 : 3)
                    .map((data, index) => (
                      <div className={"col-md-4 col-6 p-2"}>
                        <ProductCard
                          data={data}
                          customcss={"feature-product"}
                          key={index}
                        />
                      </div>
                    ))}
              </div>
            </div>

            <div className="col-md-12">
              <div className="row">
                {GetListData?.datas?.length > 0 &&
                  GetListData?.datas
                    ?.slice(isMobile ? 5 : 4, 10)
                    .map((data, index) => (
                      <div className={"col-md-2 col-6 p-2"}>
                        <ProductCard
                          data={data}
                          customcss={"feature-product"}
                          key={index}
                        />
                      </div>
                    ))}
              </div>
            </div>
            <div className={`col-md-12 ${isMobile ? "p-0" : "pl-4 pr-4"}`}>
              <ProdcutAdvertisement
                content={[
                  GetListData?.bannerImage?.[4]?.image1,
                  GetListData?.bannerImage?.[4]?.image2,
                ]?.map((data, index) => (
                  <>
                    <img
                      src={FestivalUrl + data}
                      key={index}
                      style={{ width: "100%", height: "260px" }}
                    />
                  </>
                ))}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
