import React, { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ImageUrl } from "../../../Redux/Utils/baseurl";
import { AddToCartApi, AddWishlist } from "../../../Redux/Action/CreateActions";
import Swal from "sweetalert2";
import { CartListApi, TimerEnd } from "../../../Redux/Action/allActions";
import moment from "moment";
import { isMobile } from "react-device-detect";
const ProductCard = (props) => {
  let dispatch = useDispatch();
  let history = useHistory();
  const [selectpack, setselectpack] = useState(
    props?.data?.attribute && props?.data?.attribute[0]?.name
  );
  const [filterPack, setfilterPack] = useState(
    props?.data?.attribute && props?.data?.attribute[0]
  );
  const [ShopIds, setShopIds] = useState([]);
  const [disable, setdisable] = useState(true);
  const [update, setupdate] = useState(false);
  const [WishListData, setWishListData] = useState([]);
  const Rewards = useSelector((state) => state.AllReducer.RewardPoints);
  const ShoopingCarts = useSelector((state) => state.AllReducer.CartLists);
  const WishList = useSelector((state) => state.AllReducer.WishList);
  const ProfileData = useSelector((state) => state.AllReducer.ProfileData);
  const [qtyValue, setqtyValue] = useState(1);
  const [QuantityValues, setQuantityValues] = useState({});
  const [timer, settimer] = useState({});

  const ChangeAttribute = (data) => {
    setselectpack(data);
    FilterData(data);
  };

  const FilterData = (value) => {
    var Data = props.data.attribute.filter((data) => {
      return data.name === value;
    });
    setfilterPack(Data[0]);
  };

  // Add to cart
  const addToCart = async (id, data) => {
    if (JSON.parse(localStorage.getItem("UserId"))) {
      if (Rewards?.rewardpoint) {
        ProceedAddtoCart(id);
      } else {
        Swal.fire({
          icon: "warning",
          title: "Failed",
          text: "Your Reward Points 0",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    } else {
      history.push("/login");
    }
  };

  const ProceedAddtoCart = (id, type) => {
    setupdate(false);
    let product = {
      uid: JSON.parse(localStorage.getItem("UserId")),
      pid: props.data.id,
      qty: QuantityValues["test" + props.data.id] || 1,
      aid: filterPack?.id || "",
      // flag: timer ? 1 : 0,
    };
    dispatch(AddToCartApi(product)).then((res) => {
      dispatch(CartListApi());
      if (res?.payload?.status === 1) {
        type !== "qty" &&
          Swal.fire({
            icon: "success",
            title: "Success",
            text: res.payload.message,
            showConfirmButton: false,
            timer: 1000,
          });
      } else if (res?.payload?.status === 0) {
        type !== "qty" &&
          Swal.fire({
            icon: "warning",
            title: "Warning",
            text: res.payload.message,
            showConfirmButton: false,
            timer: 1000,
          });
      }
    });
  };

  // Add to Favorite
  const addToFav = (id) => {
    var Data = WishList?.filter((item) => {
      return item?.id === id;
    });
    if (JSON.parse(localStorage.getItem("UserId"))) {
      if (Data[0]?.id === id) {
        Swal.fire({
          icon: "warning",
          title: "Failed",
          text: "Already Added in Wishlist",
          showConfirmButton: false,
          timer: 1000,
        });
      } else {
        dispatch(AddWishlist(id)).then((res) => {});
      }
    } else {
      history.push("/login");
    }
  };

  useEffect(() => {
    let Ids = [];
    ShoopingCarts.map((data, index) => {
      setQuantityValues((prevState) => ({
        ...prevState,
        ["test" + data.pid]: data.qty || "",
      }));
      Ids.push(data.id);
    });
    setShopIds(Ids);
  }, [ShoopingCarts]);

  const OnChangeQty = (val, product, index) => {
    setdisable(false);

    if (Number(val) > Number(product.stock)) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Stock Exceeded",
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      setQuantityValues((prevState) => ({
        ...prevState,
        ["test" + index]: Number(val),
      }));
      setupdate(true);
    }
  };

  useEffect(() => {
    let Data = [];
    WishList.map((data) => {
      Data.push(data?.id);
    });
    setWishListData(Data);
  }, [WishList]);

  useEffect(() => {
    update &&
      ShopIds.includes(props.data.id) &&
      ProceedAddtoCart(props?.product?.id, "qty");
  }, [update]);
  //  /

  const [days, setdays] = useState("00");
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const startDate = moment();
      const timeEnd = moment(props.data.date).local();
      const diff = timeEnd.diff(startDate);
      const diffDuration = moment.duration(diff);
      if (diff > 0) {
        // settimer(true);
        settimer((prevState) => ({
          ...prevState,
          ["test" + props.data.id]: true,
        }));
        setHours(String(diffDuration.hours()).padStart(2, "0"));
        setdays(String(diffDuration.days()).padStart(2, "0"));
        setMinutes(String(diffDuration.minutes()).padStart(2, "0"));
        setSeconds(String(diffDuration.seconds()).padStart(2, "0"));
      } else {
        // settimer(false);
        settimer((prevState) => ({
          ...prevState,
          ["test" + props.data.id]: false,
        }));
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  });

  return (
    <>
      <div
        className="product_wrappers_one"
        // style={{
        //   height: !isMobile
        //     ? ShopIds.includes(props.data.id)
        //       ? "304px"
        //       : "304px"
        //     : ShopIds.includes(props.data.id)
        //     ? "270px"
        //     : "270px",
        // }}
      >
        <div className="thumb">
          <Link
            to={`/product-details-one/${props.data.slug}/${props.data.id}`}
            className="image"
          >
            <img src={ImageUrl + props.data.photo} alt="Product" />
            <img
              className="hover-image"
              src={ImageUrl + props.data.photo}
              alt="Product"
            />
          </Link>

          <div className="actions">
            <a
              className={`action wishlist ${
                WishListData.includes(props.data.id) ? "change_clr_wis" : ""
              }`}
              title="Wishlist"
              onClick={() => addToFav(props.data.id)}
            >
              <AiOutlineHeart />
            </a>
          </div>
        </div>
        <div className="content">
          <h5 className="title" style={{ marginBottom: "0px" }}>
            <Link
              to={`/product-details-one/${props.data.slug}/${props.data.id}`}
            >
              {props.data.name}
            </Link>
            <div className="re_points">
              Points :{" "}
              {timer["test" + props.data.id] && props.data.date
                ? props.data.deal_point
                : props.data.point}
            </div>
          </h5>
        </div>

        {/* qty */}
        <div
          className="total_pro_card"
          style={{
            justifyContent: ShopIds.includes(props.data.id)
              ? "center"
              : "center",
          }}
        >
          {Number(props?.data?.stock) !== 0 &&
          ShopIds.includes(props.data.id) ? (
            <div className="add_cart_qty">
              <input
                min="1"
                max="100"
                type="number"
                style={{
                  textAlign: "center",
                  padding: "0px 0px 0px 10px",
                }}
                onChange={(e) =>
                  OnChangeQty(e.target.value, props.data, props.data.id)
                }
                value={QuantityValues["test" + props.data.id]}
              />
              {props?.data?.attribute?.length > 0 && (
                <div
                  className="customs_selects"
                  style={{ padding: "0px 0px 0px 8px", width: "65%" }}
                >
                  <select
                    name="product"
                    className="customs_sel_box product_card_select"
                    style={{ minHeight: "30px" }}
                    onChange={(e) => ChangeAttribute(e.target.value)}
                    value={selectpack}
                  >
                    {props.data.attribute.map((data) => {
                      return (
                        <option value={data.name}>
                          {data.name} - &#x20B9; {data.price}
                          {/* fdfdfd <i class="fa fa-caret-down" aria-hidden="true"></i> */}
                        </option>
                      );
                    })}
                  </select>
                </div>
              )}
            </div>
          ) : (
            ""
          )}
          {/* qty end */}
          {Number(props.data.out_of_stock) !== 1 ? (
            <div style={{ textAlign: "center" }}>
              {ShopIds.includes(props.data.id) ? (
                <button
                  type="button"
                  className="add-to-cart cart-btn"
                  onClick={() => history.push("/cart")}
                >
                  Go to cart
                </button>
              ) : (
                <button
                  type="button"
                  className="add-to-cart cart-btn"
                  style={{ width: "90px" }}
                  onClick={() => addToCart(props.data.id, props.data)}
                >
                  <i className="fa fa-shopping-cart" /> Buy
                </button>
              )}
            </div>
          ) : (
            <div className="outfor_stock">
              <button className="add-to-cart cart-btn">Out of Stock</button>
            </div>
          )}
        </div>
        {props.data.date && timer["test" + props.data.id] && (
          <div className="deal_msg">
            {days > 0 && <span>{`${days}d`}</span>}
            <span>{`${hours}h `}</span>
            <span>{`${minutes}m `}</span>
            <span>{`${seconds}s `}</span>
          </div>
        )}
        {Number(props.data.out_of_stock) !== 1 && (
          <div className="hurry_up">
            Hurry Up Only {props.data.stock} products Left!!!
          </div>
        )}
      </div>
    </>
  );
};

export default ProductCard;
