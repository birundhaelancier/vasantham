import React from "react";
import Ads from "../assets/img/ads.png";
import Ads4 from "../assets/img/04.jpg";
import Ads5 from "../assets/img/05.png";
export default function Advertisement() {
  return (
    <div className="pt-2 container">
      <div className="row">
        {/* start */}
        <div className="col-lg-12 p-0">
          <img src={Ads4} style={{ width: "100%" }} />
        </div>
        <div className="col-lg-12 p-0">
          <img src={Ads5} style={{ width: "100%" }} />
        </div>
        {/* end */}
      </div>
    </div>
  );
}
