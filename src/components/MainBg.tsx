import React, { ReactNode } from "react";

const MainBg = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="z-50 relative">{children}</div>
    </div>
  );
};

export default MainBg;
