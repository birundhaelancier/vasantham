import React from "react";
import Ads from "../assets/img/ads.png";
import Ads4 from "../assets/img/04.jpg";
export default function Advertisement() {
  return (
    <div className="pt-2 container">
      <div className="row">
        {/* start */}
        <div className="col-lg-12">
          <img src={Ads4} style={{ width: "100%" }} />
        </div>
        <div className="col-lg-12">
          <img
            src={
              "https://www.jiomart.com/images/cms/aw_rbslider/slides/1672856821_blockbuster.jpg"
            }
          />
        </div>
        {/* end */}
      </div>
    </div>
  );
}
