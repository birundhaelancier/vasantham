import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Add_Address,
  EditAddressDetails,
} from "../../Redux/Action/CreateActions";
import {
  Get_Address_List,
  City_List,
  Profile_Details,
  BillingDetails,
  PincodeListsApi,
} from "../../Redux/Action/allActions";
import { Radio } from "antd";
import Swal from "sweetalert2";
import Loading from "../../page/Loading/Loading";
import { PincodeValidation } from "../../helpers/ListData";
const BillingsInfo = ({ PincodeList, OrderBranchs }) => {
  let dispatch = useDispatch();
  const [mobileerr, setmobileerr] = useState("");
  const [loading, setloading] = useState(false);
  const [emailerr, setemailerr] = useState("");
  const [pincodeerr, setpincodeerr] = useState("");
  const [addAddress, setaddAddress] = useState();
  const [changeAddress, setchangeAddress] = useState(false);
  const [AddressId, setAddressId] = useState("");
  const [edit, setedit] = useState(false);
  const [profile, setprofile] = useState(true);
  const Address_list = useSelector((state) => state.AllReducer.Address_list);
  const CityList = useSelector((state) => state.AllReducer.City_List);
  const ContactDetails = useSelector((state) => state.AllReducer.Branchlists);
  const [Billing_Info, setBilling_Info] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobileno: "",
    address: "",
    pincode: "",
    city: "",
    branch_id: "",
  });

  const ProfileData = useSelector((state) => state.AllReducer.ProfileData);

  const OnChangeInfo = (data, key) => {
    if (key === "pincode") {
      if (Number(data)) {
        Billing_Info.pincode = data;
        OrderBranchs?.filter((dtas) => {
          if (dtas?.code === Billing_Info?.pincode) {
            Billing_Info.branch_id = dtas?.branch_id;
          }
        });
      } else {
        Billing_Info.pincode = "";
      }
      setBilling_Info((prevState) => ({
        ...prevState,
      }));
    } else {
      if (data && key === "email") {
        var re =
          /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (re.test(data)) {
          setemailerr("");
        } else {
          setemailerr("Email is Invalid");
        }
      }

      if (data && key === "mobileno") {
        var re = /^(?=.*?[1-9])[0-9()-]+$/;
        if (re.test(data)) {
          setmobileerr("");
        } else {
          setmobileerr("Please Enter Numeric Value only");
        }
      }

      setBilling_Info((prevState) => ({
        ...prevState,
        [key]: data,
      }));
    }
  };

  const Add_Address_Detail = (e) => {
    if (PincodeList.includes(Billing_Info.pincode)) {
      setloading(true);

      dispatch(Add_Address(Billing_Info)).then((res) => {
        setloading(false);
        window.scroll(0, 0);
        if (res?.payload?.status === 1) {
          dispatch(Get_Address_List());
          setchangeAddress(false);
          setaddAddress("");
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: res?.payload?.response,
            showConfirmButton: false,
            timer: 2000,
          });
          setchangeAddress(false);
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
    }
  };

  useEffect(() => {
    dispatch(Profile_Details());
    dispatch(Get_Address_List());
    dispatch(City_List());
    dispatch(PincodeListsApi());
  }, []);

  const OnChangeAddressDetails = (id) => {
    setAddressId(id);
    Address_list.filter((value, index) => {
      if (id === value.id) {
        setaddAddress(value);
      }
    });
  };

  const dropdown = (id) => {
    return CityList.filter((data) => {
      return Number(data.id) === Number(id);
    });
  };
  useEffect(() => {
    const Details = Address_list;
    if (AddressId) {
      Object.keys(Billing_Info).map((data) => {
        Billing_Info[data] =
          data === "mobileno"
            ? addAddress && addAddress["mobile"]
            : (addAddress && addAddress[data]) || "";
      });
      setBilling_Info((prevState) => ({
        ...prevState,
      }));
    }
  }, [Address_list, ProfileData, addAddress, AddressId, edit, profile]);

  useEffect(() => {
    dispatch(
      BillingDetails(addAddress ? addAddress : Address_list && Address_list[0])
    );
  }, [Billing_Info, Address_list]);

  const EditAddress = (id) => {
    setedit(true);
    setchangeAddress(true);
    setAddressId(id);
    Address_list.filter((value, index) => {
      if (id === value.id) {
        setaddAddress(value);
      }
    });
  };

  const UpdateAddress = () => {
    if (PincodeList.includes(Billing_Info.pincode)) {
      setloading(true);
      dispatch(EditAddressDetails(Billing_Info, AddressId)).then((res) => {
        setloading(false);
        window.scroll(0, 0);
        setchangeAddress(false);
        if (res?.payload?.status === 1) {
          dispatch(Get_Address_List());
          setaddAddress("");
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
    }
  };

  useEffect(() => {
    setAddressId(Address_list[0]?.id);
  }, [Address_list]);

  return (
    <>
      <div className="">
        {changeAddress && (
          <div
            style={{ textAlign: "end", margin: "20px 0px 0px 0px" }}
            className="change_add"
          >
            <button
              className="theme-btn-one btn-black-overlay btn_sm"
              onClick={() => {
                setchangeAddress(false);
                setprofile(true);
              }}
            >
              {" "}
              <i class="fa fa-arrow-left" aria-hidden="true"></i> Back
            </button>
          </div>
        )}
        <div className="check-out-form">
          {changeAddress ? (
            <form
              onSubmit={(e) => {
                edit ? UpdateAddress() : Add_Address_Detail();
                e.preventDefault();
              }}
            >
              <div className="row">
                <div className="col-lg-6 col-md-12 col-sm-=12 col-12">
                  <div className="form-group">
                    <label htmlFor="fname">
                      First name<span className="text-danger">*</span>{" "}
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="fname"
                      onChange={(data) =>
                        OnChangeInfo(data.target.value, "firstname")
                      }
                      value={Billing_Info.firstname}
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-=12 col-12">
                  <div className="form-group">
                    <label htmlFor="lname">
                      Last name<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      id="lname"
                      onChange={(data) =>
                        OnChangeInfo(data.target.value, "lastname")
                      }
                      value={Billing_Info.lastname}
                    />
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-=12 col-12">
                  <div className="form-group">
                    <label htmlFor="cname">
                      Mobile No<span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      required
                      type="text"
                      id="number"
                      minLength={10}
                      pattern={"[1-9]{1}[0-9]{9}"}
                      maxlength={10}
                      onChange={(data) =>
                        OnChangeInfo(data.target.value, "mobileno")
                      }
                      value={Billing_Info.mobileno}
                    />
                    <div
                      style={{
                        color: "red",
                        fontSize: "13px",
                        paddingTop: "5px",
                      }}
                    >
                      {mobileerr}
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-=12 col-12">
                  <div className="form-group">
                    <label htmlFor="email">
                      Email Address<span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      required
                      type="email"
                      id="email"
                      onChange={(data) =>
                        OnChangeInfo(data.target.value, "email")
                      }
                      value={Billing_Info.email}
                    />
                    <div
                      style={{
                        color: "red",
                        fontSize: "13px",
                        paddingTop: "5px",
                      }}
                    >
                      {emailerr}
                    </div>
                  </div>
                </div>

                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="form-group">
                    <div className="select-input">
                      <label htmlFor="city">
                        City<span className="text-danger">*</span>
                      </label>
                      <div>
                        <select
                          name="city"
                          id="city"
                          className="w-100"
                          required
                          onChange={(data) =>
                            OnChangeInfo(data.target.value, "city")
                          }
                          value={Billing_Info.city}
                        >
                          <option value=""></option>
                          {CityList.map((data) => {
                            return <option value={data.id}>{data.name}</option>;
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="form-group">
                    <div className="select-input">
                      <label htmlFor="zip">
                        Pincode<span className="text-danger">*</span>
                      </label>

                      <input
                        type="text"
                        minLength={6}
                        maxLength={6}
                        required
                        className="form-control"
                        id="pincode"
                        onChange={(data) =>
                          OnChangeInfo(data.target.value, "pincode")
                        }
                        value={Billing_Info.pincode}
                      />
                      <div>
                        {PincodeValidation(PincodeList, Billing_Info.pincode)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="form-group">
                    <label htmlFor="faddress">
                      Address<span className="text-danger">*</span>
                    </label>
                    <textarea
                      type="text"
                      rows="5"
                      className="form-control"
                      id="faddress"
                      required
                      onChange={(data) =>
                        OnChangeInfo(data.target.value, "address")
                      }
                      value={Billing_Info.address}
                    />
                  </div>
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <button
                  type="submit"
                  className="theme-btn-one btn-black-overlay btn_sm"
                >
                  {edit ? "Update" : "Add"} Address
                </button>
              </div>
            </form>
          ) : (
            <>
              <div
                style={{ textAlign: "end", marginBottom: "10px" }}
                className="change_add"
              >
                <button
                  className="theme-btn-one btn-black-overlay btn_sm"
                  onClick={() => {
                    setchangeAddress(true);
                    setprofile(false);
                    setaddAddress("");
                  }}
                >
                  Add New
                </button>
              </div>
              {/* <AddressDetail/> */}
              {/* adress  list */}
              <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="form-group">
                  {Address_list.length > 0 && (
                    <label htmlFor="faddress">Choose any address</label>
                  )}
                  <div>
                    {Address_list.map((data) => (
                      <div className="card_content">
                        <div className="child_comp">
                          <div className="name_dispaly">
                            <Radio
                              onChange={() => {
                                OnChangeAddressDetails(data.id);
                                setedit(false);
                              }}
                              value={addAddress}
                              checked={data.id === AddressId ? true : false}
                            ></Radio>
                            <strong>
                              {data.firstname} {data.lastname}
                            </strong>
                            <span>{data.mobile}</span>
                          </div>
                          <div>
                            <i class="" aria-hidden="true"></i>
                            <i
                              class="fa fa-pencil-square-o"
                              aria-hidden="true"
                              onClick={() => EditAddress(data.id)}
                            ></i>
                          </div>
                        </div>
                        <span>
                          {data.address},{dropdown(data.city)[0]?.name}-
                          {data.pincode}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* end */}
            </>
          )}
        </div>
      </div>
      <Loading show={loading} />
    </>
  );
};

export default BillingsInfo;
