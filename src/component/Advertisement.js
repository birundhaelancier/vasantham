import React from "react";
import Ads from "../assets/img/ads.png";
import Ads4 from "../assets/img/04.jpg";
import Ads5 from "../assets/img/05.png";
import { useSelector } from "react-redux";
import { ImageUrl } from "../Redux/Utils/baseurl";
export default function Advertisement() {
  const Sliderlists = useSelector((state) => state.AllReducer.Sliderlists);

  return (
    <div className="pt-2 container">
      <div className="row">
        {/* start */}
        {Sliderlists?.map((data) => (
          <>
            <div className="col-lg-12 p-0">
              <img
                src={ImageUrl + data?.image1}
                style={{ width: "100%", marginBottom: "10px" }}
              />
            </div>
            <div className="col-lg-12 p-0">
              <img src={ImageUrl + data?.image2} style={{ width: "100%" }} />
            </div>
          </>
        ))}

        {/* end */}
      </div>
    </div>
  );
}
