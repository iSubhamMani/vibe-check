import React from "react";
import HoverBorderButton from "./HoverBorderButton";
import RoomCodeInput from "./RoomCodeInput";

const HomeMain = () => {
  return (
    <div className="my-16 px-6 md:px-8 lg:px-12">
      <div className="flex flex-col gap-6 items-center">
        <HoverBorderButton />
        <p className="font-medium text-sm md:text-base bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
          or if you wanna join one
        </p>
        <RoomCodeInput />
      </div>
    </div>
  );
};

export default HomeMain;
