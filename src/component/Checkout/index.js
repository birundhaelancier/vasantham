import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BranchListsApi, CartListApi } from "../../Redux/Action/allActions";
import BillingsInfo from "./BillingsInfo";
import Payment from "./Payment";
import YourOrders from "./YourOrders";
import { Tabs } from "antd";
import StoreDetails from "./StoreDetails";
import ModalComp from "../../helpers/Modal";
const Checkout = () => {
  let dispatch = useDispatch();
  const { TabPane } = Tabs;
  const [showmodal, setshowmodal] = useState(false);
  const [pincodeList, setpincodeList] = useState([]);
  const BillingInformation = useSelector(
    (state) => state.AllReducer.BillingInformation
  );

  const PincodeList = useSelector((state) => state.AllReducer.PincodeList);

  useEffect(() => {
    dispatch(BranchListsApi("instore"));
  }, []);

  useEffect(() => {
    setpincodeList(PincodeList.map((data) => data.code));
  }, [PincodeList]);

  const TabLists = [
    {
      name: "Delivery Address",
      content: (
        <BillingsInfo
          BillingInformation={BillingInformation}
          PincodeList={pincodeList}
          OrderBranchs={PincodeList}
        />
      ),
    },
    {
      name: "Pickup store address",
      content: (
        <div>
          <div className="selct_btn" onClick={() => setshowmodal(true)}>
            {!BillingInformation?.store_name ? (
              <button>Select</button>
            ) : (
              <button>Change</button>
            )}
          </div>
          {BillingInformation?.store_name ? (
            <div className="p-2 storeDetails_mbl">
              <div className="card_content">
                <label>{BillingInformation?.store_name}</label>
                <label>{BillingInformation?.address}</label>
                <label>ph : {BillingInformation?.phone}</label>
                <label>Mon,Sun 10 AM - 10 PM</label>
              </div>
            </div>
          ) : (
            <div className="notsel">You are not selected our branch</div>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    dispatch(CartListApi());
  }, []);

  const TabContent = () => {
    return (
      <Tabs defaultActiveKey={0} className="tab-container" tabPosition="top">
        {TabLists.map((data, index) => {
          return (
            <TabPane
              tab={
                <div className="check-heading">
                  <h3>{data.name}</h3>
                </div>
              }
              key={index}
            >
              {data.content}
            </TabPane>
          );
        })}
      </Tabs>
    );
  };

  return (
    <>
      <section id="checkout_one" className="pt-4 pb-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
              <div className="checkout-area-bg bg-white custom_tab">
                <div className="check-heading2">
                  <h3>Billing Address</h3>
                </div>
                {TabContent()}
              </div>
            </div>

            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
              <YourOrders />
              <Payment PincodeList={pincodeList} OrderBranchs={PincodeList} />
            </div>
          </div>
        </div>
        <ModalComp
          showmodal={showmodal}
          title={<span style={{ color: "#fff" }}>Select a store</span>}
          size={"lg"}
          handleClose={(key) => setshowmodal(key)}
        >
          <div className="p-3">
            <StoreDetails handleClose={(key) => setshowmodal(key)} />
          </div>
        </ModalComp>
      </section>
    </>
  );
};

export default Checkout;
