import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CategoryList_api,
  Get_HomeProduct_List,
} from "../../../Redux/Action/allActions";
import ProductCard from "../Product/ProductCard";
import Heading from "../../Heading";
import { isMobile } from "react-device-detect";
import Header from "../../../component/Common/Header";
import Footer from "../../../component/Common/Footer";
import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import ProductCardOne from "../Product/ProductCardOne";
import { colorSet } from "../../../helpers/ListData";
export default function ViewallProducts() {
  let dispatch = useDispatch();
  let { slug } = useParams();
  const [Products, setProducts] = useState([]);
  const Productsdata = useSelector((state) => state.AllReducer.Products);
  const Categorydata = useSelector((state) => state.AllReducer.Category_List);
  const MenuCategories = useSelector(
    (state) => state.AllReducer.MenuCategories
  );
  const search = useLocation().search;
  const searchParams = new URLSearchParams(search);
  useEffect(() => {
    let payload = {
      type: slug,
    };
    if (searchParams.get("type") === "category") {
      dispatch(CategoryList_api(slug, true, payload));
    } else {
      dispatch(Get_HomeProduct_List(slug));
    }
  }, [slug]);

  const RenderClassNames = (slug) => {
    switch (slug) {
      case "new":
        return "newarrivals";
      case "deal":
        return "deals";
      default:
        return "";
    }
  };

  const RenderHeadings = () => {
    switch (slug) {
      case "new":
        return "New Arrivals";
      case "deal":
        return "Today Deals";
      case "hot":
        return "Top Products";
      case "best":
        return "Best Products";
      case "feature":
        return "Feature Products";
      default:
        return slug.replace("-", " ").toUpperCase();
    }
  };

  useEffect(() => {
    if (searchParams.get("type") === "category") {
      setProducts(Categorydata?.products);
    } else if (slug === "category-list") {
      setProducts(MenuCategories);
    } else {
      setProducts(Productsdata);
    }
  }, [Productsdata, Categorydata]);

  return (
    <>
      <Header />
      <div className="cards mb-2 text-center">
        <div className="container" style={{ maxWidth: "1300px" }}>
          <Heading
            heading={
              slug === "category-list" ? "TOP Categories" : RenderHeadings()
            }
          />
        </div>
      </div>
      <div className=" cards pb-3 pt-3 mb-3">
        <div
          className={`${!isMobile ? "view-rows" : "row"} container`}
          style={{ maxWidth: "1300px" }}
        >
          <>
            {Products?.length > 0 &&
              Products?.map((data, index) => (
                <div
                  className={`${!isMobile ? "view-child" : "col-6"}`}
                  key={index}
                >
                  {slug === "category-list" ? (
                    <ProductCardOne
                      data={data}
                      key={index}
                      classNames={colorSet()}
                      customcss="mobile-category customfont"
                    />
                  ) : (
                    <ProductCard
                      data={data}
                      key={index}
                      styles={"slider"}
                      deals={true}
                      customcss={RenderClassNames()}
                    />
                  )}
                </div>
              ))}
          </>
        </div>
      </div>
      <Footer />
    </>
  );
}
