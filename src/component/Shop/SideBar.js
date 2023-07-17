import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
// Import Img
import { isMobile } from "react-device-detect";
import Slider from "@mui/material/Slider";
const SideBar = (props) => {
  const Categorys = useSelector((state) => state.AllReducer.AllCategory);
  const [menu, setmenu] = useState();
  let { slug } = useParams();
  let history = useHistory();
  const [show, setshow] = useState(false);

  const ProductsFilter = [
    {
      name: "Offers",
      slug: "deal",
    },
    {
      name: "Top products",
      slug: "hot",
    },
    { name: "Best products", slug: "best" },
    { name: "Featured products", slug: "feature" },
    { name: "New arrivals", slug: "new" },
  ];

  const [enable, setenable] = useState(false);
  useEffect(() => {
    if (isMobile && !show) {
      setenable(false);
    } else if (isMobile && show) {
      setenable(true);
    } else {
      setenable(true);
    }
  }, [isMobile, show]);

  function valuetext(value) {
    return `${value}°C`;
  }

  return (
    <>
      {isMobile && (
        <div className="text-right filtermbl">
          <h4>Advance Filter</h4>
          <i className="fa fa-filter" onClick={() => setshow(!show)} />
        </div>
      )}

      {enable && (
        <div className="backgr-shop">
          <h3>Filter</h3>
          <div className="shop_sidebar_boxed">
            <div className="price-fli-child">
              <h4>Price</h4>

              <select onChange={(e) => props.TypeofFilterFun(e.target.value)}>
                <option value="all">All</option>
                <option value="points">Points</option>
                <option value="price">Price</option>
              </select>
            </div>
            {props.selectType !== "all" && (
              <>
                <Slider
                  value={props.slidevalue}
                  getAriaLabel={() => "Temperature range"}
                  onChange={(e, newValue) => props.pricefilterFun(newValue)}
                  valueLabelDisplay="auto"
                  // step={10}
                  // getAriaValueText={valuetext}
                  getAriaValueText={valuetext}
                  min={10}
                  max={5000}
                />
                <div className="minpri">
                  <span>Min:+{props.slidevalue[0]}</span>
                  <span>Max:+{props.slidevalue[1]}</span>
                </div>
              </>
            )}
          </div>
          <div>
            <div className="shop_sidebar_boxed">
              <h4>Categories</h4>
              <div className="categorymenu">
                {Categorys?.length > 0 &&
                  Categorys?.map((data) => (
                    <label className="custom_boxed">
                      {data.name}
                      <input
                        type="radio"
                        name="radio"
                        checked={menu ? menu === data.slug : data.slug === slug}
                        onChange={() => {
                          setmenu(data.slug);
                          props.HandleChange("");
                          history.push(`/shop/${data.slug}`);
                          props.executeScroll();
                        }}
                      />
                      <span className="checkmark"></span>
                    </label>
                  ))}
              </div>
            </div>

            <div className="shop_sidebar_boxed">
              <h4>Products</h4>
              <form>
                {ProductsFilter.map((data) => (
                  <label className="custom_boxed">
                    {data.name}

                    <input
                      type="radio"
                      name="radio"
                      onChange={() => {
                        props.HandleChange(data);
                        props.executeScroll();
                      }}
                    />
                    <span className="checkmark"></span>
                  </label>
                ))}

                <div className="clear_button">
                  <button
                    className="theme-btn-one btn_sm btn-black-overlay"
                    type="button"
                    onClick={() => {
                      setmenu("");
                    }}
                  >
                    Clear Filter
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;
