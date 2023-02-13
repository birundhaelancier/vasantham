import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserOrders, AdvisorVisit } from "../../Redux/Action/allActions";
import { connect, useDispatch } from "react-redux";
import moment from "moment";
const Order = (props) => {
  let dispatch = useDispatch();
  const [OrderDetails, setOrderDetails] = useState([]);
  useEffect(() => {
    dispatch(UserOrders());
    dispatch(AdvisorVisit());
  }, []);
  useEffect(() => {
    setOrderDetails(props.Orders);
  }, [props.Orders]);
  // const TotalAmt=
  return (
    <>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="vendor_order_boxed">
            <h4>All Order</h4>
            <div className="table-responsive">
              <table className="table pending_table">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Order ID</th>
                    <th scope="col">Date</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                {OrderDetails?.map((data) => (
                  <tbody>
                    <tr>
                      <td className="">
                        <Link
                          to={`/order-success/${data.txnid}`}
                          className="text-primary"
                        >
                          #{data.txnid}
                        </Link>
                      </td>

                      <td>{moment(data.created_at).format("DD-MM-YYYY")}</td>
                      <td>
                        <span>{data.orderTotal || 0}</span>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  Orders: state.AllReducer.Orders || [],
});
export default connect(mapStateToProps)(Order);
