import React, { useEffect } from "react";
import Heading from "../../Fashion/Heading";
import { Get_HomeProduct_List } from "../../../Redux/Action/allActions";
import { useDispatch, useSelector } from "react-redux";
import ProductCards from "../Product/ProductCard";
import { Skeleton } from "@mui/material";
import axios from "axios";
import ProductCardOne from "../Product/ProductCardOne";
import Carosal from "../../Carosal";
import ProductCard from "../Product/ProductCard";
import { useHistory } from "react-router-dom";
const RelatedProducts = (props) => {
  let dispatch = useDispatch();
  let history = useHistory();
  const ArrivalList = useSelector((state) => state.AllReducer.Products);
  useEffect(() => {
    dispatch(Get_HomeProduct_List("new"));
  }, []);

  return (
    <>
      <section id="product_variation_one" className="pt-4 sort_list container">
        <div className="container-fluid">
          <Heading heading="New Arrivals" />
          <div
            className="viewall"
            onClick={() => history.push(`/view-detail/new`)}
          >
            View All
          </div>
          {ArrivalList?.length > 0 ? (
            <div>
              <Carosal
                arrows={false}
                content={ArrivalList?.map((data, index) => {
                  return (
                    <div key={index} className={"p-2"}>
                      <ProductCard
                        data={data}
                        customcss={"newarrival"}
                        key={index}
                      />
                    </div>
                  );
                })}
              />
            </div>
          ) : (
            <div className="row pt-4">
              {[...Array(6)].map(() => {
                return (
                  <div className="col-lg-2 col-md-6 col-sm-6 col-xs-6 col-6">
                    <Skeleton variant="rectangular" height={200} />
                    <Skeleton
                      animation="wave"
                      height={15}
                      style={{ marginTop: 8 }}
                    />
                    <div
                      style={{
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Skeleton
                        animation="wave"
                        height={15}
                        width="80%"
                        style={{ marginTop: 8, textAlign: "center" }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default RelatedProducts;
