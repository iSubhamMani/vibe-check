import React from "react";
import CreateRoomBtn from "./CreateRoomBtn";
import RoomCodeInput from "./RoomCodeInput";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/config";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import Link from "next/link";

async function checkForActiveRoom() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user)
    return {
      data: null,
      error: null,
      success: false,
    };

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email!,
    },
  });

  if (!currentUser)
    return {
      data: null,
      error: null,
      success: false,
    };

  const activeRoom = await prisma.room.findFirst({
    where: {
      owner_id: currentUser.id,
    },
  });

  if (!activeRoom)
    return {
      activeRoom: null,
      error: null,
      success: true,
    };

  return {
    activeRoom: activeRoom.roomCode,
    error: null,
    success: true,
  };
}

const DashboardMain = async () => {
  const activeRoom = await checkForActiveRoom();

  return (
    <div className="my-16 px-6 md:px-8 lg:px-12">
      <div className="flex flex-col gap-6 items-center">
        {activeRoom.activeRoom ? (
          <div>
            <p className="font-medium text-sm md:text-base text-purple-700">
              You have an active room
            </p>
            <div className="flex justify-center my-4">
              <Link href={`/r/${activeRoom.activeRoom}`}>
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  as="button"
                  className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
                >
                  <span>Go to room</span>
                </HoverBorderGradient>
              </Link>
            </div>
          </div>
        ) : (
          <CreateRoomBtn />
        )}

        <p className="font-medium text-sm md:text-base bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
          or if you wanna join one
        </p>
        <RoomCodeInput />
      </div>
    </div>
  );
};

export default DashboardMain;
