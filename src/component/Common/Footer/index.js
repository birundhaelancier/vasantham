import React, { useEffect, useState } from "react";
import payment from "../../../assets/img/payment.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";
import { apiurl } from "../../../Redux/Utils/baseurl";
import { browserName, isBrowser } from "react-device-detect";
import logo from "../../../assets/img/logo.gif";
import whatsapp from "../../../assets/img/whatsapp.png";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  WhatsappShareButton,
} from "react-share";
const FooterData = [
  {
    title: "Company",
    links: [
      { linkTitle: "Terms and Condition", link: "/terms" },
      { linkTitle: "Privacy Policy", link: "/privacy-policy" },
      // { linkTitle: "About Us", link: "/about" },
      { linkTitle: "Refund Policy", link: "/refund" },
      { linkTitle: "FAQ", link: "/faqs" },
      { linkTitle: "About", link: "https://vasanthamstore.com/about/" },
    ],
  },
  {
    title: "Our Branches",
    links: [
      { linkTitle: "Kalavasal - Madurai" },
      { linkTitle: "Bypass Road - Madurai" },
      { linkTitle: "Virattipathu - Madurai" },
      { linkTitle: "K.Pudur - Madurai" },
      { linkTitle: "Koodal Nagar - Madurai" },
      { linkTitle: "Vilangudi - Madurai" },
    ],
  },
];

