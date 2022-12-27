import React from "react";
import Header from "../component/Common/Header";
import RecentActivities from "../component/Recentactivities";
import Footer from "../component/Common/Footer";
import Layout from "../component/MyAccountDashboard/Layout";
const RecentActivity = () => {
  return (
    <>
      <Header />
      <Layout>
        <RecentActivities />
      </Layout>
      <Footer />
    </>
  );
};

export default RecentActivity;
