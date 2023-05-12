import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const LazyLoadImg = ({ image }) => (
  <div>
    <LazyLoadImage src={image} effect="blur" />
  </div>
);

export default LazyLoadImg;
