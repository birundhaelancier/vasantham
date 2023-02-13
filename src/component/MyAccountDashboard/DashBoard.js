import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Profile_Details, UserOrders } from "../../Redux/Action/allActions";
import moment from "moment";
const DashBoard = () => {
  let dispatch = useDispatch();
  const profileDetails = useSelector((state) => state.AllReducer.ProfileData);
  const OrderDetails = useSelector((state) => state.AllReducer.Orders);
  const [cartDetail, setcartDetail] = useState([]);
  const Orders = {
    totalOrders: "Total Orders",
    deliveryOrders: "Total Delivery",
    pendingOrders: "Total Pending",
  };
  useEffect(() => {
    dispatch(Profile_Details());
    dispatch(UserOrders());
  }, []);
  useEffect(() => {
    let Data = [];
    OrderDetails.filter((data) => {
      if (data.order_status === "Pending") {
        Data.push(data);
      }
    });
    setcartDetail(Data);
  }, [OrderDetails]);
  return (
    <>
      <div className="row">
        {Object.keys(Orders).map((data) => (
          <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <div className="vendor_top_box pt-4 vendor_ads">
              <h2>{profileDetails[data] || 0}</h2>
              <h4>{Orders[data]}</h4>
            </div>
          </div>
        ))}
      </div>

      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <div className="vendor_order_boxed pt-4">
            <h4>Pending Orders</h4>
            <table className="table pending_table">
              <thead className="thead-light">
                <tr>
                  <th scope="col">Order ID</th>
                  <th scope="col">Date</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>

              {OrderDetails?.slice(0, 5).map((data) => (
                <tbody>
                  <tr>
                    <td>
                      <Link
                        to={`/order-success/${data.txnid}`}
                        className="text-primary"
                      >
                        #{data.txnid}
                      </Link>
                    </td>
                    <td>{moment(data.created_at).format("DD-MM-YYYY")}</td>
                    <td>
                      <span> {data.orderTotal}</span>
                    </td>
                  </tr>
                </tbody>
              ))}

              {/* </tbody> */}
            </table>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
          <div className="vendor_order_boxed pt-4">
            <h4>All Orders</h4>
            <table className="table pending_table">
              <thead className="thead-light">
                <tr>
                  <th scope="col">Order ID</th>
                  <th scope="col">Date</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              {OrderDetails?.slice(0, 5).map((data) => {
                return (
                  <tbody>
                    <tr>
                      <td>
                        <Link
                          to={`/order-success/${data.txnid}`}
                          className="text-primary"
                        >
                          #{data.txnid}
                        </Link>
                      </td>
                      <td>{moment(data.created_at).format("DD-MM-YYYY")}</td>
                      <td>
                        <span
                          className={`badge ${
                            data.order_status === "Pending"
                              ? "badge-warning"
                              : data.order_status === "Completed"
                              ? "badge-success"
                              : "badge-info"
                          }`}
                        >
                          {data.order_status}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
