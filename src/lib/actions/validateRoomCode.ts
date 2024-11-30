"use server";

import prisma from "../db";

export const validateRoomCode = async (roomCode: string) => {
  const room = await prisma.room.findFirst({
    where: {
      roomCode,
    },
  });

  if (!room) {
    return {
      data: null,
      error: "Invalid room code",
      success: false,
    };
  }

  return {
    data: room,
    error: null,
    success: true,
  };
};
