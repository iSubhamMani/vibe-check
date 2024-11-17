import MainBg from "@/components/MainBg";
import LogoutBtn from "@/components/LogoutBtn";
import React from "react";
import DashboardWelcomeMsg from "@/components/HomeWelcomeMsg";
import DashboardMain from "@/components/HomeMain";

const Dashboard = () => {
  return (
    <MainBg>
      <div className="mt-8 flex justify-end px-6 lg:px-12">
        <LogoutBtn />
      </div>
      <div className="max-w-5xl mx-auto w-full">
        <DashboardWelcomeMsg />
        <DashboardMain />
      </div>
    </MainBg>
  );
};

export default Dashboard;
