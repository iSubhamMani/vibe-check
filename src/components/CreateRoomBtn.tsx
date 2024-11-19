"use client";

import React from "react";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { createRoom } from "@/lib/actions/createRoom";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const CreateRoomBtn = () => {
  const router = useRouter();

  return (
    <HoverBorderGradient
      containerClassName="rounded-full"
      as="button"
      onClick={async () => {
        const room = await createRoom();
        if (room.success) {
          router.push(`/r/${room.data}`);
        } else {
          toast.error(room.error);
        }
      }}
      className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
    >
      <span>Create Room</span>
    </HoverBorderGradient>
  );
};

export default CreateRoomBtn;
