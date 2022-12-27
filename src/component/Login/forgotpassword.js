import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { ForgotPassChange, User_Login } from "../../Redux/Action/LoginActions";
import Loading from "../../page/Loading/Loading";
import { useAuth } from "../../context/auth";
import { Profile_Details, RewardPoints } from "../../Redux/Action/allActions";
const LoginArea = () => {
  let dispatch = useDispatch();
  let { type } = useParams();
  let history = useHistory();
  const [loading, setloading] = useState(false);
  const [UserDetail, setUserDetail] = useState({ mobileno: "" });
  const onChangeData = (e) => {
    setUserDetail((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const Submit = (e) => {
    e.preventDefault();
    setloading(true);
    dispatch(ForgotPassChange(UserDetail)).then((res) => {
      setloading(false);
      if (res.payload.status === 1) {
        ClearState();
        history.push("/login");
        Swal.fire({
          icon: "success",
          title: res?.payload?.response,
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (res.payload.status === 0) {
        Swal.fire({
          icon: "warning",
          title: res.payload.response,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "warning",
          title: "Failed",
          text: Object.values(res?.payload),
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });

    setUserDetail((prevState) => ({
      ...prevState,
    }));
  };
  const ClearState = () => {
    setUserDetail((prevState) => ({
      ...prevState,
      mobileno: "",
    }));
  };

  return (
    <div className="parent_vas_div">
      <section id="login_area" className="ptb-60 mtb-20">
        <div className="container">
          <div className="row">
            <div className="col-lg-3  col-md-12 col-sm-12 col-12"></div>
            <div className="col-lg-6  col-md-12 col-sm-12 col-12 log_acc_form">
              <div className="account_form">
                <h3>Forgot Password</h3>
                <form
                  onSubmit={(e) => {
                    Submit(e);
                  }}
                  autoComplete="off"
                >
                  <div className="default-form-box">
                    <label>
                      Mobile Number<span className="text-danger">*</span>
                    </label>
                    <input
                      type={"text"}
                      title={"Please enter exactly 10 digits"}
                      className="form-control"
                      pattern={"[1-9]{1}[0-9]{9}"}
                      minLength={10}
                      maxLength={10}
                      name="mobileno"
                      onChange={(e) => onChangeData(e)}
                      value={UserDetail.mobileno}
                      required
                    />
                  </div>
                  <div className="login_submit text-end">
                    <button
                      className="theme-btn-one btn-black-overlay btn_md "
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                  <div className="text-center pt-3 active">
                    <Link to="/login" className="active  w-100">
                      Login Your Account?
                    </Link>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-3  col-md-12 col-sm-12 col-12"></div>
          </div>
        </div>
      </section>
      <Loading show={loading} />
    </div>
  );
};

export default LoginArea;