const Footer = ({ hide }) => {
  let dispatch = useDispatch();
  const [email, setemail] = useState();
  const [showScroll, setShowScroll] = useState(false);
  const [paymentdetail, setpaymentdetail] = useState([]);
  const [loading, setloading] = useState(false);
  let promoCenter = useSelector((state) => state?.settings?.promoCenter);
  let promoStatus = useSelector((state) => state?.settings?.promoStatus);
  let stopPromo = useSelector((state) => state?.settings?.stopPromo);
  let cookie = useSelector((state) => state?.settings?.cookie);
  let stopCookie = useSelector((state) => state?.settings?.stopCookie);

  useEffect(() => {
    if (promoStatus) {
      return;
    } else {
      dispatch({ type: "settings/promoStatus" });
      setTimeout(function () {
        dispatch({ type: "settings/promoCenter" });
      }, 1500);
    }

    if (stopCookie) {
      return;
    } else {
      setTimeout(function () {
        dispatch({ type: "settings/cookie" });
      }, 6000);
    }
  }, [dispatch, promoStatus, stopCookie]);

  const startPromoModal = () => {
    if (stopPromo) {
      dispatch({ type: "settings/promoCenter" });
      return;
    } else {
      dispatch({ type: "settings/promoCenter" });
      setTimeout(function () {
        dispatch({ type: "settings/promoCenter" });
      }, 700000);
    }
  };

  const stopPromoModal = () => {
    dispatch({ type: "settings/stopPromo" });
  };

  const cancelCookie = () => {
    dispatch({ type: "settings/cookie" });
  };

  const acceptCookie = () => {
    // Write your function there
    dispatch({ type: "settings/cookie" });
  };
  const SubscribeNews = () => {
    setloading(true);
    axios({
      method: "post",
      url: apiurl + "subscribeSubmit",
      data: {
        email: email,
      },
    }).then((res) => {
      setloading(false);
      if (res.data.msg) {
        setemail("");
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: res.data.msg,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "warning",
          title: "Failed!",
          text: Object.values(res?.data?.errors).join("\n"),
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  window.addEventListener("scroll", checkScrollTop);
  const AppUrl = "https://vasanthamstore.com/";
  return (
    <>
      <div className="footer_hide">
        {/* <Appfooter/> */}
        <footer id="footer_one">
          <div className="container">
            <div className="row">
              <div className="col-lg-2 col-md-12 col-sm-12 col-12">
                <div className="footer_left_side">
                  <Link to="/">
                    <img src={logo} alt="logo" className="footerImage" />
                  </Link>
                  <p>
                    {/* <strong>VASANTHAM</strong>&nbsp; */}
                    {/* Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. */}
                  </p>
                  <div className="footer_left_side_icon">
                    <ul>
                      <li>
                        <FacebookShareButton
                          url={"https://www.facebook.com/Vasanthamsupermart"}
                        >
                          <a>
                            <i className="fa fa-facebook-f"></i>
                          </a>
                        </FacebookShareButton>
                      </li>
                      <li>
                        <TwitterShareButton
                          url={"https://twitter.com/Vasanthamstore"}
                        >
                          <a>
                            <i className="fa fa-twitter"></i>
                          </a>
                        </TwitterShareButton>
                      </li>
                      {/* <li>
                                        <LinkedinShareButton url={AppUrl}>
                                            <a ><i className="fa fa-linkedin"></i></a>
                                        </LinkedinShareButton>
                                        </li> */}
                      {/* <li>
                        <WhatsappShareButton>
                          <i
                            class="fa fa-whatsapp"
                            onClick={() =>
                              window.open(
                                "https://wa.me/919047183288",
                                "_blank"
                              )
                            }
                            aria-hidden="true"
                          ></i>
                        </WhatsappShareButton>
                      </li> */}
                      <li>
                        <a>
                          <i
                            class="fa fa-instagram"
                            aria-hidden="true"
                            onClick={() =>
                              window.open(
                                "https://www.instagram.com/vasanthamsupermart"
                              )
                            }
                          ></i>
                        </a>
                      </li>

                      <li>
                        <a>
                          <i
                            class="fa fa-youtube-play"
                            onClick={() =>
                              window.open(
                                "https://www.youtube.com/channel/UCYIia86MKba5BBiy0YX7Yqw"
                              )
                            }
                            aria-hidden="true"
                          ></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                {FooterData?.slice(0, 1).map((data, index) => (
                  <div className="footer_one_widget" key={index}>
                    <h3>{data.title}</h3>
                    <ul>
                      {data.links.map((link, index) =>
                        link.linkTitle === "About" ? (
                          <li key={index}>
                            <Link
                              onClick={() => window.open(link.link, "_blank")}
                            >
                              {link.linkTitle}
                            </Link>
                          </li>
                        ) : (
                          <li key={index}>
                            <Link to={link.link}>{link.linkTitle}</Link>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                {FooterData?.slice(1, 2).map((data, index) => (
                  <div className="footer_one_widget" key={index}>
                    <h3>{data.title}</h3>
                    <ul>
                      {data.links.map((link, index) => (
                        <li key={index} className="link_tag">
                          {link.linkTitle}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                <div className="footer_one_widget">
                  <h3>NEWSLETTER</h3>
                  <div id="mc_embed_signup" className="subscribe-form">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        !loading && SubscribeNews();
                      }}
                    >
                      <div className="mc-form">
                        <input
                          className="form-control"
                          type="email"
                          value={email}
                          onChange={(e) => setemail(e.target.value)}
                          placeholder="Your Mail"
                          name="EMAIL"
                          defaultValue=""
                          required
                          pattern=".+@gmail\.com"
                        />
                        <div className="clear">
                          <button
                            className="theme-btn-one btn_md"
                            type="submit"
                            name="subscribe"
                            defaultValue=""
                          >
                            {loading && (
                              <i
                                className="fa fa-spinner fa-spin "
                                style={{ fontSize: "14px", marginTop: "4px" }}
                              />
                            )}{" "}
                            Subscribe
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {showScroll && (
            <div
              className="go-top active"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <i className="fa fa-chevron-up"></i>
              <i className="fa fa-arrow-up"></i>
            </div>
          )}
          {/* {showScroll && ( */}
          <div className="whatsic">
            <img
              src={whatsapp}
              onClick={() =>
                window.open("https://wa.me/919047183288", "_blank")
              }
            />
          </div>
          {/* )} */}
        </footer>

        <section id="copyright_one">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="copyright_left">
                  <h6>
                    © Copyright 2022 <span>Vasantham</span>
                  </h6>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                <div className="copyright_right">
                  <img src={payment} alt="img" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <NewsletterModal show={promoCenter} stop={stopPromoModal} start={startPromoModal} /> */}
      </div>
    </>
  );
};

export default Footer;
