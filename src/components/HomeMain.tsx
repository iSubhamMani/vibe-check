import React from "react";
import CreateRoomBtn from "./CreateRoomBtn";
import RoomCodeInput from "./RoomCodeInput";

const DashboardMain = () => {
  return (
    <div className="my-16 px-6 md:px-8 lg:px-12">
      <div className="flex flex-col gap-6 items-center">
        <CreateRoomBtn />
        <p className="font-medium text-sm md:text-base bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
          or if you wanna join one
        </p>
        <RoomCodeInput />
      </div>
    </div>
  );
};

export default DashboardMain;
