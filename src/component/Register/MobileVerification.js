import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { User_Login, VerificationCode } from "../../Redux/Action/LoginActions";
import Loading from "../../page/Loading/Loading";
import { useAuth } from "../../context/auth";
const MobileNumberVerification = () => {
  let dispatch = useDispatch();
  let { type } = useParams();
  let history = useHistory();
  const [confirm, setconfirm] = useState(false);
  const [loading, setloading] = useState(false);
  const Verificationcode = useSelector(
    (state) => state.AllReducer.Verification
  );

  const [UserDetail, setUserDetail] = useState({ password: "", mobileno: "" });
  const { setAuthTokens } = useAuth();
  const onChangeData = (e) => {
    setUserDetail((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const Submit = (e) => {
    e.preventDefault();
    setloading(true);
    dispatch(VerificationCode(UserDetail)).then((res) => {
      setloading(false);
      if (res.payload.status === 1) {
        setconfirm(true);
        Swal.fire({
          icon: "success",
          title: "OTP sent successfully",
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

  const VerifyOtp = (e) => {
    e.preventDefault();
    if (Number(Verificationcode?.msg) === Number(UserDetail?.password)) {
      setconfirm(false);
      Swal.fire({
        icon: "success",
        title: "Verified",
        showConfirmButton: false,
        timer: 1500,
      });
      setUserDetail((prevState) => ({
        ...prevState,
        ["password"]: "",
      }));
      dispatch({ type: "REGISTER_MOBILENUMBER", payload: UserDetail.mobileno });
      history.push("/register");
    } else {
      Swal.fire({
        icon: "error",
        title: "OTP does't match",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="parent_vas_div">
      <section id="login_area" className="ptb-60 mtb-20">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-12 col-sm-12 col-12"></div>
            <div className="col-lg-6  col-md-12 col-sm-12 col-12 log_acc_form">
              <div className="account_form">
                <h3>Mobile Number Verification</h3>
                <form
                  onSubmit={(e) => {
                    confirm ? VerifyOtp(e) : Submit(e);
                  }}
                  autoComplete="off"
                >
                  {!confirm && (
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
                        inputmode="numeric"
                      />
                    </div>
                  )}

                  {confirm && (
                    <div className="pb-3">
                      <label>
                        Enter OTP<span className="text-danger">*</span>
                      </label>
                      <input
                        type={"text"}
                        title={"Please enter exactly 6 digits"}
                        className="form-control"
                        minLength={6}
                        maxLength={6}
                        name="password"
                        onChange={(e) => onChangeData(e)}
                        value={UserDetail.password}
                        required
                        inputmode="numeric"
                      />
                    </div>
                  )}
                  <div className="login_submit text-end">
                    <button
                      className="theme-btn-one btn-black-overlay  btn_md "
                      type="submit"
                    >
                      {!confirm ? "Send" : "Verify"}
                    </button>
                  </div>

                  <div className="text-center pt-3 active">
                    <Link to="/login" className="active  w-100">
                      Already have an account ? Login
                    </Link>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-3 col-md-12 col-sm-12 col-12"></div>
          </div>
        </div>
      </section>
      <Loading show={loading} />
    </div>
  );
};

export default MobileNumberVerification;
