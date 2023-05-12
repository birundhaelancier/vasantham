import React from "react";
import Header from "../component/Common/Header";
import Layout from "../component/MyAccountDashboard/Layout";
import ChnagePass from "../component/Login/changepassword";
import Footer from "../component/Common/Footer";
const PasswordChange = () => {
  return (
    <>
      <Header />
      {/* <Banner title="Customer Dashboard" /> */}
      <ChnagePass />
      <Footer />
    </>
  );
};

export default PasswordChange;
