import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiurl, ImageUrl } from "../../../Redux/Utils/baseurl";
import Heading from "../../Heading";
import ProductCard from "../../Common/Product/ProductCard";
import {
  AdvertisementDetails,
  Get_HotProducts_List,
} from "../../../Redux/Action/allActions";
import Carosal from "../../Carosal";
import ProductCardOne from "../../Common/Product/ProductCardOne";
import { colorSet } from "../../../helpers/ListData";
import ProdcutAdvertisement from "../../PorductAdvertisement";
const TopPRoduct = () => {
  let dispatch = useDispatch();
  const Advertisement = useSelector((state) => state.AllReducer.Advertisement);
  const ProductsData = useSelector((state) => state.AllReducer.HotProducts);

  useEffect(() => {
    dispatch(Get_HotProducts_List());
    dispatch(AdvertisementDetails());
  }, []);

  const FilterDataFun = (value) => {
    // note;top=0,best=1,feature=2
    switch (value) {
      case 0:
        return 5;
      case 1:
        return 1;
      case 2:
        return 2;
      default:
        return "";
    }
  };
  const HeaderFun = (value) => {
    switch (value) {
      case 0:
        return "Top Products";
      case 1:
        return "Best Products";
      case 2:
        return "Featured Products";
      default:
        return "";
    }
  };

  const Types = [1, 2, 0];

  return (
    <>
      <section
        id="electronics_top_product"
        className="pb-30 products container"
      >
        {" "}
        <section
          id="electronics_top_product"
          className="pb-30 products container"
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12 p-0">
                <div className="tabs_el_wrapper">
                  <div className="tab-content">
                    <div className="tab-pane fade show in active">
                      <div className="lists_product">
                        {ProductsData?.length > 0 &&
                          ProductsData?.map((datas, dd) => (
                            <>
                              {/* hheader */}
                              <div className="col-lg-12">
                                <div className="left_heading_three">
                                  <Heading
                                    heading={HeaderFun(dd)}
                                    para="Mauris luctus nisi sapien tristique dignissim"
                                  />
                                </div>
                              </div>
                              {/* header end */}
                              {Types.includes(dd) ? (
                                <div
                                  className="col-lg-12"
                                  style={{
                                    background: dd == 0 && "#fff",
                                    padding: dd == 0 && "5px",
                                  }}
                                >
                                  <Carosal
                                    content={ProductsData[dd]?.map(
                                      (pro, ind) => {
                                        return (
                                          <div key={ind} className={"p-2"}>
                                            <ProductCard
                                              data={pro}
                                              customcss={
                                                dd === 2
                                                  ? "newarrival"
                                                  : dd === 0
                                                  ? "rounded"
                                                  : "mobile-category"
                                              }
                                              key={ind}
                                              classNames={
                                                dd === 1 && colorSet(ind)
                                              }
                                            />
                                          </div>
                                        );
                                      }
                                    )}
                                  />
                                </div>
                              ) : (
                                ""
                                // <>
                                //   {ProductsData[dd]?.map((pro, ind) => (
                                //     <>
                                //       <div
                                //         className="col-lg-2 col-md-4 col-sm-6 col-6"
                                //         key={ind}
                                //       >
                                //         <ProductCard data={pro} />
                                //       </div>
                                //     </>
                                //   ))}
                                // </>
                              )}
                              <div
                                style={{
                                  margin: dd === 0 ? "10px 0px" : "10px 0px",
                                }}
                              >
                                <ProdcutAdvertisement />
                              </div>

                              {Advertisement[FilterDataFun(dd)] && (
                                <div className="advedisement-content">
                                  <div className="container">
                                    <div className="row">
                                      {/* start */}
                                      <div className="col-lg-6  ads-image">
                                        <img
                                          src={
                                            ImageUrl +
                                            Advertisement[FilterDataFun(dd)]
                                              ?.image1
                                          }
                                        />
                                      </div>
                                      <div className="col-lg-6  ads-image">
                                        <img
                                          src={
                                            ImageUrl +
                                            Advertisement[FilterDataFun(dd)]
                                              ?.image2
                                          }
                                        />
                                      </div>
                                      {/* end */}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* </>
                        )})} */}
          </div>
        </section>
        <div className="container">
          <div className="row">
            <div className="col-lg-12"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TopPRoduct;
