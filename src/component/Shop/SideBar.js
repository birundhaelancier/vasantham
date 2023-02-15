import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
// Import Img
import search from "../../assets/img/svg/search.svg";
import { Category_List } from "../../Redux/Action/allActions";

const SideBar = (props) => {
  const Categorys = useSelector((state) => state.AllReducer.AllCategory);
  const [menu, setmenu] = useState();
  let { slug } = useParams();
  let history = useHistory();
  let dispatch = useDispatch();
  //   useEffect(() => {
  //     document.querySelectorAll("input[type='radio']").forEach((input) => {
  //       input.addEventListener("change", function () {
  //         props.filterEvent(1);
  //       });
  //     });

  //     document
  //       .querySelector("input[type='range']")
  //       .addEventListener("change", function (e) {
  //         setPrice(e.target.value);
  //         props.filterEvent(1);
  //       });
  //   }, [props]);

  const [price, setPrice] = useState(100);
  return (
    <>
      <h3>Filter</h3>
      <div className="shop_sidebar_wrapper">
        <div className="shop_Search">
          <form>
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
            />
            <button>
              <img src={search} alt="img" />
            </button>
          </form>
        </div>
        <div className="shop_sidebar_boxed">
          <h4>Categories</h4>
          <form className="categorymenu">
            <label className="custom_boxed">
              ALL
              <input type="radio" name="radio" defaultChecked />
              <span className="checkmark"></span>
            </label>
            {Categorys.map((data) => (
              <label className="custom_boxed">
                {data.name}
                <input
                  type="radio"
                  name="radio"
                  checked={menu ? menu === data.slug : data.slug === slug}
                  onChange={() => {
                    setmenu(data.slug);
                    history.push(`/shop/${data.slug}`);
                  }}
                />
                <span className="checkmark"></span>
              </label>
            ))}
          </form>
        </div>

        <div className="shop_sidebar_boxed">
          <h4>Products</h4>
          <form>
            <label className="custom_boxed">
              Offers
              <input type="radio" name="radio" />
              <span className="checkmark"></span>
            </label>
            <label className="custom_boxed">
              Top products
              <input type="radio" name="radio" />
              <span className="checkmark"></span>
            </label>
            <label className="custom_boxed">
              Best products
              <input type="radio" name="radio" defaultChecked />
              <span className="checkmark"></span>
            </label>
            <label className="custom_boxed">
              Featured products
              <input type="radio" name="radio" />
              <span className="checkmark"></span>
            </label>
            <label className="custom_boxed">
              New arrivals
              <input type="radio" name="radio" />
              <span className="checkmark"></span>
            </label>

            <div className="clear_button">
              <button
                className="theme-btn-one btn_sm btn-black-overlay"
                type="button"
                onClick={() => {
                  props.filterEvent(1);
                }}
              >
                Clear Filter
              </button>
            </div>
          </form>
        </div>
        <div className="shop_sidebar_boxed">
          <h4>Price</h4>
          <div className="price_filter">
            <input
              type="range"
              min="10"
              max="200"
              defaultValue={price}
              className="form-control-range"
              id="formControlRange"
            />
            <div className="price_slider_amount mt-2">
              <span>Price : {price}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
