"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/config";
import { getServerSession } from "next-auth";
import prisma from "../db";
import { pusherServer } from "../pusher";

export const endRoom = async (roomCode: string) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user)
    return {
      data: null,
      error: "Unauthenticated",
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
      error: "User not found",
      success: false,
    };

  const isAuthorized = await prisma.room.findFirst({
    where: {
      roomCode,
      owner_id: currentUser.id,
    },
  });

  if (!isAuthorized) {
    return {
      data: null,
      error: "Unauthorized",
      success: false,
    };
  }

  await prisma.room.delete({
    where: {
      roomCode,
      owner_id: currentUser.id,
    },
  });

  await prisma.music.deleteMany({
    where: {
      roomCode,
    },
  });

  await pusherServer.trigger(`room-${roomCode}`, "end-room", null);

  return {
    data: null,
    error: null,
    success: true,
  };
};
