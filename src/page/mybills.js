import React from "react";
import Header from "../component/Common/Header";
import Footer from "../component/Common/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ImageUrl } from "../Redux/Utils/baseurl";
import { useEffect } from "react";
import moment from "moment";
import { Contact_Us, MyBillsApi } from "../Redux/Action/allActions";
import Layout from "../component/MyAccountDashboard/Layout";
const MyBillsComp = () => {
  let dispatch = useDispatch();
  const MyBillDet = useSelector((state) => state.AllReducer.Mybills);

  useEffect(() => {
    dispatch(MyBillsApi());
  }, []);

  return (
    <>
      <Header />
      <Layout>
        <div className="container">
          <h4 className="pt-3 pb-4 text-center">My Bills</h4>
          <div className="row">
            <table className="table pending_table">
              <thead className="thead-light">
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Points</th>
                </tr>
              </thead>
              {MyBillDet?.map((data) => (
                <tbody>
                  <tr>
                    <td>
                      <span>{moment(data.date).format("DD-MM-YYYY")}</span>
                    </td>
                    <td>
                      <span>
                        <i className="fa fa-inr" /> {data.bill_amount}
                      </span>
                    </td>
                    <td>
                      <span>{data.points_earned}</span>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </Layout>
      <Footer />
    </>
  );
};

export default MyBillsComp;
