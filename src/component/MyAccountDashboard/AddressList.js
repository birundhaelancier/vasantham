import React, { useEffect, useState } from "react";
import Header from "../../component/Common/Header";
import Banner from "../../component/Common/Banner";
import Layout from "../../component/MyAccountDashboard/Layout";
import Order from "../../component/MyAccountDashboard/Order";
import Footer from "../../component/Common/Footer";
import moment from "moment";
import { City_List, Get_Address_List } from "../../Redux/Action/allActions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { DeleteAddressDetails } from "../../Redux/Action/CreateActions";
const AddressListComp = () => {
  let dispatch = useDispatch();
  let history = useHistory();
  const [AddressId, setAddressId] = useState();
  const [loading, setloading] = useState(false);
  const AddressList = useSelector((state) => state.AllReducer.Address_list);
  const CityList = useSelector((state) => state.AllReducer.City_List);
  useEffect(() => {
    dispatch(Get_Address_List());
    dispatch(City_List());
  }, []);

  const EditAddress = (id) => {
    setAddressId(id);
    history.push(`/my-account/editaddresslist/${id}/${"edit"}`);
  };
  const Addaddresscomp = (id) => {
    history.push(`/my-account/editaddresslist/${"add"}`);
  };
  const DeleteAddress = (id) => {
    dispatch(DeleteAddressDetails(id)).then((res) => {
      setloading(false);
      window.scroll(0, 0);
      if (res?.payload?.status === 1) {
        dispatch(Get_Address_List());
        setAddressId("");
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: res?.payload?.response,
          showConfirmButton: false,
          timer: 2000,
        });
      }
      if (res?.payload?.status === 0) {
        Swal.fire({
          icon: "warning",
          title: "Failed!",
          text: res?.payload?.response,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };
  const dropdown = (id) => {
    return CityList.filter((data) => {
      return Number(data.id) === Number(id);
    });
  };
  return (
    <>
      <Header />
      <Layout>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="vendor_order_boxed">
              <div className="addres_list">
                <h4>Address List</h4>
                <button
                  type="submit"
                  onClick={Addaddresscomp}
                  className="theme-btn-one btn-black-overlay btn_sm"
                >
                  {"Add New"}
                </button>
              </div>
              {AddressList.map((data) => (
                <div className="card_content">
                  <div className="child_comp">
                    <div className="name_dispaly">
                      <strong>
                        {data.firstname} {data.lastname}
                      </strong>
                      <span>{data.mobile}</span>
                    </div>
                    <div>
                      <i
                        class="fa fa-trash"
                        aria-hidden="true"
                        onClick={() => DeleteAddress(data.id)}
                      ></i>
                      <i
                        class="fa fa-pencil-square-o"
                        aria-hidden="true"
                        onClick={() => EditAddress(data.id)}
                      ></i>
                    </div>
                  </div>
                  <span>
                    {data.address},{dropdown(data.city)[0]?.name}-{data.pincode}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
      <Footer />
    </>
  );
};

export default AddressListComp;
