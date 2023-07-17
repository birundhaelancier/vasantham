import React, { useState, useEffect } from "react";
import { AuthContext } from "./context/auth";
import PullToRefresh from "react-simple-pull-to-refresh";
import Routes from "./Routes";
import { isMobile } from "react-device-detect";
import { useDispatch, useSelector } from "react-redux";
import { RewardStatus } from "./Redux/Action/allActions";

const App = () => {
  let dispatch = useDispatch();
  const [loading, setloading] = useState(true);
  const existingTokens = JSON.parse(localStorage.getItem("data"));
  const [authTokens, setAuthTokens] = useState(existingTokens);
  const SearchValue = useSelector((state) => state.AllReducer.SearchValue);
  const setTokens = (data) => {
    localStorage.setItem("data", JSON.stringify(data));
    localStorage.setItem("UserId", JSON.stringify(data.id));
    setAuthTokens(data);
  };
  useEffect(() => {
    fakeRequest().then(() => {
      const el = document.querySelector(".loader-container");
      if (el) {
        el.remove(); // removing the spinner element
        setloading(false);
      }
    });
    dispatch(RewardStatus());
  }, []);
  const fakeRequest = () => {
    return new Promise((resolve) => setTimeout(() => resolve(), 0));
  };
  if (loading) {
    return null;
  }

  // const handleRefresh = () => {
  //   setrefresh(true);
  // };
  const handleRefresh = async () => {
    await setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <div>
      <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
        <PullToRefresh
          onRefresh={handleRefresh}
          isPullable={isMobile && true}
          triggerHeight={50}
          pullingContent={""}
        >
          <div
            style={{
              padding: `${isMobile ? "130px" : "0px"} 0px 0px 0px`,
            }}
          >
            <Routes />
          </div>
        </PullToRefresh>
        {/* <DesktopNotication /> */}
      </AuthContext.Provider>
    </div>
  );
};

export default App;
