import HomeBg from "@/components/HomeBg";
import HomeMain from "@/components/HomeMain";
import HomeWelcomeMsg from "@/components/HomeWelcomeMsg";
import LogoutBtn from "@/components/LogoutBtn";
import React from "react";

const Home = () => {
  return (
    <HomeBg>
      <div className="mt-8 flex justify-end px-6 lg:px-12">
        <LogoutBtn />
      </div>
      <div className="max-w-5xl mx-auto w-full">
        <HomeWelcomeMsg />
        <HomeMain />
      </div>
    </HomeBg>
  );
};

export default Home;
