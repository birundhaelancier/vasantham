import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import {
  ForgotPassChange,
  UserForgotPassword,
} from "../../Redux/Action/LoginActions";
import Loading from "../../page/Loading/Loading";
import { notification } from "antd";
const LoginArea = () => {
  let dispatch = useDispatch();
  let history = useHistory();
  const [Response, setResponse] = useState("");
  const [otp, setotp] = useState(false);
  const [confirm, setconfirm] = useState(false);
  const [loading, setloading] = useState(false);
  const [show2, setshow2] = useState(false);
  const [showPass, setshowPass] = useState(false);
  const [error, seterror] = useState("");
  const [UserDetail, setUserDetail] = useState({
    mobileno: "",
    otp: "",
    password: "",
    confirm_pass: "",
  });
  const onChangeData = (e) => {
    if (e.target.name === "confirm_pass") {
      e.target.value === UserDetail.password
        ? seterror("")
        : seterror("Password does't not match");
    }
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
        setotp(true);
        setResponse(res.payload);
        Swal.fire({
          icon: "success",
          title: "OTP sent",
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

  const OtpVerificationfun = (e) => {
    e.preventDefault();
    if (Response?.otp === Number(UserDetail?.otp)) {
      notification.success({
        message: "OTP verified",
      });
      setotp(false);
      setconfirm(true);
      // history.push("/changepassword");
    } else {
      notification.warning({
        message: "Invalid OTP",
      });
    }
  };

  const SubmitPassword = (e) => {
    e.preventDefault();
    if (error === "") {
      setloading(true);
      dispatch(UserForgotPassword(UserDetail)).then((res) => {
        setloading(false);
        if (res.payload.status === 1) {
          setotp(true);
          setResponse(res.payload);
          Swal.fire({
            icon: "success",
            title: res.payload.response,
            showConfirmButton: false,
            timer: 1500,
          });
          ClearState();
          history.push("/login");
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
    }

    setUserDetail((prevState) => ({
      ...prevState,
    }));
  };

  const RenderPassword = () => {
    return (
      <>
        <div className="default-form-box">
          <label>
            Mobile number<span className="text-danger">*</span>
          </label>
          <input
            type={"text"}
            className="form-control"
            name="mobileno"
            onChange={(e) => onChangeData(e)}
            value={UserDetail.mobileno}
            readOnly
          />
        </div>
        <div className="default-form-box">
          <label>
            New password<span className="text-danger">*</span>
          </label>
          <input
            type={showPass ? "text" : "password"}
            name="password"
            className="form-control"
            required
            minLength="6"
            maxLength="25"
            onChange={(e) => onChangeData(e)}
            value={UserDetail.password}
          />
          <i
            onClick={() => setshowPass(!showPass)}
            class={showPass ? "fa fa-eye icon_eye" : "fa fa-eye-slash icon_eye"}
          ></i>
        </div>
        <div className="default-form-box">
          <label>
            Confirm password<span className="text-danger">*</span>
          </label>
          <input
            type={show2 ? "text" : "password"}
            name="confirm_pass"
            className="form-control"
            required
            minLength="6"
            maxLength="25"
            onChange={(e) => onChangeData(e)}
            value={UserDetail.confirm_pass}
          />
          <i
            onClick={() => setshow2(!show2)}
            class={show2 ? "fa fa-eye icon_eye" : "fa fa-eye-slash icon_eye"}
          ></i>
        </div>
        {error !== "" && <div className="err_msg">{error}</div>}
      </>
    );
  };

  const OtpSection = () => {
    return (
      <>
        {!otp ? (
          <div className="default-form-box">
            <label>
              Mobile number
              <span className="text-danger">*</span>
            </label>
            <input
              type={"text"}
              className="form-control"
              name="mobileno"
              onChange={(e) => onChangeData(e)}
              value={UserDetail.mobileno}
              required
            />
          </div>
        ) : (
          <div className="default-form-box">
            <label>
              Enter OTP<span className="text-danger">*</span>
            </label>
            <input
              type={"text"}
              className="form-control"
              minLength={6}
              name="otp"
              onChange={(e) => onChangeData(e)}
              value={UserDetail.otp}
              required
            />
          </div>
        )}
      </>
    );
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
                    otp
                      ? OtpVerificationfun(e)
                      : confirm
                      ? SubmitPassword(e)
                      : Submit(e);
                  }}
                  autoComplete="off"
                >
                  {!confirm ? OtpSection() : RenderPassword()}
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
