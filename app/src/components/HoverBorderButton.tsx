import React from "react";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

const HoverBorderButton = () => {
  return (
    <HoverBorderGradient
      containerClassName="rounded-full"
      as="button"
      className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
    >
      <span>Create Room</span>
    </HoverBorderGradient>
  );
};

export default HoverBorderButton;
