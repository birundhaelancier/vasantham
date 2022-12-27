import React, { useState, useEffect } from "react";
import ProductInfo from "./ProductInfo";
import RelatedProduct from "./RelatedProduct";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch, connect } from "react-redux";
import { useParams } from "react-router-dom";
import { RatingStar } from "rating-star";
import Swal from "sweetalert2";
import {
  CartListApi,
  Get_Single_Product_List,
} from "../../../Redux/Action/allActions";
import { ImageUrl } from "../../../Redux/Utils/baseurl";
import {
  AddToCartApi,
  AddWishlist,
  ProductDelete,
} from "../../../Redux/Action/CreateActions";
import EmptyProductLoading from "./EmptyProductLoading";
import ImagesGalleryComp from "./ImageGallery";
import moment from "moment";
const ProductDetailsOne = (props) => {
  let dispatch = useDispatch();
  let history = useHistory();
  const [product, setProducts] = useState([]);
  const [loading, setloading] = useState(true);
  const [ShopIds, setShopIds] = useState([]);
  const [gallery, setgallery] = useState([]);
  const [selectpack, setselectpack] = useState();
  const [filterPack, setfilterPack] = useState();
  const [update, setupadte] = useState(false);
  const [QuantityValues, setQuantityValues] = useState({});
  const Rewards = useSelector((state) => state.AllReducer.RewardPoints);
  const WishList = useSelector((state) => state.AllReducer.WishList);
  const ShoopingCarts = useSelector((state) => state.AllReducer.CartLists);
  const ProfileData = useSelector((state) => state.AllReducer.ProfileData);
  let { id, productid } = useParams();
  const [timer, settimer] = useState(false);
  // Add to cart
  const addToCart = async (id, data) => {
    if (JSON.parse(localStorage.getItem("UserId"))) {
      if (Rewards?.rewardpoint) {
        ProceedAddtoCart(id, data);
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
    let product = {
      uid: JSON.parse(localStorage.getItem("UserId")),
      pid: id,
      qty: QuantityValues["test" + id] || 1,
      aid: filterPack?.id || "",
      flag: timer ? 1 : 0,
    };
    dispatch(AddToCartApi(product)).then((res) => {
      setupadte(false);
      dispatch(CartListApi());
      type !== "qty" && NotifyFun(res);
    });
  };

  useEffect(() => {
    dispatch(CartListApi());
  }, []);

  // Add to Favorite
  const addToFav = async (id) => {
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
        dispatch(AddWishlist(id));
      }
    } else {
      history.push("/login");
    }
  };

  const [count, setCount] = useState(1);

  const incNum = (id, stock, value) => {
    setQuantityValues((prevState) => ({
      ...prevState,
      ["test" + id]: Number(value) + 1,
    }));
    if (count > product.stock) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Stock Exceeded",
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      setupadte(true);
      // setCount(count + 1);
    }
  };

  const decNum = (id, value) => {
    setQuantityValues((prevState) => ({
      ...prevState,
      ["test" + id]: Number(value) - 1,
    }));
    if (value > 1) {
      setupadte(true);
    } else {
      Swal.fire("Sorry!", "Minimum Quantity Reached", "warning");
      setQuantityValues((prevState) => ({
        ...prevState,
        ["test" + id]: 1,
      }));
    }
  };

  const UpdateQty = () => {
    for (var i = 0; i < ShoopingCarts.length; i++) {
      if (product.id === ShoopingCarts[i].id) {
        ShoopingCarts[i].quantity = count;
        break;
      }
    }
    localStorage.setItem("carts", JSON.stringify(ShoopingCarts));
  };

  useEffect(() => {
    update &&
      ShopIds.includes(product?.id) &&
      ProceedAddtoCart(product.id, "qty");
  }, [update]);

  const ChangeAttribute = (data) => {
    setselectpack(data);
    FilterData(data);
  };
  const FilterData = (value) => {
    var Data = product.data.attribute.filter((data) => {
      return data.name === value;
    });
    setfilterPack(Data[0]);
  };

  useEffect(() => {
    dispatch(Get_Single_Product_List(id)).then((res) => {
      setloading(false);
      setgallery(res?.payload?.gallery);
      setselectpack(
        res?.payload?.attribute && res?.payload?.attribute[0]?.name
      );
      setfilterPack(res?.payload?.attribute && res?.payload?.attribute[0]);
    });
  }, [id]);

  useEffect(() => {
    setProducts(props.SingleProduct);
  }, [props.SingleProduct, props?.WishList]);

  const ProdcutRemove = (id) => {
    dispatch(ProductDelete(id)).then((res) => {
      NotifyFun(res);
    });
  };

  const NotifyFun = (res) => {
    if (res.payload.status === 1) {
      dispatch(CartListApi());
      Swal.fire({
        icon: "success",
        title: "Success",
        text: res?.payload?.message,
        showConfirmButton: false,
        timer: 1000,
      });
    } else if (res.payload.status === 0) {
      Swal.fire({
        icon: "warning",
        title: "Failed",
        text: res?.payload?.message,
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  useEffect(() => {
    let Ids = [];
    ShoopingCarts.map((data, index) => {
      setQuantityValues((prevState) => ({
        ...prevState,
        ["test" + data.id]: data.qty || 1,
      }));
      Ids.push(data.id);
    });
    setShopIds(Ids);
  }, [ShoopingCarts]);

  const [days, setdays] = useState("00");
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const startDate = moment();
      const timeEnd = moment(product.date).local();
      const diff = timeEnd.diff(startDate);
      const diffDuration = moment.duration(diff);
      if (diff > 0) {
        settimer(true);
        setHours(String(diffDuration.hours()).padStart(2, "0"));
        setdays(String(diffDuration.days()).padStart(2, "0"));
        setMinutes(String(diffDuration.minutes()).padStart(2, "0"));
        setSeconds(String(diffDuration.seconds()).padStart(2, "0"));
      } else {
        settimer(false);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  });

  return (
    <>
      {!loading ? (
        <section id="product_single_one" className="ptb-10 mb-5">
          <div className="container">
            <div className="row area_boxed">
              <div className="col-lg-1"></div>
              <div className="col-lg-3">
                <div className="product_single_one_img">
                  {/* <img src={ImageUrl+product.photo} alt="img" style={{height:"300px"}} /> */}
                  <ImagesGalleryComp image={gallery} />
                </div>
              </div>
              <div className="col-lg-1"></div>
              <div className="col-lg-4">
                <div className="product_details_right_one">
                  <div className="modal_product_content_one">
                    <h3>{product.name}</h3>
                    {/* <h4><del><i class="fa fa-inr"></i>  {filterPack ? filterPack.price:product?.previous_price}.00</del> {""}<i class="fa fa-inr"></i>  {filterPack ? filterPack?.selling:product.discount_price}.00 </h4> */}
                    <p>{product.sort_details}</p>
                    {/* <div className='size_view'> */}
                    <div className="re_points" style={{ fontSize: "16px" }}>
                      Points : {timer ? product.deal_point : product.point}
                    </div>
                    {product.attribute?.length > 0 &&
                      product.out_of_stock !== 1 && (
                        <div className="customs_selects">
                          <select
                            name="product"
                            className="customs_sel_box product_card_select"
                            style={{ minHeight: "30px", width: "60%" }}
                            onChange={(e) => ChangeAttribute(e.target.value)}
                            value={selectpack}
                          >
                            {product.attribute?.map((data) => {
                              return (
                                <option value={data.name}>
                                  {data.name} - &#x20B9; {data.price}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      )}
                    {product.out_of_stock !== 1 &&
                      ShopIds.includes(product?.id) && (
                        <form id="product_count_form_two">
                          <div className="product_count_one">
                            <div className="plus-minus-input">
                              <div className="input-group-button">
                                <button
                                  type="button"
                                  className="button"
                                  onClick={() =>
                                    decNum(
                                      product.id,
                                      QuantityValues["test" + product.id]
                                    )
                                  }
                                >
                                  <i className="fa fa-minus"></i>
                                </button>
                              </div>
                              <input
                                className="form-control"
                                type="number"
                                value={QuantityValues["test" + product.id] || 1}
                                readOnly
                              />
                              <div className="input-group-button">
                                <button
                                  type="button"
                                  className="button"
                                  onClick={() =>
                                    incNum(
                                      product.id,
                                      product.stock,
                                      QuantityValues["test" + product.id]
                                    )
                                  }
                                >
                                  <i className="fa fa-plus"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      )}

                    <div className="links_Product_areas">
                      <ul>
                        <li>
                          <a
                            className="action wishlist"
                            title="Wishlist"
                            onClick={() => addToFav(product.id)}
                          >
                            <i className="fa fa-heart"></i>Add To Wishlist
                          </a>
                        </li>
                      </ul>
                      <div>
                        {product.out_of_stock !== 1 ? (
                          <>
                            {ShopIds.includes(product.id) ? (
                              <a
                                className="theme-btn-one btn-black-overlay btn_sm"
                                style={{ color: "#fff" }}
                                onClick={() => history.push("/cart")}
                              >
                                <i className="fa fa-shopping-cart" /> Go To Cart
                              </a>
                            ) : (
                              <a
                                className="theme-btn-one btn-black-overlay btn_sm"
                                style={{ color: "#fff" }}
                                onClick={() => addToCart(product.id, product)}
                              >
                                <i className="fa fa-shopping-cart" /> Buy
                              </a>
                            )}
                          </>
                        ) : (
                          <div className="outfor_stock">
                            <button className="add-to-cart cart-btn">
                              Out of Stock
                            </button>
                          </div>
                        )}
                      </div>
                      {product?.date &&
                        timer &&
                        Number(product.out_of_stock) !== 1 && (
                          <div className="deal_msg">
                            <div>Deal of the day : </div>
                            {days > 0 && <span>{`${days}d`}</span>}
                            <span>{`${hours}h `}</span>
                            <span>{`${minutes}m `}</span>
                            <span>{`${seconds}s `}</span>
                          </div>
                        )}
                      {Number(product?.out_of_stock) !== 1 && (
                        <div className="hurry_up">
                          Hurry Up Only {product?.stock} products Left!!!
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ProductInfo Details={product} />
          </div>
        </section>
      ) : (
        <EmptyProductLoading />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  SingleProduct: state.AllReducer.SingleProduct || [],
  WishList: state.AllReducer.WishList || [],
});
export default connect(mapStateToProps)(ProductDetailsOne);
