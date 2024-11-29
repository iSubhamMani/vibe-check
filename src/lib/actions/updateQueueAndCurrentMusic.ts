"use server";

import { getServerSession } from "next-auth";
import prisma from "../db";
import { authOptions } from "@/app/api/auth/[...nextauth]/config";
import { pusherServer } from "../pusher";

export const updateQueueAndCurrentMusic = async (
  roomCode: string,
  nextMusic: string
) => {
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

  await prisma.room.update({
    where: {
      roomCode,
    },
    data: {
      currentMusic: nextMusic,
    },
  });

  await prisma.music.deleteMany({
    where: {
      roomCode,
      musicId: nextMusic,
    },
  });

  await pusherServer.trigger(`room-${roomCode}`, "update-queue", null);

  return {
    data: null,
    error: null,
    success: true,
  };
};
