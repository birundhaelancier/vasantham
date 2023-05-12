import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { isMobile } from "react-device-detect";

const Sidebar = () => {
  const location = useLocation();
  let dispatch = useDispatch();
  const history = useHistory();
  const logout = () => {
    localStorage.removeItem("UserId");
    history.push("/");
    localStorage.removeItem("notify");
  };
  return (
    <>
      <div
        className="col-sm-12 col-md-12 col-lg-3"
        style={{
          display:
            isMobile &&
            (location.pathname === "/my-account" ? "block" : "none"),
        }}
      >
        <div className="dashboard_tab_button">
          <ul role="tablist" className="nav flex-column dashboard-list">
            <li>
              <Link
                to={isMobile ? "/my-dashboard" : "/my-account"}
                className={
                  location.pathname === "/my-account" ? "active" : null
                }
              >
                <i className="fa fa-tachometer"></i>Dashboard
              </Link>
            </li>

            <li>
              <Link
                to="/my-account/customer-order"
                className={
                  location.pathname === "/my-account/customer-order"
                    ? "active"
                    : null
                }
              >
                <i className="fa fa-first-order"></i>My Orders
              </Link>
            </li>
            <li>
              <Link
                to="/bills"
                className={location.pathname === "/bills" ? "active" : null}
              >
                <i className="fa fa-first-order"></i>My Bills
              </Link>
            </li>

            <li>
              <Link
                to="/my-account/customer-account-details"
                className={
                  location.pathname === "/my-account/customer-account-details"
                    ? "active"
                    : null
                }
              >
                <i className="fa fa-user"></i>My Account
              </Link>
            </li>

            <li>
              <Link
                to="/redeemhistory"
                className={
                  location.pathname === "/redeemhistory" ? "active" : null
                }
              >
                <i class="fa fa-history" />
                Redeem History
              </Link>
            </li>

            <li>
              <Link
                to="/my-account/recent-activities"
                className={
                  location.pathname === "/my-account/recent-activities"
                    ? "active"
                    : null
                }
              >
                <i className="fa fa-tasks"></i>Recent Activities
              </Link>
            </li>

            <li>
              <Link
                to="/my-account/addresslist"
                className={
                  location.pathname === "/my-account/addresslist" ||
                  location.pathname.includes("/my-account/editaddresslist/")
                    ? "active"
                    : null
                }
              >
                <i className="fa fa-address-card"></i>Address List
              </Link>
            </li>

            <li>
              <Link
                to="/changepassword"
                className={
                  location.pathname === "/changepassword" ? "active" : null
                }
              >
                <i class="fa fa-key" />
                Change Password
              </Link>
            </li>

            <li>
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                }}
              >
                <i className="fa fa-sign-out"></i>logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
