import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
// Import Img
import { isMobile } from "react-device-detect";

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
