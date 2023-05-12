import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { ChangePasswordApi } from "../../Redux/Action/LoginActions";
import Loading from "../../page/Loading/Loading";
const ChangePassword = () => {
  let dispatch = useDispatch();
  let { type } = useParams();
  let history = useHistory();
  const [show2, setshow2] = useState(false);
  const [showPass, setshowPass] = useState(false);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");
  const [UserDetail, setUserDetail] = useState({
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
    if (error === "") {
      setloading(true);
      dispatch(ChangePasswordApi(UserDetail)).then((res) => {
        setloading(false);
        if (res.payload.status === 1) {
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
  const ClearState = () => {
    setUserDetail((prevState) => ({
      ...prevState,
      confirm_pass: "",
      password: "",
    }));
  };

  return (
    <div className="parent_vas_div">
      <section id="login_area" className="mtb-20">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-12 col-sm-12 col-12"></div>
            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
              <div className="account_form" style={{ width: "100%" }}>
                <h3>Change Password</h3>
                <form
                  onSubmit={(e) => {
                    Submit(e);
                  }}
                  autoComplete="off"
                >
                  <div className="default-form-box">
                    <label>
                      New Password<span className="text-danger">*</span>
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
                      class={
                        showPass
                          ? "fa fa-eye icon_eye"
                          : "fa fa-eye-slash icon_eye"
                      }
                    ></i>
                  </div>
                  <div className="default-form-box">
                    <label>
                      Confirm Password<span className="text-danger">*</span>
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
                      class={
                        show2
                          ? "fa fa-eye icon_eye"
                          : "fa fa-eye-slash icon_eye"
                      }
                    ></i>
                  </div>
                  {error !== "" && <div className="err_msg">{error}</div>}
                  <div className="login_submit text-end">
                    <button
                      className="theme-btn-one btn-black-overlay  btn_md "
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
              <div className="col-lg-3 col-md-12 col-sm-12 col-12"></div>
            </div>
          </div>
        </div>
      </section>
      <Loading show={loading} />
    </div>
  );
};

export default ChangePassword;
