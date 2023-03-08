import React, { useEffect, useState, useRef } from "react";
import ProductCard from "../Common/Product/ProductCard";
import { useDispatch, connect } from "react-redux";
import Slider from "react-slick";
import { useLocation, useParams } from "react-router-dom";
import { CategoryList_api } from "../../Redux/Action/allActions";
import EmptyCart from "../Cart/EmptyCart";
import "react-awesome-slider/dist/custom-animations/cube-animation.css";
import Heading from "../Fashion/Heading";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { isMobile } from "react-device-detect";
import SideBar from "./SideBar";
import { colorSet } from "../../helpers/ListData";
const Shop = (props) => {
  let { slug } = useParams();
  let location = useLocation();
  let [loading, setloading] = useState(true);
  const [products, setProducts] = useState([]);
  const [page, setpage] = useState(1);
  const [Productname, setProductname] = useState("");
  const [FilterSearch, setFilterSearch] = useState([]);
  const [count, setcount] = useState(32);
  let dispatch = useDispatch();
  const myRef = useRef(null);
  const [product_slide, setproduct_slide] = useState(0);

  useEffect(() => {
    isMobile && executeScroll();
  }, [slug]);

  useEffect(() => {
    setloading(true);
    let payload = {
      type: Productname?.slug,
    };
    let payload2 = {
      ...payload,
      user_id:
        Productname?.slug === "deal"
          ? JSON.parse(localStorage.getItem("UserId"))
          : "",
    };
    dispatch(
      CategoryList_api(
        Productname ? Productname?.slug : slug,
        Productname === "" ? true : false,
        Productname?.slug === "deal" ? payload2 : payload
      )
    ).then((res) => {
      if (res) {
        setloading(false);
      }
    });
  }, [slug, Productname]);

  useEffect(() => {
    setProducts(props?.Category_List?.products || props.Category_List);
    if (props.Category_List) {
      setproduct_slide(0);
    }
  }, [props.Category_List]);

  const handleChange = (e, val) => {
    setpage(val);
  };

  const HandleChange = (data) => {
    setProductname(data);
  };

  useEffect(() => {
    setProductname("");
  }, [slug]);

  var flag2 = 1;

  const DealColors = (index) => {
    if (flag2 === 1) {
      flag2 = flag2 + 1;
      return "#e0e7ff";
    } else if (flag2 == 2) {
      flag2 = flag2 + 1;
      return "#f1f5f9";
    } else if (flag2 == 3) {
      flag2 = flag2 + 1;
      return "#e0f2fe";
    } else if (flag2 == 4) {
      flag2 = 1;
      return "#ffedd5";
    }
  };

  const SearchFun = (e) => {
    const productSearch = products.filter((data) => {
      if (e === null) return data;
      else if (
        data.name !== null &&
        data.name.toLowerCase().includes(e.toLowerCase())
      ) {
        return data;
      }
    });

    setFilterSearch(productSearch);
  };

  const executeScroll = () => myRef.current.scrollIntoView();

  return (
    <>
      <section id="shop_main_area" className="pb-100 container">
        <div className="headingtitle">
          <Heading
            heading={
              props?.Category_List?.categoryDetail?.name
                ? props?.Category_List?.categoryDetail?.name
                : Productname?.name
            }
          />
        </div>
        <div className="row">
          <div className="col-md-3 col-lg-3 col-12 ">
            <SideBar
              HandleChange={(data) => HandleChange(data)}
              SearchFun={(e) => SearchFun(e)}
              executeScroll={() => executeScroll()}
            />
          </div>

          <div className="col-md-9 col-lg-9 col-12">
            <div className="backgr-shop" ref={myRef}>
              {products?.length > 0 ? (
                <>
                  <div className="container">
                    {!loading ? (
                      <>
                        <div className="row mobileshop p-0">
                          {/* <Slider {...settings}> */}

                          {products
                            ?.slice(
                              (page - 1) * count,
                              (page - 1) * count + count
                            )
                            .map((data, index) => (
                              <div className="col-md-3 col-6 p-0">
                                <ProductCard
                                  data={data}
                                  category={Productname == "" && true}
                                  styles={Productname === "" && "slider"}
                                  deals={Productname?.slug === "deal" && true}
                                  customcss={
                                    Productname?.slug === "deal"
                                      ? "deals"
                                      : Productname?.slug === "feature"
                                      ? "newarrival"
                                      : Productname?.slug === "hot"
                                      ? "feature-product"
                                      : Productname?.slug === "best"
                                      ? "mobile-category"
                                      : "norma-products"
                                  }
                                  classNames={
                                    Productname?.slug === "best" && colorSet()
                                  }
                                  backGrounds={
                                    Productname?.slug === "hot" && DealColors()
                                  }
                                />
                              </div>
                            ))}
                          {/* </Slider> */}
                        </div>

                        {products?.length > 32 && (
                          <div className="pag-item">
                            <Pagination
                              count={Math.round(products?.length / 32)}
                              variant="outlined"
                              color="secondary"
                              page={page}
                              onChange={(e, val) => handleChange(e, val)}
                            />
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="shop_loader">
                        <i class="fa fa-circle-o-notch fa-spin"></i>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <EmptyCart Width={"80%"} />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const mapStateToProps = (state) => ({
  Category_List: state.AllReducer.Category_List || [],
});
export default connect(mapStateToProps)(Shop);

// {/* <div className="container">
//             {!loading ? (
//               <div className="row">
//                 {/* <Slider {...settings}> */}
//                 {products?.products
//                   ?.slice(pagen, count)
//                   .map((data, index) => (
//                     <div className="col-md-3 col-6">
//                       <ProductCard data={data} category={true} />
//                     </div>
//                   ))}
//                 {/* </Slider> */}
//               </div>
//             ) : (
//               <div className="shop_loader">
//                 <i class="fa fa-circle-o-notch fa-spin"></i>
//               </div>
//             )}
//           </div>
