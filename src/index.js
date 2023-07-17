import React from "react";
import ReactDOM from "react-dom";
import "font-awesome/css/font-awesome.min.css";

import App from "./App";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { store } from './app/store';
import store from "./Redux/Store/store";

import { Provider } from "react-redux";
// import Custom Css
import "./assets/css/style.scss";
import "./assets/css/color.css";
import "./assets/css/responsive.css";
import "./assets/css/animate.min.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
