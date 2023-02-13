import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function ConfirmPopup({
  BillingInformation,
  Submit,
  ConfirmInform,
  handleClose,
}) {
  const City_List = useSelector((state) => state.AllReducer.City_List);
  const [confirm, setConfirm] = useState(false);
  const ProfileData = {
    firstname: "First Name",
    lastname: "Last Name",
    email: "Email",
    phone: "Phone Number",
    address: "Address",
    city: "City",
    pincode: "Pincode",
  };

  const FilterData = (id) => {
    let data = "";
    City_List.find((res) => {
      if (res.id === Number(id)) {
        data = res.name;
      }
    });
    return data;
  };

  const ConfirmFun = (val) => {
    setConfirm(val);
    ConfirmInform(val);
    handleClose(val);
  };

  const FooterDiv = () => {
    return (
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-secondary"
          data-dismiss="modal"
          onClick={() => ConfirmFun(false)}
        >
          Cancel
        </button>
        <button
          type="button"
          class="btn btn-primary"
          onClick={() => {
            confirm ? Submit() : ConfirmFun(true);
          }}
        >
          {confirm ? "Proceed" : "Confirm"}
        </button>
      </div>
    );
  };

  const PopupDiv = () => {
    return (
      <div>
        {BillingInformation?.store_name ? (
          <div className="pt-2 pb-2">
            <strong>Order Pickup Branch Address</strong>
            <div>
              {BillingInformation?.store_name}, {BillingInformation.address},{" "}
              {BillingInformation.phone}
            </div>
          </div>
        ) : (
          <div>
            {Object.keys(ProfileData).map((data) => (
              <span>
                {data === "city"
                  ? FilterData(BillingInformation?.[data])
                  : BillingInformation?.[data]}{" "}
                {data === "pincode" ? "" : " , "}
              </span>
            ))}
          </div>
        )}
        {/* <div>
          <strong>Plese Note :</strong> Please ensure the mobile number entered
          for the BILLING ADDRESS is correct .
        </div> */}
      </div>
    );
  };

  const ProceedPayment = () => {
    return <div className="text-center p-3">Do you want place the order ?</div>;
  };

  return (
    <div>
      <div className="custom_modal">
        {!confirm ? PopupDiv() : ProceedPayment()}
        {FooterDiv()}
      </div>
    </div>
  );
}
