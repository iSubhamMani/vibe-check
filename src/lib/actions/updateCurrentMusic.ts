"use server";

import prisma from "../db";

export const updateCurrentMusic = async (roomCode: string) => {
  await prisma.room.update({
    where: {
      roomCode,
    },
    data: {
      currentMusic: "",
    },
  });

  return {
    success: true,
  };
};
