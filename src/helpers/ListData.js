import React from "react";
import Ads1 from "../assets/img/01.jpg";
import Ads2 from "../assets/img/02.jpg";
import Ads3 from "../assets/img/03.jpg";
import Ads4 from "../assets/img/04.jpg";
import moment from "moment";
export const BannerImgs = [Ads1, Ads2, Ads4];
let flag = 1;

export const colorSet = (index) => {
  if (flag == 1) {
    flag = flag + 1;
    return "back3";
  } else if (flag == 2) {
    flag = flag + 1;
    return "back5";
  } else if (flag == 3) {
    flag = flag + 1;
    return "back2";
  } else if (flag == 4) {
    flag = flag + 1;
    return "back1";
  } else if (flag == 5) {
    flag = flag + 1;
    return "back4";
  } else if (flag == 6) {
    flag = 1;
    return "back6";
  }
};

export const PincodeValidation = (PincodeList, data) => {
  if (PincodeList.includes(data) && data.length > 5) {
    return (
      <span className="pincodecheck">
        <i className="fa fa-check" />
        {"Delivery available your location"}
      </span>
    );
  } else if (data.length > 5) {
    return (
      <span className="pincodewrong">
        <i className="fa fa-close" />
        {"Delivery not available your location"}
      </span>
    );
  }
};

export const dropinComponents = [
  {
    name: "Order Details",
    id: "order-details",
  },
  {
    name: "Card",
    id: "card",
  },
  {
    name: "UPI",
    id: "upi",
  },
  {
    name: "Wallets",
    id: "app",
  },
  {
    name: "Netbanking",
    id: "netbanking",
  },
  {
    name: "Paylater",
    id: "paylater",
  },
  {
    name: "Credit Card EMI",
    id: "creditcardemi",
  },
  {
    name: "Cardless EMI",
    id: "cardlessemi",
  },
];

const attributeFun = (data) => {
  return data?.attribute?.filter((datas) => datas.id === data.aid);
};

const Timer = (val) => {
  let timer = false;
  var timeron = moment() >= moment(val.date);
  const startDate = moment();
  const timeEnd = moment(val.to_date).local();
  const diff = timeEnd.diff(startDate);
  if (timeron && diff > 0) {
    timer = true;
  } else {
    timer = false;
  }
  return timer;
};

export const cartTotalPrice = (carts) => {
  return carts?.reduce(function (total, item) {
    return (
      total +
      Number(item.qty || 1) *
        (item.aid
          ? attributeFun(item)?.[0]?.selling
          : Timer(item)
          ? item.deal_amount
          : item.discount_price)
    );
  }, 0);
};
