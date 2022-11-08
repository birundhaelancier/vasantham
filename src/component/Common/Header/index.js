import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/img/vasanth1.jpg";
import logoWhite from "../../../assets/img/vasanth1.jpg";
import { MenuData } from "./MenuData";
import NaveItems from "./NaveItems";
import TopHeader from "./TopHeader";
import { useHistory } from "react-router-dom";
import svg from "../../../assets/img/svg/cancel.svg";
import svgsearch from "../../../assets/img/svg/search.svg";
import logotest from "../../../assets/img/vasanthlogo.png";
import home from "../../../assets/img/home.png";
import category from "../../../assets/img/category.png";
import order from "../../../assets/img/order.png";
import account from "../../../assets/img/account.png";
import terms from "../../../assets/img/terms.png";
import refer from "../../../assets/img/refer.png";
import contact from "../../../assets/img/contact.png";
import rate from "../../../assets/img/rate.png";
import insta from "../../../assets/img/insta.png";
import Youtube from "../../../assets/img/youtube1.png";
import review from "../../../assets/img/review.png";
import reward from "../../../assets/img/reward.png";
import redeem from "../../../assets/img/redeem.png";
import about from '../../../assets/img/about.png'
import { Autocomplete, InputAdornment, Box, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { apiurl, ImageUrl } from "../../../Redux/Utils/baseurl";
import Swal from "sweetalert2";
import axios from "axios";
import {
  Category_List,
  Get_Wishlist,
  Profile_Details,
  RewardPoints,
  SearchCategory,
  NotificationsApi
} from "../../../Redux/Action/allActions";
import Avatar from "@mui/material/Avatar";
import Slider from "react-slick";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  TelegramIcon,
  WhatsappIcon,
} from "react-share";
// const MenuData = []
const Header = () => {
  let dispatch = useDispatch();

  const [click, setClick] = useState(false);
  const [show, setShow] = useState();
  const history = useHistory();
  const [Category, setCategory] = useState([]);
  const [NewMenuData, setNewMenuData] = useState([]);
  const [WishList, setWishList] = useState([]);
  const ShoppingCarts = useSelector((state) => state.StoreProuct.ShoopingCarts);
  const profileDetails = useSelector(
    (state) => state.AllReducer.ProfileData?.users
  );
  const AllCategory = useSelector((state) => state.AllReducer.AllCategory);
  const Notifications = useSelector((state) => state.AllReducer.Notify);
  const Reward = useSelector((state) => state.AllReducer.RewardPoints);
  const WishListData = useSelector((state) => state.AllReducer.WishList);
  let carts = useSelector((state) => state?.products?.carts);
  let favorites = useSelector((state) => state?.products?.favorites);
  const [FilterData, setFilterData] = useState([]);
  const [searchValue, setsearchValue] = useState(null);
  const [login, setlogin] = useState(false);
  const [SearchList, setSearchList] = useState([]);
  var settings = {
    dots: false,
    arrow: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    dispatch(Profile_Details());
    dispatch(RewardPoints());
    dispatch(Category_List());
    dispatch(Get_Wishlist());
    dispatch(NotificationsApi())
  }, []);

  useEffect(() => {
    var Data = WishListData.filter((data) => {
      return data !== null;
    });
    setWishList(Data);
  }, [WishListData]);

  const handleClick = () => {
    // if (click) {
    //     document.querySelector("#offcanvas-add-cart").style = ("transform: translateX(100%);")
    // } else {
    //     document.querySelector("#offcanvas-add-cart").style = ("transform: translateX(0%);")
    // }
    // setClick(!click);
    history.push("/wishlist");
  };
  const handleWish = () => {
    // if (click) {
    //     document.querySelector("/cart").style = ("transform: translateX(100%);")
    // } else {
    //     document.querySelector("/cart").style = ("transform: translateX(0);")
    // }
    // setClick(!click);
    history.push("/wishlist");
  };

  const handleSearch = () => {
    if (click) {
      document.querySelector("#search").style =
        "transform: translate(-100%, 0); opacity: 0";
    } else {
      document.querySelector("#search").style =
        "transform: translate(0px, 0px); opacity: 1";
    }
    setClick(!click);
  };
  const handleabout = () => {
    if (click) {
      document.querySelector("#offcanvas-about").style =
        "transform: translateX(100%);";
    } else {
      document.querySelector("#offcanvas-about").style =
        "transform: translateX(0%);";
    }
    setClick(!click);
  };
  const handlemenu = () => {
    if (click) {
      document.querySelector("#mobile-menu-offcanvas").style =
        "transform: translateX(100%);";
    } else {
      document.querySelector("#mobile-menu-offcanvas").style =
        "transform: translateX(0%);";
    }
    setClick(!click);
  };

  const logout = () => {
    // Swal.fire({
    //     icon: 'success',
    //     title: 'Logout Sucessfully',
    //     text: 'Thank You',
    //     showConfirmButton: false,
    //     timer: 1500
    // })
    localStorage.removeItem("UserId");
    // dispatch({ type: "user/logout" })
    history.push("/login");
  };

  const handleShow = (value) => {
    value === show ? setShow("") : setShow(value);
  };

  // Sticky Menu Area
  // useEffect(() => {
  //     window.addEventListener('scroll', isSticky);
  //     return () => {
  //         window.removeEventListener('scroll', isSticky);
  //     };
  // });

  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isSticky = (e) => {
    const header = document.querySelector(".mobile-section");
    const header2 = document.querySelector(".header-section");
    const scrollTop = window.scrollY;
    scrollPosition >= 10
      ? header.classList.add("is-sticky")
      : header.classList.remove("is-sticky");
    scrollPosition >= 10
      ? header2.classList.add("is-sticky")
      : header2.classList.remove("is-sticky");
  };

  useEffect(() => {
    dispatch(Category_List()).then((res) => {});
    axios({
      method: "Get",
      url: apiurl + "category",
    }).then((response) => {});
    dispatch(SearchCategory()).then((res) => {
      let Data = [];
      res.payload.product.concat(res.payload.category).map((data) => {
        Data.push(data);
      });
      setFilterData(res.payload);
      setSearchList(Data);
    });
  }, []);

  useEffect(() => {
    let array = [];
    let newmenu = [];
    AllCategory.map((val) => {
      array.push({ name: val.name, href: `/shop/${val.slug}` });
      if (val.home === 1) {
        newmenu.push({
          name: val.name,
          href: `/shop/${val.slug}`,
          children: [],
        });
      }
    });
    setCategory(AllCategory);
    MenuData[0].children = array;
    setNewMenuData(newmenu);
  }, [AllCategory]);

  const ChangeSearchList = (event, data) => {
    setsearchValue(data);
    FilterData.category.filter((item) => {
      if (data?.name === item?.name) {
        history.push(`/shop/${item.slug}`);
      }
    });
    FilterData.product.filter((item) => {
      if (data?.name === item?.name) {
        history.push(`/product-details-one/${item.slug}/${data.id}`);
      }
    });
  };
  useEffect(() => {
    isSticky();
  }, [scrollPosition]);

  const NextPage = (data) => {
    history.push(data);
    handlemenu();
  };

  const Main_url = "https://dynamic-froyo-597702.netlify.app/";


  const WindowOpen=(url)=>{
    // alert("fghj")
  //  var windowSize = "width=" + window.innerWidth + ",height=" + window.innerHeight + ",scrollbars=no";
   window.open(url, '_self')

  }

  return (
    <>
      <TopHeader />
      <header className="header-section  d-xl-block">
        <div className="header-wrapper">
          <div className="header-bottom header-bottom-color--golden section-fluid sticky-header sticky-color--golden">
            <div className="container">
              <div className="row">
                <div className="col-12 d-flex align-items-center justify-content-between">
                  <div className="agalogoImage">
                    <div className="logo">
                      <Link to="/">
                        <img
                          src={
                            "https://elancier.in/vasantham/assets/images/1653572820logo.gif"
                          }
                          alt="logo"
                        />
                      </Link>
                    </div>
                  </div>

                  <div className="SearchView">
                    <div className="search_space">
                      <div class="wrapper">
                        {/* <div class="search-icon" >🔎︎</div>
                                                <input class="search" placeholder="Search for products" type="text"/> */}
                        <div className="input-group md-form form-sm form-1 pl-0 auto_search">
                          <Autocomplete
                            onChange={(event, newValue) =>
                              ChangeSearchList(event, newValue)
                            }
                            renderOption={(props, option) => (
                              <Box
                                component="li"
                                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                                {...props}
                              >
                                {option.photo && (
                                  <img
                                    loading="lazy"
                                    width="40"
                                    style={{ width: "40px", height: "40px" }}
                                    src={ImageUrl + option?.photo}
                                  />
                                )}
                                <span>{option?.name}</span>
                              </Box>
                            )}
                            value={searchValue}
                            options={SearchList}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                size="Normal"
                                InputLabelProps={{ shrink: false }}
                                placeholder="Search for products"
                                InputProps={{
                                  ...params.InputProps,
                                  type: "search",
                                  //   startAdornment:
                                  //     <InputAdornment
                                  //         position="start">🔎︎</InputAdornment>,
                                  endAdornment: (
                                    <InputAdornment> Search </InputAdornment>
                                  ),
                                }}
                              />
                            )}
                          />
                          <div className="input-group-prepend"></div>
                        </div>
                      </div>
                    </div>

                  </div>
                  <ul className="right_list">
                    {!JSON.parse(localStorage.getItem("UserId")) ? (
                      <li className="user__list">
                        <Link to="/login">
                          <i className="fa fa-user"></i> Login
                        </Link>
                      </li>
                    ) : (
                      <>
                        <li className="after_login">
                          {profileDetails?.photo === undefined ||
                          profileDetails?.photo === null ? (
                            <Avatar
                              src="/broken-image.jpg"
                              className="avater_img"
                              sx={{ height: "24px", width: "24px" }}
                            />
                          ) : (
                            <img
                              src={ImageUrl + profileDetails?.photo}
                              alt="avater"
                            />
                          )}
                          <span className="pr-2 pl-2">
                            <strong>
                              {profileDetails?.first_name || "My Profile"}
                            </strong>
                          </span>{" "}
                          <i className="fa fa-angle-down"></i>
                          <ul className="custom_dropdown">
                            <li>
                              <Link to="/my-account">
                                <i className="fa fa-tachometer"></i> Dashboard
                              </Link>
                            </li>
                            <li>
                              <Link to="/my-account/customer-order">
                                <i className="fa fa-product-hunt"></i>
                                <span>My Orders</span>
                              </Link>
                            </li>
                            <li>
                              <Link to="/my-account/customer-order">
                                <i className="fa fa-user"></i>
                                <span>
                                  {" "}
                                  My Reward Points {Reward?.rewardpoint || 0}
                                </span>
                              </Link>
                            </li>
                            <li>
                              <Link to="/my-account/addresslist">
                                <i className="fa fa-address-card"></i>
                                <span>Address List</span>
                              </Link>
                            </li>
                            <li>
                              <Link
                                onClick={() => {
                                  logout();
                                }}
                              >
                                <i className="fa fa-sign-out"></i> Logout
                              </Link>
                            </li>
                          </ul>
                        </li>
                      </>
                    )}
                  </ul>

                  <ul className="header-action-link action-color--black action-hover-color--golden">
                    <li>
                      <Link to="/notification" className="offcanvas-icon">
                        <i class="fa fa-bell bell_ic" aria-hidden="true"></i>
                        <span className="item-count">{Notifications?.length || 0}</span>
                      </Link>
                    </li>
                    <li>
                      {ShoppingCarts?.length ? (
                        <Link to="/cart" className="offcanvas-icon">
                          <i className="fa fa-shopping-cart"></i>
                          <span className="item-count">
                            {ShoppingCarts?.length || 0}
                          </span>
                        </Link>
                      ) : (
                        <Link to="/cart" className="offcanvas-icon">
                          <i className="fa fa-shopping-cart"></i>
                          <span className="item-count">
                            {ShoppingCarts?.length || 0}
                          </span>
                        </Link>
                      )}
                    </li>
                    {/* <li>fghjk</li> */}

                    <li>
                      {WishList?.length > 0 ? (
                        <a className="offcanvas-toggle" onClick={handleClick}>
                          <i className="fa fa-heart"></i>
                          <span className="item-count">
                            {WishList?.length || 0}
                          </span>
                        </a>
                      ) : (
                        <a className="offcanvas-toggle" onClick={handleClick}>
                          <i className="fa fa-heart"></i>
                          <span className="item-count">
                            {WishList?.length || 0}
                          </span>
                        </a>
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header-wrappers">
          {/* <div className="header-bottom header-bottom-color--golden section-fluid sticky-header sticky-color--golden"> */}
          <div className="container">
            <div className="row">
              <div className="col-12 d-flex align-items-center justify-content-start">
                <div className="main-menu menu-color--black menu-hover-color--golden  d-xl-block">
                  <nav>
                    <ul className="menus-list">
                      {MenuData.map((item, index) => (
                        <NaveItems item={item} key={index} />
                      ))}
                      {NewMenuData.slice(0, 6).map((item, index) => (
                        <NaveItems item={item} key={index} />
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>
      </header>

      <div className="mobile-header sticky-header mobile-section sticky-color--golden mobile-header-bg-color--golden section-fluid  d-xl-none is-sticky">
        <div className="container">
          <div className="row">
            <div className="col-12 d-flex align-items-center justify-content-between">
              <div className="mobile-header-left">
                <ul className="mobile-menu-logo">
                  <li>
                    <a href="/">
                      <div className="logo logospace ">
                        <div className="logo_child">
                          <img
                            src={
                              "https://elancier.in/vasantham/assets/images/1653572820logo.gif"
                            }
                            alt="logo"
                          />
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="mobile-right-side">
                <ul className="header-action-link action-color--black action-hover-color--golden">
                  <li>
                    <Link to="/notification" className="offcanvas-icon">
                      <i class="fa fa-bell bell_ic" aria-hidden="true"></i>
                      <span className="item-count">{Notifications?.length || 0}</span>
                    </Link>
                  </li>
                  <li>
                    {ShoppingCarts?.length ? (
                      <Link to="/cart" className="offcanvas-icon">
                        <i className="fa fa-shopping-cart"></i>
                        <span className="item-count">
                          {ShoppingCarts?.length || 0}
                        </span>
                      </Link>
                    ) : (
                      <Link to="/cart" className="offcanvas-icon">
                        <i className="fa fa-shopping-cart"></i>
                        <span className="item-count">
                          {ShoppingCarts?.length || 0}
                        </span>
                      </Link>
                    )}
                  </li>
                  <li>
                    {WishList?.length ? (
                      <a className="offcanvas-toggle" onClick={handleClick}>
                        <i className="fa fa-heart"></i>
                        <span className="item-count">
                          {WishList?.length || 0}
                        </span>
                      </a>
                    ) : (
                      <a className="offcanvas-toggle" onClick={handleClick}>
                        <i className="fa fa-heart"></i>
                        <span className="item-count">
                          {WishList?.length || 0}
                        </span>
                      </a>
                    )}
                  </li>
                  <li>
                    <a
                      className="offcanvas-toggle offside-menu"
                      onClick={handlemenu}
                    >
                      <i className="fa fa-bars"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="mobile-menu-offcanvas"
        className="offcanvas offcanvas-rightside offcanvas-mobile-menu-section"
      >
        <div className="offcanvas-header text-right menu_header_view">
          <div className="logo logospace">
            <div className="logo_child">
              <img
                src={
                  "https://elancier.in/vasantham/assets/images/1653572820logo.gif"
                }
                alt="logo"
              />
            </div>
          </div>
          <button className="offcanvas-close" onClick={handlemenu}>
            <img src={svg} alt="icon" />
          </button>
        </div>
        <div className="offcanvas-mobile-menu-wrapper">
          <div className="mobile-menu-bottom">
            <div className="offcanvas-menu">
              <div className="name_det">
                {profileDetails?.first_name} {profileDetails?.last_name}
              </div>
              <div className="name_chl">{profileDetails?.phone}</div>
              <div className="name_chl">{profileDetails?.email}</div>
              <ul>
                <li>
                  <a>
                    <span>
                      <img src={reward} /> {"Loyalty Points"}{" "}
                      <span className="point">{Reward?.rewardpoint || 0}</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      NextPage("/redeemhistory");
                    }}
                  >
                    <span>
                      <img src={redeem} /> {"Redeem History"}
                    </span>
                  </a>
                </li>
                {JSON.parse(localStorage.getItem("UserId")) && (
                  <li>
                    <a
                      onClick={() => {
                        NextPage("/bills");
                      }}
                    >
                      <span>
                        <img src={review} /> {"My Bills"}
                      </span>
                    </a>
                  </li>
                )}

                <li>
                  <a
                    onClick={() => {
                      NextPage("/category");
                    }}
                  >
                    <span>
                      <img src={category} /> {"All Category"}
                    </span>
                  </a>
                </li>

                {JSON.parse(localStorage.getItem("UserId")) && (
                  <>
                    <li>
                      <a
                        onClick={() =>
                          NextPage("/my-account/customer-account-details")
                        }
                      >
                        <span>
                          <img src={account} /> {"My Account"}
                        </span>
                      </a>
                    </li>
                    <li>
                      <a onClick={() => NextPage("/my-account/customer-order")}>
                        <span>
                          <img src={order} /> {"My Orders"}
                        </span>
                      </a>
                    </li>
                  </>
                )}

                <li>
                  <a
                    onClick={() => {
                      NextPage("/contactus");
                    }}
                  >
                    <span>
                      <img src={contact} /> {"Contact Us"}
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      NextPage("/terms");
                    }}
                  >
                    <span>
                      <img src={terms} /> {"Terms & Conditions"}
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    onClick={ () =>WindowOpen("https://vasanthamstore.com/about/")
                    }
                  >
                    <span>
                      <img src={about} /> {"About"}
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    onClick={() =>WindowOpen("https://g.page/r/CWQ1Hfkqod8GEAg/review")}
                  >
                    <span>
                      <img src={rate} /> {"Rate Us"}
                    </span>
                  </a>
                </li>
                {/* <li><a ><span><img src={review}/>  {"Reviews"}</span></a></li> */}
                <li>
                  <WhatsappShareButton
                    url={""}
                    title={"Vasantham Shopping"}
                  >
                    <WhatsappIcon size={32} round onClick={()=>window.open("https://wa.me/919047183288","_self")}/>
                  </WhatsappShareButton>
                  <FacebookShareButton
                    quote={""}
                    hashtag="#vasantham shopping"
                  >
                    <FacebookIcon size={32} round onClick={()=>window.open("https://www.facebook.com/Vasanthamsupermart","_self")}/>
                  </FacebookShareButton>
                  <TwitterShareButton
                    url={""}
                    title={"Vasantham Shopping"}
                  >
                    <TwitterIcon size={32} round onClick={()=>window.open("https://twitter.com/Vasanthamstore","_self")}/>
                  </TwitterShareButton>

                  <img
                    src={insta}
                    onClick={() =>
                      window.open(
                        "https://www.instagram.com/vasanthamsupermart","_self"
                      )
                    }
                    className="img_play"
                  />

                  <img
                    src={Youtube}
                    onClick={() =>
                      window.open(
                        "https://www.youtube.com/channel/UCYIia86MKba5BBiy0YX7Yqw","_self"
                      )
                    }
                    className="img_play"
                  />
                </li>
                <li>
                  <a>
                    <span>
                      {!JSON.parse(localStorage.getItem("UserId")) ? (
                        <span onClick={() => NextPage("/login")}>Login</span>
                      ) : (
                        <span onClick={() => logout()}>Log Out</span>
                      )}
                    </span>
                  </a>
                </li>
                <li>
            </li>
               
              </ul>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
