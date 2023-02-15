import React from "react";

export default function Advertisement2() {
  const Details = [
    {
      icon: "https://andit.co/projects/html/andshop/andshop_frontend/assets/img/grocery/icon/free.svg",
      name: "Free Delivery",
      para: "For all oders over ₹100",
    },
    {
      icon: "https://andit.co/projects/html/andshop/andshop_frontend/assets/img/grocery/icon/refund.svg",
      name: "Refundable",
      para: "If your item have no damage.",
    },
    {
      icon: "https://andit.co/projects/html/andshop/andshop_frontend/assets/img/grocery/icon/secure.svg",
      name: "Secure Payment",
      para: "100% secure payment",
    },
    {
      icon: "https://andit.co/projects/html/andshop/andshop_frontend/assets/img/grocery/icon/support.svg",
      name: "24/7 Customer Support",
      para: "We have dedicated support",
    },
  ];
  return (
    <div style={{ background: "#fff" }} className={"container mb-2"}>
      <div className="row p-3">
        {Details.map((data) => (
          <div className="col-md-3 col-12">
            <div className="grcery_support_boxed">
              <img src={data.icon} />
              <div className="support_boxed_grocery_content">
                <h5>{data.name}</h5>
                <p>{data.para}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
