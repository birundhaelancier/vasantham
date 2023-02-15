import React, { useEffect, useState } from "react";
import ProductCard from "../Common/Product/ProductCard";
import { useDispatch, connect } from "react-redux";
import Slider from "react-slick";
import { useParams } from "react-router-dom";
import { CategoryList_api } from "../../Redux/Action/allActions";
import EmptyCart from "../Cart/EmptyCart";
import "react-awesome-slider/dist/custom-animations/cube-animation.css";
import Heading from "../Fashion/Heading";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { isMobile } from "react-device-detect";
import SideBar from "./SideBar";
const Shop = (props) => {
  let { slug } = useParams();
  let [loading, setloading] = useState(true);
  const [products, setProducts] = useState([]);
  const [page, setpage] = useState(1);
  const [pagen, setpagen] = useState(0);
  const [count, setcount] = useState(30);
  let dispatch = useDispatch();
  const [product_slide, setproduct_slide] = useState(0);

  useEffect(() => {
    setloading(true);
    dispatch(CategoryList_api(slug)).then((res) => {
      if (res) {
        setloading(false);
      }
    });
  }, [slug]);

  useEffect(() => {
    setProducts(props.Category_List);
    if (props.Category_List) {
      setproduct_slide(0);
    }
  }, [props.Category_List]);

  const handleChange = (e, val) => {
    setpage(val);
    setpagen(0 + val);
  };

  let settings = {
    customPaging: function (i) {
      return (
        <div className="pagination">
          <div
            className={`page-item ${i === product_slide ? "active" : ""}`}
            onClick={() => setproduct_slide(i)}
          >
            <a className="page-link">{i + 1}</a>
          </div>
        </div>
      );
    },
    arrows: products?.products?.length > 30 ? true : false,
    dots: products?.products?.length > 30 ? false : true,
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    rows: products?.products?.length > 6 ? 2 : 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          customPaging: function (i) {
            return (
              <div className="">
                <button
                  className={`page-item ${i === product_slide ? "active" : ""}`}
                  onClick={() => setproduct_slide(i)}
                >
                  {i + 1}
                </button>
              </div>
            );
          },
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          customPaging: function (i) {
            return (
              <div className="">
                <button
                  className={`page-item ${i === product_slide ? "active" : ""}`}
                  onClick={() => setproduct_slide(i)}
                >
                  {i + 1}
                </button>
              </div>
            );
          },
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          rows: 2,
          dots: false,
          arrows: false,
          customPaging: function (i) {
            return (
              <div className="">
                <button
                  className={`page-item ${i === product_slide ? "active" : ""}`}
                  onClick={() => setproduct_slide(i)}
                >
                  {i + 1}
                </button>
              </div>
            );
          },
        },
      },
    ],
  };

  return (
    <>
      <section id="shop_main_area" className="pb-100 container">
        <div className="row">
          <div className="col-md-3 col-lg-3 col-12 pt-5">
            <SideBar />
          </div>
          <div className="col-md-9 col-lg-9 col-12">
            <Heading heading={products?.categoryDetail?.name} />

            {products?.products?.length > 0 ? (
              <>
                <div className="container">
                  {!loading ? (
                    <>
                      <div className="row mobileshop p-0">
                        {/* <Slider {...settings}> */}

                        {products?.products
                          ?.slice(
                            (page - 1) * count,
                            (page - 1) * count + count
                          )
                          .map((data, index) => (
                            <div className="col-md-3 col-6 p-0">
                              <ProductCard data={data} category={true} />
                            </div>
                          ))}
                        {/* </Slider> */}
                      </div>
                      {products?.products?.length > 8 && (
                        <div className="pag-item">
                          <Pagination
                            count={Math.round(products?.products?.length / 30)}
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
