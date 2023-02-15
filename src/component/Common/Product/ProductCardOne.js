import React from "react";
import { Link } from "react-router-dom";
import { ImageUrl } from "../../../Redux/Utils/baseurl";
import "./Productcard.scss";
export default function ProductCardOne(props) {
  return (
    <div>
      <div
        className={`product_wrappers_one ${
          props.category && "categorycutomcss"
        } ${props.customcss} ${props.classNames}`}
        for="product"
        title={props.data.name}
      >
        <div className="thumb">
          <Link to={`/shop/${props.data.slug}`} className="image">
            <img src={ImageUrl + props.data.photo} alt="Product" />
            <img
              className="hover-image"
              src={ImageUrl + props.data.photo}
              alt="Product"
            />
          </Link>
        </div>
        <div className="content">
          <h5 className="title text-center" style={{ marginBottom: "0px" }}>
            <Link
              to={`/product-details-one/${props.data.slug}/${props.data.id}`}
            >
              {props.data.name}
            </Link>
          </h5>
        </div>

        {/* qty */}
      </div>
    </div>
  );
}
