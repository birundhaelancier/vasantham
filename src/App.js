import React, { useState, useEffect } from "react";
import { AuthContext } from "./context/auth";
import "./assets/css/style.scss";
import PullToRefresh from "react-simple-pull-to-refresh";
import Routes from "./Routes";
import { BrowserView, isMobile, MobileView } from "react-device-detect";
import { useSelector } from "react-redux";
import Time from "./component/Time";
const App = () => {
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
        >
          <div
            style={{
              padding: `${
                isMobile && (SearchValue?.type ? "120px" : "80px")
              } 0px 0px 0px`,
            }}
          >
            <Routes />
          </div>
        </PullToRefresh>
      </AuthContext.Provider>
    </div>
  );
};

export default App;
