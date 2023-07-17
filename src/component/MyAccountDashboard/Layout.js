import React, { useEffect } from "react";
import { isMobile } from "react-device-detect";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { RewardPoints } from "../../Redux/Action/allActions";
import Sidebar from "./Sidebar";
const Layout = (props) => {
  let dispatch = useDispatch();
  let { pathname } = useLocation();
  const Reward = useSelector((state) => state.AllReducer.RewardPoints);
  const RewardStatus = useSelector((state) => state.AllReducer.Reward_status);
  return (
    <>
      <section id="my-account_area" className="pt-4 pb-4">
        {RewardStatus?.reward === 1 && (
          <div className="text-center pt-2 pb-5 reward_dash">
            My Reward Points <span>{Reward.rewardpoint || 0}</span>
          </div>
        )}
        <div className="container">
          <div className="row">
            <Sidebar />
            <div
              className="col-sm-12 col-md-12 col-lg-9"
              style={{
                display:
                  isMobile && (pathname === "/my-account" ? "none" : "block"),
              }}
            >
              <div className="tab-content dashboard_content">
                <div className="tab-pane fade show active" id="dashboard">
                  {props.children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Layout;
