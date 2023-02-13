import React, { useEffect, useState } from "react";
import Coupon from "./Coupon";
import TotalCart from "./TotalCart";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ImageUrl } from "../../Redux/Utils/baseurl";
import emp_img from "../../assets/img/empty-cart.webp";
import Swal from "sweetalert2";
import moment from "moment";
import {
  CartListApi,
  PayTypeCashOrPoints,
  Profile_Details,
  TimerEnd,
} from "../../Redux/Action/allActions";
import { AddToCartApi, ProductDelete } from "../../Redux/Action/CreateActions";
import ModalComp from "../../helpers/Modal";
import { Radio } from "antd";
const CartArea = () => {
  let dispatch = useDispatch();
  const [timer, settimer] = useState(false);
  const [QuantityValues, setQuantityValues] = useState({});
  const ShoppingCarts = useSelector((state) => state.AllReducer.CartLists);
  const ProfileData = useSelector((state) => state.AllReducer.ProfileData);
  const payType = useSelector((state) => state.AllReducer.payType);
  const columnss = [
    { field: "id", width: 50, headerName: "Remove" },
    { field: "", width: 130, headerName: "Image" },
    { field: "", width: 130, headerName: "Product" },
    { field: "", width: 130, headerName: "Price" },
    { field: "", width: 130, headerName: "Points" },
    { field: "", width: 130, headerName: "Quantity" },
    { field: "", width: 130, headerName: "Total Price" },
    { field: "", width: 130, headerName: "Total Points" },
  ];
  let carts = useSelector((state) => state?.products?.carts);

  const attributeFun = (data) => {
    return data?.attribute?.filter((datas) => datas.id === data.aid);
  };

  // Remove from Cart
  const rmProduct = (id) => {
    dispatch(ProductDelete(id)).then((res) => {
      NotifyFun(res);
    });
  };

  // Value Update

  useEffect(() => {
    dispatch(CartListApi());
  }, []);

  const cartValUpdate = (val, index, data, stock) => {
    if (val > stock) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Stock Exceeded",
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      if (data.is_type === "flash_deal") {
        if (Math.abs(data?.max_count - data.purchased_count) >= Number(val)) {
          ProceedAddtoCart(data, val, "qty");
          setQuantityValues((prevState) => ({
            ...prevState,
            ["test" + data?.id]: val,
          }));
        } else {
          Swal.fire({
            icon: "warning",
            title: "Warning",
            text: "Maximum order reached",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      } else {
        ProceedAddtoCart(data, val, "qty");
        setQuantityValues((prevState) => ({
          ...prevState,
          ["test" + data?.id]: val,
        }));
      }
    }
  };

  const ProceedAddtoCart = (data, val, type) => {
    let product = {
      uid: JSON.parse(localStorage.getItem("UserId")),
      pid: data?.id,
      qty: val || 1,
      aid: data?.aid || "",
      // flag: timer ? 1 : 0,
    };
    dispatch(AddToCartApi(product)).then((res) => {
      NotifyFun(res, type);
    });
  };

  useEffect(() => {
    let Ids = [];
    ShoppingCarts.map((data, index) => {
      setQuantityValues((prevState) => ({
        ...prevState,
        ["test" + data.id]: data.qty || 1,
      }));
      Ids.push(data.id);
    });
  }, [ShoppingCarts]);

  const NotifyFun = (res, type) => {
    if (res?.payload?.status === 1) {
      dispatch(CartListApi());
      type !== "qty" &&
        Swal.fire({
          icon: "success",
          title: "Success",
          text: res?.payload?.message,
          showConfirmButton: false,
          timer: 1000,
        });
    } else if (res?.payload?.status === 0) {
      type !== "qty" &&
        Swal.fire({
          icon: "warning",
          title: "Failed",
          text: res?.payload?.message,
          showConfirmButton: false,
          timer: 1000,
        });
    }
  };

  const Timer = (fromdate, todate) => {
    let timer = false;
    var timeron = moment() >= moment(fromdate);
    const startDate = moment();
    const timeEnd = moment(todate).local();
    const diff = timeEnd.diff(startDate);
    if (timeron && diff > 0) {
      timer = true;
    } else {
      timer = false;
    }
    return timer;
  };

  return (
    <>
      {ShoppingCarts?.length ? (
        <section id="cart_area_one" className="ptb-10">
          <h4 className="text-center pb-3 pt-2">Cart</h4>
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="table_desc">
                  <div className="table_page table-responsive">
                    <table>
                      <thead>
                        <tr>
                          {columnss.map((data) => {
                            return (
                              <th className="product_remove">
                                {data.headerName}
                              </th>
                            );
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {ShoppingCarts?.map((data, index) => (
                          <tr key={index}>
                            <td className="product_remove">
                              <i
                                className="fa fa-remove text-danger"
                                onClick={() => rmProduct(data.id)}
                                style={{ cursor: "pointer" }}
                              ></i>
                            </td>

                            <td className="product_thumb">
                              <Link
                                to={`/product-details-one/${data.slug}/${data.pid}`}
                              >
                                <img src={ImageUrl + data.photo} alt="img" />
                              </Link>
                            </td>
                            <td className="product_name">
                              <Link
                                to={`/product-details-one/${data.slug}/${data.pid}`}
                              >
                                <span>{data.name}</span>
                                {/* <div style={{ fontSize: "13px" }}>
                                  <span>
                                    Points {data.points} - Prize{" "}
                                    <i class="fa fa-inr" />{" "}
                                    {data.discount_price}{" "}
                                  </span>
                                </div> */}
                              </Link>
                            </td>

                            <td className="product-price">
                              <i class="fa fa-inr" />{" "}
                              {data.aid
                                ? attributeFun(data)?.[0]?.selling
                                : Timer(data?.date, data?.to_date)
                                ? data?.deal_amount
                                : data.discount_price}
                            </td>
                            <td className="product_name">
                              <Link
                                to={`/product-details-one/${data.slug}/${data.pid}`}
                              >
                                {data.aid
                                  ? attributeFun(data)?.[0]?.point
                                  : Timer(data?.date, data?.to_date)
                                  ? data.deal_point
                                  : data?.point}
                              </Link>
                            </td>
                            <td className="product_quantity">
                              <input
                                min="1"
                                max="100"
                                type="number"
                                onChange={(e) =>
                                  cartValUpdate(
                                    e.target.value,
                                    index,
                                    data,
                                    data.stock
                                  )
                                }
                                value={QuantityValues["test" + data.pid]}
                              />
                            </td>
                            <td className="product_total">
                              {" "}
                              <i class="fa fa-inr" />
                              {Math.abs(
                                Number(
                                  data.aid
                                    ? attributeFun(data)?.[0]?.selling
                                    : Timer(data?.date, data?.to_date)
                                    ? data?.deal_amount
                                    : data.discount_price
                                ) * Number(data.qty)
                              ).toFixed(2)}
                            </td>
                            <td className="product_total">
                              {" "}
                              {Math.abs(
                                Number(
                                  data.aid
                                    ? attributeFun(data)?.[0]?.point
                                    : Timer(data?.date, data?.to_date)
                                    ? data.deal_point
                                    : data?.point
                                ) * Number(data.qty)
                              ).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="cart_box_view">
                    {ShoppingCarts?.map((data, index) => {
                      return (
                        <div
                          className="cart_content"
                          style={{ marginBottom: "15px" }}
                        >
                          <Link to={`/product-details-one/${data.pid}`}>
                            <img src={ImageUrl + data.photo} alt="img" />
                          </Link>
                          <div className="pro_discription">
                            <ul>
                              <li>
                                {/* <div className="table_head">Product Name </div> */}
                                <div className="table_val">
                                  {data.name}
                                  {/* <div style={{fontSize:"13px"}}><span>Points <i class="fa fa-inr"/>{" "}{data.points} - Prize <i class="fa fa-inr"/> {data.discount_price} </span></div> */}
                                </div>
                              </li>
                              <li>
                                <div className="table_val">
                                  {" "}
                                  {data.aid
                                    ? attributeFun(data)?.[0]?.point
                                    : Timer(data?.date, data?.to_date)
                                    ? data.deal_point
                                    : data?.point}
                                </div>
                              </li>
                              <li>
                                <div className="table_val">
                                  <i class="fa fa-inr" />{" "}
                                  {data.aid
                                    ? attributeFun(data)?.[0]?.selling
                                    : Timer(data?.date, data?.to_date)
                                    ? data?.deal_amount
                                    : Timer(data?.date, data?.to_date)
                                    ? data?.deal_amount
                                    : data.discount_price * data.qty}
                                </div>
                              </li>
                              <li>
                                {/* <div className="table_head">Quantity </div> */}
                                <div className="table_val">
                                  <input
                                    min="1"
                                    max="100"
                                    type="number"
                                    style={{
                                      textAlign: "center",
                                    }}
                                    onChange={(e) =>
                                      cartValUpdate(
                                        e.target.value,
                                        index,
                                        data,
                                        data.stock
                                      )
                                    }
                                    value={QuantityValues["test" + data.pid]}
                                  />
                                </div>
                              </li>
                              <li>
                                <div className="table_val">
                                  Points{" "}
                                  {Number(
                                    (data.aid
                                      ? attributeFun(data)?.[0]?.point
                                      : Timer(data?.date, data?.to_date)
                                      ? data.deal_point
                                      : data?.point) * (data.qty || 1)
                                  ).toFixed(2)}
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div style={{ textAlign: "end" }}>
                            <i
                              className="fa fa-remove text-danger"
                              onClick={() => rmProduct(data.pid)}
                              style={{
                                cursor: "pointer",
                                paddingRight: "10px",
                              }}
                            ></i>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="cart_submit">
                    {ShoppingCarts?.length ? (
                      <button
                        className="theme-btn-one btn-black-overlay btn_sm"
                        type="button"
                        onClick={() => rmProduct(0)}
                      >
                        Clear cart
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
              <Coupon />
              {/* <div className="col-lg-6 col-md-6 col-sm-12 col-12"></div> */}
              <TotalCart />
            </div>
          </div>
        </section>
      ) : (
        <section id="empty_cart_area" className="ptb-100 parent_vas_div">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-12 col-12">
                <div className="empaty_cart_area">
                  <img src={emp_img} alt="img" />
                  <h2>YOUR CART IS EMPTY</h2>
                  <h3>Sorry Mate... No Item Found Inside Your Cart!</h3>
                  <Link to="/" className="btn btn-black-overlay btn_sm">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CartArea;
