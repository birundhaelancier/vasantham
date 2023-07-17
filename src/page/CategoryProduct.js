import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiurl, ImageUrl } from "../Redux/Utils/baseurl";
import { Get_HotProducts_List } from "../Redux/Action/allActions";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress } from "@mui/material";
import Carosal from "../component/Carosal";
import Heading from "../component/Heading";
import ProductCardOne from "../component/Common/Product/ProductCardOne";
import { useHistory } from "react-router-dom";

const TopPRoduct = () => {
  let dispatch = useDispatch();
  const AllCategory = useSelector((state) => state.AllReducer.AllCategory);
  const [hasmore, sethasmore] = useState(false);
  const [countscroll, setcountscroll] = useState(1);
  const [pagescroll, setpagescroll] = useState(1);
  let history = useHistory();
  useEffect(() => {
    dispatch(Get_HotProducts_List());
  }, []);

  const fetchMoreData = () => {
    setTimeout(() => {
      setcountscroll(countscroll + 1);
      setpagescroll(countscroll + 1);
    }, 2000);
  };

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
                        <InfiniteScroll
                          dataLength={pagescroll}
                          next={fetchMoreData}
                          scrollableTarget="scrollableDiv"
                          hasMore={AllCategory?.length >= pagescroll}
                          style={{ overflow: "inherit" }}
                          pullDownToRefreshThreshold={50}
                          endMessage={
                            <p style={{ textAlign: "center" }}>
                              <b>Yay! You have seen it all</b>
                            </p>
                          }
                          loader={
                            <div
                              className="spinner text-center mt-2 mb-2"
                              id="#scrollableDiv"
                            >
                              <CircularProgress color="success" />
                            </div>
                          }
                        >
                          {AllCategory?.length > 0 &&
                            AllCategory?.slice(0, pagescroll)?.map(
                              (datas, dd) => (
                                <>
                                  {/* hheader */}
                                  {datas?.sublist?.length > 0 && (
                                    <>
                                      <div className="col-lg-12">
                                        <div className="left_heading_three">
                                          <Heading
                                            heading={datas.name}
                                            onClick={() =>
                                              history.push(
                                                `/shop/${datas?.slug}`
                                              )
                                            }
                                            style={{ cursor: "pointer" }}
                                            para="Mauris luctus nisi sapien tristique dignissim"
                                          />
                                          <div
                                            className="viewall"
                                            onClick={() =>
                                              history.push(
                                                `/view-detail/${
                                                  datas?.slug
                                                }?type=${"category"}`
                                              )
                                            }
                                          >
                                            View All
                                          </div>
                                        </div>
                                      </div>
                                      {/* header end */}
                                      <div
                                        className="col-lg-12"
                                        style={{
                                          background: dd == 0 && "#fff",
                                          padding: dd == 0 && "5px",
                                        }}
                                      >
                                        <Carosal
                                          content={datas?.sublist?.map(
                                            (pro, ind) => {
                                              return (
                                                <div
                                                  key={ind}
                                                  className={"p-2"}
                                                >
                                                  <ProductCardOne
                                                    data={pro}
                                                    customcss={
                                                      dd === 2
                                                        ? "newarrival"
                                                        : dd === 0
                                                        ? "feature-product"
                                                        : "mobile-category"
                                                    }
                                                  />
                                                </div>
                                              );
                                            }
                                          )}
                                        />
                                      </div>
                                    </>
                                  )}
                                </>
                              )
                            )}
                        </InfiniteScroll>
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
