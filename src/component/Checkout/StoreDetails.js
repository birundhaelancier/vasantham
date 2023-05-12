import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BillingDetails } from "../../Redux/Action/allActions";

export default function StoreDetails(props) {
  const ContactDetails = useSelector((state) => state.AllReducer.Branchlists);
  const BillingInformation = useSelector(
    (state) => state.AllReducer.BillingInformation
  );
  const [selectedInd, setselectedInd] = useState("");
  const [Ind, setInd] = useState("");
  let dispatch = useDispatch();

  const SelectedPinStore = (data) => {
    setInd(data?.id);
    setselectedInd(data);

    dispatch(BillingDetails(data));
    props.handleClose(false);
  };

  useEffect(() => {
    setselectedInd(BillingInformation?.store_name && BillingInformation);
  }, [BillingInformation]);

  return (
    <>
      <div className="storeDetails_mbl row">
        {ContactDetails?.map((data) => (
          <div className="col-lg-6 col-12 p-2">
            <div className={`${"card_content"}`}>
              <label>{data.store_name}</label>
              <label>{data.address}</label>
              <label>ph : {data.phone}</label>
              <label>Mon,Sun 10 AM - 10 PM</label>
              <div
                onClick={() => SelectedPinStore(data)}
                className={`${
                  (Ind || BillingInformation?.id) === data?.id
                    ? "actcard_btn"
                    : "card_btn"
                }`}
              >
                <button>
                  {(Ind || BillingInformation?.id) === data?.id
                    ? "Selected"
                    : "Select"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
