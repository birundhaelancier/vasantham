import React, { useEffect, useCallback, useState } from "react";
import Header from "../component/Common/Header";
import Wishlist from "../component/WishList";
import Footer from "../component/Common/Footer";
import Img1 from "../assets/img/bgimage.jpg";
import deliver from "../assets/img/deliver.png";
import percent from "../assets/img/percent.png";
import img from "../assets/img/newlogo.png";
import { Link, useLocation } from "react-router-dom";
import { NotificationsApi } from "../Redux/Action/allActions";
import { useDispatch, useSelector } from "react-redux";
import { ImageUrl } from "../Redux/Utils/baseurl";
import moment from "moment";
import ModalImage from "react-modal-image";
const NotificationComp = () => {
  let dispatch = useDispatch();
  const [open, setopen] = useState(false);
  let { pathname } = useLocation();
  const Notifications = useSelector((state) => state.AllReducer.Notify);
  const Notify = [
    {
      head: "Liked what you bought!",
      para: "Tell us about the vegitables with 20kg... you recently bought,We'd love  to know about you experience",
      icon: percent,
      img: img,
    },
    {
      head: `Great Choice,${
        JSON.parse(localStorage.getItem("data"))?.first_name
      }!`,
      para: "Going by your likes,we have handpicked these awesome recommendations to go with your new Baskets",
      icon: deliver,
      img: img,
    },

    {
      head: "Order Delivered!",
      para: "Your Vasantham Shopping order containing vegitables has been delivered.",
      icon: percent,
      img: Img1,
    },
  ];
  useEffect(() => {
    dispatch(NotificationsApi());
    localStorage.setItem("notify", true);
  }, []);

  return (
    <>
      <Header />
      <div className="deliver_parent mt-5">
        {/* <div className="back_btn mb-3 pl-5 pt-3">
                       <Link to="/" ><i className="fa fa-arrow-left"></i>Back to Dashboard</Link>
            </div> */}
        <h4 className="text-center pb-4">{`Notifications`}</h4>
        {Notifications.map((data, index) => (
          <div className="deliver_comp">
            <div className="img-noti">
              {/* <img src={ImageUrl+data.image} onClick={()=>setopen(true)}/> */}

              <ModalImage
                small={ImageUrl + data.image}
                large={ImageUrl + data.image}
              />
            </div>

            {/* <span><img src={data.icon} className="notify-ic"/></span> */}
            <div>
              <span className="head_or">
                <a href={data?.url}>{data.title}</a>
              </span>
              <p>
                <a href={data?.url}>{data.description}</a>
              </p>
              <a>
                {moment(
                  moment(data.created_at).format("YYYY-MM-DD hh:mm:ss")
                ).fromNow()}
              </a>
              {/* <a href={data.url} className="linka">
                More Details
              </a> */}
              {/* <label>{(new Date(data.updated_at)) / (1000 * 60 * 60 * 24)} days ago</label> */}
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
};

export default NotificationComp;
